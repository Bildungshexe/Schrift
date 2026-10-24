# Bettet alle Bilder aus bilder/begleiter und bilder/welten (Dateiname = Bild-Platz) als BUILTIN_IMAGES in index.html ein.
# Aufruf im Hauptordner des Repositorys: python3 werkzeuge/bilder_einbetten.py
import base64, glob, os, re
p = 'index.html'; s = open(p).read()
imgs = {}
for f in sorted(glob.glob('bilder/begleiter/pet_*.png') + glob.glob('bilder/welten/welt_*.png') + glob.glob('bilder/welten/welt_*.jpg')):
    name, ext = os.path.splitext(os.path.basename(f))
    mime = 'image/jpeg' if ext == '.jpg' else 'image/png'
    imgs[name] = 'data:%s;base64,' % mime + base64.b64encode(open(f, 'rb').read()).decode()
body = "const BUILTIN_IMAGES = {\n" + ",\n".join("  %s: '%s'" % (k, v) for k, v in imgs.items()) + "\n};"
new, n = re.subn(r"const BUILTIN_IMAGES = \{.*?\n\};", lambda m: body, s, count=1, flags=re.S)
assert n == 1
open(p, 'w').write(new)
print(len(imgs), 'Bilder eingebettet:', ', '.join(imgs), '| Datei', len(new) // 1024, 'KB')
