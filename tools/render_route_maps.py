"""구간 지도 이미지 생성기 — 위성사진 위에 실제 도보 경로선 + 영어 라벨.

    python tools/render_route_maps.py seoul-1024            # 전체
    python tools/render_route_maps.py seoul-1024 s05-s06    # 한 구간만

카카오·네이버 지도는 영어 지도를 캡처할 방법이 없어서(카카오 API는 한국어만, 네이버는 자동화 불가)
글자 없는 바탕(Esri World Imagery 위성사진)에 경로선과 영어 라벨을 직접 그린다.
  - 경로선: <투어>/routes-data.js (tools/build_routes.py, OSM 도보 길찾기)
  - 라벨:   <투어>/route-maps.json  { "s01-s02": { "legs": [0], "labels": [[lat, lon, text, kind, pos], ...] } }
            kind: start · end · place · street · note   pos: n s e w ne nw se sw (라벨이 점의 어느 쪽에)
  - 출력:   <투어>/images/routes-en/<구간>.jpg
타일은 스크래치(.tile-cache)에 캐시한다.
"""
import io
import json
import math
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'tools' / '.tile-cache'
TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
W, H, PAD = 720, 840, 90
MAX_Z = 18
CREDIT = 'Imagery © Esri, Maxar, Earthstar Geographics · Route © OpenStreetMap contributors'

FONTS = Path('C:/Windows/Fonts')
def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)

# 폰에서는 이미지가 절반쯤으로 줄어 보이므로 글자를 크게 (720px 기준 → 화면에서 약 0.47배)
STYLE = {
    'start':  dict(font=font('segoeuib.ttf', 34), fill='#ffffff', stroke='#0b1220', sw=5, dot='#22c55e', r=15),
    'end':    dict(font=font('segoeuib.ttf', 34), fill='#ffffff', stroke='#0b1220', sw=5, dot='#ef4444', r=15),
    'place':  dict(font=font('seguisb.ttf', 27), fill='#ffffff', stroke='#0b1220', sw=4, dot='#ffffff', r=7),
    'street': dict(font=font('segoeuii.ttf', 26), fill='#ffe7a3', stroke='#0b1220', sw=4, dot=None, r=0),
    'note':   dict(font=font('seguisb.ttf', 25), fill='#bfe6ff', stroke='#0b1220', sw=4, dot=None, r=0),
}
ROUTE = dict(outline='#0b1220', walk='#ffd23f', bus='#7fd1ff')


def world_px(lat, lon, z):
    n = 256 * 2 ** z
    x = (lon + 180) / 360 * n
    s = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)) * n
    return x, y


def tile(z, x, y):
    CACHE.mkdir(parents=True, exist_ok=True)
    f = CACHE / f'{z}_{x}_{y}.jpg'
    if not f.exists():
        req = urllib.request.Request(TILE_URL.format(z=z, x=x, y=y), headers={'User-Agent': 'tour-guide/1.0 (personal walking tour)'})
        f.write_bytes(urllib.request.urlopen(req, timeout=30).read())
        time.sleep(0.05)
    return Image.open(f).convert('RGB')


def load_js(tour, name, var):
    js = (ROOT / tour / name).as_posix()
    out = subprocess.check_output(['node', '-e', f"global.window={{}}; require({json.dumps(js)}); console.log(JSON.stringify(window.{var}))"], encoding='utf-8')
    return json.loads(out)


def dashed(draw, pts, fill, width, dash=14, gap=10):
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        seg = math.hypot(x2 - x1, y2 - y1)
        t = 0
        while t < seg:
            t2 = min(t + dash, seg)
            draw.line([(x1 + (x2 - x1) * t / seg, y1 + (y2 - y1) * t / seg),
                       (x1 + (x2 - x1) * t2 / seg, y1 + (y2 - y1) * t2 / seg)], fill=fill, width=width)
            t += dash + gap


def label_box(draw, x, y, text, st, pos):
    l, t, r, b = draw.textbbox((0, 0), text, font=st['font'], stroke_width=st['sw'])
    w, h = r - l, b - t
    g = st['r'] + 6
    off = {
        'e': (g, -h / 2), 'w': (-g - w, -h / 2), 'n': (-w / 2, -g - h), 's': (-w / 2, g),
        'ne': (g * 0.7, -g * 0.7 - h), 'nw': (-g * 0.7 - w, -g * 0.7 - h),
        'se': (g * 0.7, g * 0.7), 'sw': (-g * 0.7 - w, g * 0.7), 'c': (-w / 2, -h / 2),
    }[pos]
    tx = min(max(x + off[0], 8), W - w - 8)
    ty = min(max(y + off[1], 8), H - h - 30)
    return tx - l, ty - t


def render(tour, seg, spec, routes):
    lines = routes[seg.replace('-', '>')]  # routes-data.js 키는 's01>s02'
    legs = spec.get('legs')
    if legs is not None:
        lines = [lines[i] for i in legs]
    anchors = [p for l in lines for p in l['pts']] + [l[:2] for l in spec['labels']]

    # 경로·라벨이 꽉 차게: 한 단계 큰 줌으로 넓게 받아 축소(s = 0.5~1)한다
    for z in range(MAX_Z, 10, -1):
        xs, ys = zip(*(world_px(a, b, z) for a, b in anchors))
        s = min((W - 2 * PAD) / max(max(xs) - min(xs), 1), (H - 2 * PAD) / max(max(ys) - min(ys), 1), 1)
        if s >= 0.5:
            break
    cw, ch = int(W / s), int(H / s)
    cx, cy = (max(xs) + min(xs)) / 2, (max(ys) + min(ys)) / 2
    x0, y0 = int(cx - cw / 2), int(cy - ch / 2)

    base = Image.new('RGB', (cw, ch))
    for tx in range(x0 // 256, (x0 + cw) // 256 + 1):
        for ty in range(y0 // 256, (y0 + ch) // 256 + 1):
            base.paste(tile(z, tx, ty), (tx * 256 - x0, ty * 256 - y0))
    base = base.resize((W, H), Image.LANCZOS)
    base = ImageEnhance.Brightness(base).enhance(0.82)
    base = ImageEnhance.Color(base).enhance(0.8)

    img = base.convert('RGBA')
    draw = ImageDraw.Draw(img)
    def px(lat, lon):
        x, y = world_px(lat, lon, z)
        return (x - x0) * s, (y - y0) * s

    for l in lines:
        pts = [px(a, b) for a, b in l['pts']]
        if l.get('bus'):
            dashed(draw, pts, ROUTE['outline'], 15, 20, 14)
            dashed(draw, pts, ROUTE['bus'], 9, 20, 14)
        else:
            draw.line(pts, fill=ROUTE['outline'], width=17, joint='curve')
            draw.line(pts, fill=ROUTE['walk'], width=9, joint='curve')

    # 점 먼저, 글자는 나중에 (글자가 점·선을 덮도록)
    for lat, lon, text, kind, pos in spec['labels']:
        st = STYLE[kind]
        if st['dot']:
            x, y = px(lat, lon)
            r = st['r']
            draw.ellipse([x - r - 3, y - r - 3, x + r + 3, y + r + 3], fill='#0b1220')
            draw.ellipse([x - r, y - r, x + r, y + r], fill=st['dot'], outline='#ffffff', width=2 if r > 6 else 1)
    for lat, lon, text, kind, pos in spec['labels']:
        st = STYLE[kind]
        x, y = px(lat, lon)
        draw.text(label_box(draw, x, y, text, st, pos), text, font=st['font'], fill=st['fill'],
                  stroke_width=st['sw'], stroke_fill=st['stroke'])

    # 출처
    f = font('segoeui.ttf', 12)
    l, t, r, b = draw.textbbox((0, 0), CREDIT, font=f)
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(overlay).rectangle([W - (r - l) - 14, H - (b - t) - 10, W, H], fill=(0, 0, 0, 150))
    img = Image.alpha_composite(img, overlay)
    ImageDraw.Draw(img).text((W - (r - l) - 7 - l, H - (b - t) - 5 - t), CREDIT, font=f, fill='#e5e7eb')

    out = ROOT / tour / 'images' / 'routes-en' / f'{seg}.jpg'
    out.parent.mkdir(parents=True, exist_ok=True)
    img.convert('RGB').save(out, 'JPEG', quality=84, optimize=True)
    print(f'{seg}: z{z} → {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)')


def main():
    tour = sys.argv[1] if len(sys.argv) > 1 else 'seoul-1024'
    only = sys.argv[2:]
    routes = load_js(tour, 'routes-data.js', 'TOUR_ROUTES')
    specs = json.loads((ROOT / tour / 'route-maps.json').read_text(encoding='utf-8'))
    for seg, spec in specs.items():
        if not only or seg in only:
            render(tour, seg, spec, routes)


if __name__ == '__main__':
    main()
