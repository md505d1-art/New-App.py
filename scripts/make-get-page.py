#!/usr/bin/env python3
"""Builds www/get.html: a single self-contained page with QR codes for putting Sprout on a phone.

Open it on a laptop (from the Downloads folder, the release page, or the live site) and scan
the code with the phone's camera. Re-run after changing the URLs:  pip install segno && python3 scripts/make-get-page.py
"""
import base64
import pathlib

import segno

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP_URL = 'https://md505d1-art.github.io/New-App.py/'
APK_URL = 'https://github.com/md505d1-art/New-App.py/releases/download/apk-latest/Sprout.apk'


def qr(url):
    return segno.make(url, error='m').svg_inline(scale=1, border=2, dark='#2b1d6b', light='#ffffff', svgclass='qr', omitsize=True)


hana = base64.b64encode((ROOT / 'www/img/hana-happy.webp').read_bytes()).decode()
bit = base64.b64encode((ROOT / 'www/img/bit.webp').read_bytes()).decode()

page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Get Sprout on your phone</title>
<style>
  :root {{ --bg: #f4f0ff; --card: #fff; --ink: #1f1a3a; --muted: #6b6585; --primary: #5b3fd6; --line: #e6e0f7; }}
  @media (prefers-color-scheme: dark) {{ :root {{ --bg: #14121f; --card: #1d1a2c; --ink: #f1eeff; --muted: #a49fbd; --primary: #a593ff; --line: #2c2843; }} }}
  * {{ box-sizing: border-box; margin: 0; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: radial-gradient(circle at 15% 0%, #e3d9ff 0, transparent 45%), radial-gradient(circle at 90% 10%, #ffe3cf 0, transparent 40%), var(--bg); color: var(--ink); min-height: 100vh; padding: 32px 16px 48px; }}
  @media (prefers-color-scheme: dark) {{ body {{ background: var(--bg); }} }}
  main {{ max-width: 920px; margin: 0 auto; }}
  header {{ display: flex; align-items: center; gap: 18px; margin-bottom: 24px; }}
  .hana {{ position: relative; width: 112px; height: 112px; flex-shrink: 0; }}
  .hana img.h {{ width: 100%; height: 100%; object-fit: contain; }}
  .hana img.b {{ position: absolute; left: -10px; top: -6px; width: 44px; animation: float 3s ease-in-out infinite; }}
  @keyframes float {{ 50% {{ transform: translateY(-6px); }} }}
  h1 {{ font-size: clamp(26px, 4vw, 38px); line-height: 1.1; letter-spacing: -0.02em; }}
  header p {{ color: var(--muted); margin-top: 6px; font-size: 17px; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }}
  .card {{ background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: 22px; box-shadow: 0 18px 40px -28px rgba(60, 30, 140, .45); }}
  .card h2 {{ font-size: 21px; display: flex; align-items: center; gap: 10px; }}
  .card h2 span {{ font-size: 26px; }}
  .qrbox {{ background: #fff; border-radius: 18px; padding: 14px; margin: 16px auto; width: min(260px, 100%); border: 1px solid var(--line); }}
  svg.qr {{ display: block; width: 100%; height: auto; shape-rendering: crispEdges; }}
  ol {{ padding-left: 22px; display: grid; gap: 8px; font-size: 15.5px; line-height: 1.45; }}
  li b {{ color: var(--primary); }}
  .link {{ display: block; margin-top: 14px; font-size: 13px; color: var(--muted); word-break: break-all; }}
  .link a {{ color: var(--primary); }}
  .note {{ margin-top: 18px; color: var(--muted); font-size: 14px; line-height: 1.5; text-align: center; }}
</style>
</head>
<body>
<main>
  <header>
    <div class="hana"><img class="h" alt="Hana" src="data:image/webp;base64,{hana}"><img class="b" alt="" src="data:image/webp;base64,{bit}"></div>
    <div><h1>Get Sprout on your phone</h1><p>Point your phone's camera at the code for your phone.</p></div>
  </header>
  <div class="grid">
    <section class="card">
      <h2><span>🍎</span> iPhone</h2>
      <div class="qrbox">{qr(APP_URL)}</div>
      <ol>
        <li>Open the <b>Camera</b> app and point it at the code. Tap the link that pops up.</li>
        <li>Sprout opens in Safari. Tap the <b>Share</b> button (the square with an arrow).</li>
        <li>Scroll down and tap <b>Add to Home Screen</b>, then <b>Add</b>.</li>
        <li>Open Sprout from your Home Screen once while online, so it saves everything for offline.</li>
      </ol>
      <span class="link">Or type: <a href="{APP_URL}">{APP_URL}</a></span>
    </section>
    <section class="card">
      <h2><span>🤖</span> Android</h2>
      <div class="qrbox">{qr(APK_URL)}</div>
      <ol>
        <li>Open the <b>Camera</b> (or Google Lens) and point it at the code. Tap the link.</li>
        <li><b>Sprout.apk</b> downloads. Open it from your notifications or Downloads.</li>
        <li>If asked, allow <b>Install unknown apps</b> for your browser, then tap <b>Install</b>.</li>
      </ol>
      <span class="link">Or go to: <a href="{APK_URL}">{APK_URL}</a></span>
    </section>
  </div>
  <p class="note">Your progress is saved on the phone itself. Sprout works offline once it's installed.</p>
</main>
</body>
</html>
"""
(ROOT / 'www/get.html').write_text(page)
for name, url in [('iphone', APP_URL), ('android', APK_URL)]:
    segno.make(url, error='m').save(str(ROOT / f'assets/qr-{name}.svg'), scale=8, border=2, dark='#2b1d6b', light='#ffffff')
print('wrote www/get.html', len(page), 'bytes')
