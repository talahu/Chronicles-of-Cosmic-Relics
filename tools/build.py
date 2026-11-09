#!/usr/bin/env python3
"""Build Chronicles of Cosmic Relics.

  python3 tools/build.py          -> dist/cosmic-relics.html (web version)
  python3 tools/build.py --apk    -> also dist/ChroniclesOfCosmicRelics.apk

APK build needs: Java 17+, Node.js/npm, internet access to github.com and registry.npmjs.org.
"""
import os, re, sys, shutil, subprocess, urllib.request, tarfile, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, DIST, CACHE = (os.path.join(ROOT, d) for d in ('src', 'dist', '.cache'))
APKTOOL = ('https://github.com/iBotPeaches/Apktool/releases/download/v2.10.0/apktool_2.10.0.jar', 'apktool_2.10.0.jar')
SIGNER = ('https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar', 'uber-apk-signer-1.3.0.jar')
FONTS = [('@fontsource/chakra-petch', '5.3.0', [500, 600, 700]), ('@fontsource/be-vietnam-pro', '5.3.0', [400, 500, 600])]

def read(p): return open(p, encoding='utf-8').read()

def build_web():
    shell = read(os.path.join(SRC, 'shell.html'))
    js = "(()=>{'use strict';\n" + "\n".join(read(os.path.join(SRC, f)) for f in ('data.js', 'game.js', 'game2.js')) + "\n})();"
    os.makedirs(DIST, exist_ok=True)
    out = os.path.join(DIST, 'cosmic-relics.html')
    open(out, 'w', encoding='utf-8').write(shell.replace('/*__JS__*/', js))
    print('web  ->', out)
    return out

def fetch(url, name):
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, name)
    if not os.path.exists(p):
        print('download', url); urllib.request.urlretrieve(url, p)
    return p

def build_apk(web_html):
    work = os.path.join(CACHE, 'apk'); shutil.rmtree(work, ignore_errors=True)
    shutil.copytree(os.path.join(ROOT, 'android'), work)
    fontdir = os.path.join(work, 'assets', 'fonts'); os.makedirs(fontdir)
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
    html = read(web_html)
    html = re.sub(r'<link rel="preconnect"[^>]*>\n', '', html)
    html = re.sub(r'<link href="https://fonts.googleapis.com[^>]*>\n', lambda m: '<style>\n' + '\n'.join(css) + '\n</style>\n', html)
    open(os.path.join(work, 'assets', 'index.html'), 'w', encoding='utf-8').write(html)
    unsigned = os.path.join(CACHE, 'unsigned.apk')
    subprocess.run(['java', '-jar', fetch(*APKTOOL), 'b', work, '-o', unsigned], check=True)
    signed_dir = os.path.join(CACHE, 'signed'); shutil.rmtree(signed_dir, ignore_errors=True)
    subprocess.run(['java', '-jar', fetch(*SIGNER), '-a', unsigned, '-o', signed_dir], check=True)
    out = os.path.join(DIST, 'ChroniclesOfCosmicRelics.apk')
    shutil.copy(glob.glob(os.path.join(signed_dir, '*.apk'))[0], out)
    print('apk  ->', out)

if __name__ == '__main__':
    html = build_web()
    if '--apk' in sys.argv: build_apk(html)
