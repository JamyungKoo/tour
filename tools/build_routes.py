"""구간 경로 생성기 — OSM 도보 길찾기로 walks[]의 실제 경로선을 만든다.

    python tools/build_routes.py seoul-1024

<투어>/stops-data.js의 walks[]를 읽어 구간마다
  - legs가 있으면 각 leg의 pts를 경유지로 (bus: true leg는 버스 구간, 점선으로 그림)
  - 없으면 [출발, ...via, 도착]을 경유지로
routing.openstreetmap.de(OSRM, foot)에 물어 경로를 받고, 단순화해서
<투어>/routes-data.js (window.TOUR_ROUTES)로 쓴다. 데이터를 고치면 다시 돌리면 된다.
버스 구간도 도보 라우터로 그리므로 실제 버스 노선과는 조금 다를 수 있다 (대략적인 길).
"""
import json
import math
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OSRM = 'https://routing.openstreetmap.de/routed-foot/route/v1/foot/'
SIMPLIFY_DEG = 0.00005  # 약 5m


def load_tour(tour):
    js = (ROOT / tour / 'stops-data.js').as_posix()
    out = subprocess.check_output(
        ['node', '-e', f"global.window={{}}; require({json.dumps(js)}); "
                       "const d=window.TOUR_DATA; console.log(JSON.stringify({stops:d.stops, walks:d.walks||[]}))"],
        encoding='utf-8')
    return json.loads(out)


def osrm(points):
    coords = ';'.join(f'{lon},{lat}' for lat, lon in points)
    req = urllib.request.Request(f'{OSRM}{coords}?overview=full&geometries=geojson',
                                 headers={'User-Agent': 'tour-guide/1.0 (github.com/jamyungkoo/tour)'})
    for attempt in range(3):
        try:
            d = json.load(urllib.request.urlopen(req, timeout=30))
            route = d['routes'][0]
            return [[lat, lon] for lon, lat in route['geometry']['coordinates']], route['distance']
        except Exception as e:  # 공용 서버라 가끔 실패한다
            if attempt == 2:
                raise
            print(f'  retry ({e})')
            time.sleep(2)


def simplify(pts, eps):
    """Douglas-Peucker"""
    if len(pts) < 3:
        return pts
    (y1, x1), (y2, x2) = pts[0], pts[-1]

    def dist(p):
        y, x = p
        dx, dy = x2 - x1, y2 - y1
        if dx == dy == 0:
            return math.hypot(x - x1, y - y1)
        t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
        return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))

    i, m = max(((i, dist(p)) for i, p in enumerate(pts[1:-1], 1)), key=lambda t: t[1])
    if m > eps:
        return simplify(pts[:i + 1], eps)[:-1] + simplify(pts[i:], eps)
    return [pts[0], pts[-1]]


def main():
    tour = sys.argv[1] if len(sys.argv) > 1 else 'seoul-1024'
    data = load_tour(tour)
    stops = {s['id']: [s['lat'], s['lon']] for s in data['stops']}
    routes = {}
    for w in data['walks']:
        key = f"{w['from']}>{w['to']}"
        legs = w.get('legs') or [{'pts': [stops[w['from']], *w.get('via', []), stops[w['to']]]}]
        lines = []
        total = 0
        for leg in legs:
            pts, dist = osrm(leg['pts'])
            total += dist
            line = {'pts': [[round(a, 6), round(b, 6)] for a, b in simplify(pts, SIMPLIFY_DEG)]}
            if leg.get('bus'):
                line['bus'] = True
            lines.append(line)
            time.sleep(0.5)
        routes[key] = lines
        print(f'{key:10s} {round(total):5d}m  ' + ' + '.join(f"{len(l['pts'])}pt{'(bus)' if l.get('bus') else ''}" for l in lines))

    out = ROOT / tour / 'routes-data.js'
    body = ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, separators=(",", ":"))}' for k, v in routes.items())
    out.write_text(
        '// 자동 생성 — python tools/build_routes.py ' + tour + '\n'
        '// OSM 도보 길찾기(routing.openstreetmap.de) 경로를 단순화한 것. 손으로 고치지 말 것.\n'
        'window.TOUR_ROUTES = {\n' + body + '\n};\n',
        encoding='utf-8', newline='\n')
    print('→', out.relative_to(ROOT))


if __name__ == '__main__':
    main()
