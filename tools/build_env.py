"""env.js 생성기 — .env(또는 환경변수)의 값을 브라우저가 읽을 수 있는 env.js로 쓴다.

    python tools/build_env.py

정적 사이트라 페이지가 .env를 직접 읽을 수 없다. 그래서 배포(GitHub Actions)나 로컬에서
이 스크립트로 env.js를 만들고, 페이지는 window.TOUR_ENV에서 값을 읽는다.
  - 로컬: 저장소 루트의 .env (KEY=VALUE)
  - 배포: GitHub 저장소 Secret → 워크플로가 환경변수로 넘김 (환경변수가 .env보다 우선)
.env와 env.js는 커밋하지 않는다 (.gitignore).

주의: env.js는 브라우저에 그대로 내려가므로 여기 넣는 값은 '공개돼도 되는 값'이어야 한다.
카카오 JavaScript 키는 원래 브라우저용 공개 키이고, 등록한 사이트 도메인에서만 동작한다.
그래서 브라우저에 내보낼 키를 PUBLIC_KEYS로 정해 두고 나머지는 절대 쓰지 않는다.
"""
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_KEYS = ['KAKAO_JS_KEY']


def read_dotenv(path):
    values = {}
    if not path.exists():
        return values
    for line in path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        values[k.strip()] = v.strip().strip('"').strip("'")
    return values


def main():
    dotenv = read_dotenv(ROOT / '.env')
    env = {k: os.environ.get(k) or dotenv.get(k, '') for k in PUBLIC_KEYS}
    (ROOT / 'env.js').write_text(
        '// 자동 생성 — python tools/build_env.py (.env 또는 환경변수에서). 커밋하지 말 것.\n'
        f'window.TOUR_ENV = {json.dumps(env, ensure_ascii=False)};\n',
        encoding='utf-8', newline='\n')
    for k, v in env.items():
        print(f'{k}: {"설정됨 (" + v[:4] + "…)" if v else "비어 있음 → 지도는 Leaflet(OSM)으로"}')
    print('→ env.js')


if __name__ == '__main__':
    main()
