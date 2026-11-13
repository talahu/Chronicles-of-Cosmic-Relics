#!/usr/bin/env python3
"""Build Chronicles of Cosmic Relics.

  python3 tools/build.py            -> dist/cosmic-relics.html   (one-file web version)
  python3 tools/build.py --pages    -> also docs/ (mobile web version for GitHub Pages: offline fonts, PWA)
  python3 tools/build.py --apk      -> also dist/ChroniclesOfCosmicRelics.apk
  python3 tools/build.py --all      -> all of the above

--pages and --apk need Node.js/npm and internet access to registry.npmjs.org (fonts);
--apk also needs Java 17+ and github.com (Apktool, uber-apk-signer).
"""
import os, re, sys, shutil, subprocess, urllib.request, tarfile, glob, hashlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, DIST, DOCS, CACHE = (os.path.join(ROOT, d) for d in ('src', 'dist', 'docs', '.cache'))
APKTOOL = ('https://github.com/iBotPeaches/Apktool/releases/download/v2.10.0/apktool_2.10.0.jar', 'apktool_2.10.0.jar')
SIGNER = ('https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar', 'uber-apk-signer-1.3.0.jar')
FONTS = [('@fontsource/chakra-petch', '5.3.0', [500, 600, 700]), ('@fontsource/be-vietnam-pro', '5.3.0', [400, 500, 600])]

def read(p): return open(p, encoding='utf-8').read()
def write(p, s): open(p, 'w', encoding='utf-8').write(s)

def build_web():
    shell = read(os.path.join(SRC, 'shell.html'))
    js = "(()=>{'use strict';\n" + "\n".join(read(os.path.join(SRC, f)) for f in ('data.js', 'game.js', 'game2.js')) + "\n})();"
    os.makedirs(DIST, exist_ok=True)
    out = os.path.join(DIST, 'cosmic-relics.html')
    write(out, shell.replace('/*__JS__*/', js))
    print('web   ->', out)
    return out

def fetch(url, name):
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, name)
    if not os.path.exists(p):
        print('download', url); urllib.request.urlretrieve(url, p)
    return p

def local_fonts(fontdir):
    """Copy the Vietnamese/Latin font files into fontdir; return @font-face CSS pointing at fonts/."""
    os.makedirs(fontdir, exist_ok=True); os.makedirs(CACHE, exist_ok=True)
    css = []
    for pkg, ver, weights in FONTS:
        tgz = subprocess.run(['npm', 'pack', f'{pkg}@{ver}', '--silent'], cwd=CACHE, capture_output=True, text=True, check=True).stdout.strip().splitlines()[-1]
        dest = os.path.join(CACHE, pkg.split('/')[-1]); shutil.rmtree(dest, ignore_errors=True)
        with tarfile.open(os.path.join(CACHE, tgz)) as t: t.extractall(dest)
        base = os.path.join(dest, 'package')
        for w in weights:
            for blk in re.findall(r'@font-face \{.*?\}', read(os.path.join(base, f'{w}.css')), re.S):
                name = re.search(r'files/([\w-]+)\.woff2', blk).group(1)
                if not re.search(r'-(latin|latin-ext|vietnamese)-\d', name): continue
                shutil.copy(os.path.join(base, 'files', name + '.woff2'), fontdir)
                css.append(re.sub(r'src: .*?;', f"src: url(fonts/{name}.woff2) format('woff2');", blk))
    return '<style>\n' + '\n'.join(css) + '\n</style>\n'

def offline_html(web_html, font_css):
    html = read(web_html)
    html = re.sub(r'<link rel="preconnect"[^>]*>\n', '', html)
    return re.sub(r'<link href="https://fonts.googleapis.com[^>]*>\n', lambda m: font_css, html)

# ---- Mobile web version (GitHub Pages, iOS + Android, works offline after first visit) ----
PAGES_HEAD = '''<meta name="description" content="Chronicles of Cosmic Relics – NASA Space Apps educational game: restore NASA equipment left on the Moon, Mars and in deep space.">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Cosmic Relics">
<meta name="format-detection" content="telephone=no">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
'''
PAGES_CSS = '''
/* ===== mobile web (iOS/Android) ===== */
html,body{-webkit-text-size-adjust:100%;text-size-adjust:100%;overscroll-behavior:none}
button,.opt,.tab,.logrow,.hudbtn{touch-action:manipulation}
body{-webkit-touch-callout:none}
.sheet{-webkit-overflow-scrolling:touch}
'''
PAGES_JS = '''<script>
/* roundRect for older browsers (iOS < 16) */
if(window.CanvasRenderingContext2D&&!CanvasRenderingContext2D.prototype.roundRect){CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){r=Math.min(typeof r==='number'?r:(r&&r[0])||0,w/2,h/2);this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();return this;};}
/* Block pinch-zoom on iOS Safari (the map has its own touch controls) */
['gesturestart','gesturechange'].forEach(function(ev){document.addEventListener(ev,function(e){e.preventDefault();},{passive:false});});
/* Offline play after the first visit */
if('serviceWorker' in navigator&&location.protocol.indexOf('http')===0){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}
</script>
<script>
(()=>{'use strict';'''
SW = '''/* Service worker: keeps the game on the device so it plays offline after the first visit.
   Generated by tools/build.py --pages; VERSION changes whenever the game changes. */
const VERSION = '%s';
const FILES = %s;
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first (always the newest version when online); the saved copy when offline.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
'''

def build_pages(web_html):
    """docs/index.html + docs/fonts + docs/sw.js. docs/manifest.webmanifest and docs/icons/ are kept as committed."""
    os.makedirs(DOCS, exist_ok=True)
    html = offline_html(web_html, local_fonts(os.path.join(DOCS, 'fonts')))
    html = html.replace('<meta name="theme-color" content="#070b1c">\n', '<meta name="theme-color" content="#070b1c">\n' + PAGES_HEAD, 1)
    html = html.replace('@media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }',
                        '@media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }' + PAGES_CSS, 1)
    html = html.replace("<script>\n(()=>{'use strict';", PAGES_JS, 1)
    html = html.replace("AC=AC||new (window.AudioContext||window.webkitAudioContext)();",
                        "AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended') AC.resume();", 1)
    for must in ('gesturestart', 'AC.resume', 'manifest.webmanifest'):
        assert must in html, 'docs build: could not patch ' + must
    write(os.path.join(DOCS, 'index.html'), html)
    files = ['./', 'index.html', 'manifest.webmanifest'] + ['icons/' + f for f in sorted(os.listdir(os.path.join(DOCS, 'icons')))] + \
            ['fonts/' + f for f in sorted(os.listdir(os.path.join(DOCS, 'fonts')))]
    version = 'cosmic-relics-' + hashlib.sha256(html.encode()).hexdigest()[:10]
    write(os.path.join(DOCS, 'sw.js'), SW % (version, '[\n  ' + ',\n  '.join("'%s'" % f for f in files) + '\n]'))
    open(os.path.join(DOCS, '.nojekyll'), 'w').close()
    print('pages ->', DOCS)

def build_apk(web_html):
    work = os.path.join(CACHE, 'apk'); shutil.rmtree(work, ignore_errors=True)
    shutil.copytree(os.path.join(ROOT, 'android'), work)
    html = offline_html(web_html, local_fonts(os.path.join(work, 'assets', 'fonts')))
    write(os.path.join(work, 'assets', 'index.html'), html)
    unsigned = os.path.join(CACHE, 'unsigned.apk')
    subprocess.run(['java', '-jar', fetch(*APKTOOL), 'b', work, '-o', unsigned], check=True)
    signed_dir = os.path.join(CACHE, 'signed'); shutil.rmtree(signed_dir, ignore_errors=True)
    subprocess.run(['java', '-jar', fetch(*SIGNER), '-a', unsigned, '-o', signed_dir], check=True)
    out = os.path.join(DIST, 'ChroniclesOfCosmicRelics.apk')
    shutil.copy(glob.glob(os.path.join(signed_dir, '*.apk'))[0], out)
    print('apk   ->', out)

if __name__ == '__main__':
    html = build_web()
    if '--pages' in sys.argv or '--all' in sys.argv: build_pages(html)
    if '--apk' in sys.argv or '--all' in sys.argv: build_apk(html)
