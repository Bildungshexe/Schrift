# Weißen Hintergrund vom Rand aus entfernen, zuschneiden, auf 256×256 PNG bringen.
# Aufruf: python3 werkzeuge/freistellen.py quelle.jpg=bilder/begleiter/pet_fuchs_normal.png [weitere Paare …]
import sys
from PIL import Image
import numpy as np
from collections import deque
def cutout(src, dst):
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int); H, W, _ = a.shape
    mn = a.min(2); sp = a.max(2) - mn
    alpha = np.full((H, W), 255, np.uint8); seen = np.zeros((H, W), bool); q = deque()
    for x in range(W): q.append((0, x)); q.append((H - 1, x))
    for y in range(H): q.append((y, 0)); q.append((y, W - 1))
    while q:
        y, x = q.popleft()
        if seen[y, x]: continue
        seen[y, x] = True
        if mn[y, x] >= 232 and sp[y, x] < 26:
            alpha[y, x] = 0
            if y > 0: q.append((y - 1, x))
            if y < H - 1: q.append((y + 1, x))
            if x > 0: q.append((y, x - 1))
            if x < W - 1: q.append((y, x + 1))
        elif mn[y, x] >= 196 and sp[y, x] < 45:
            alpha[y, x] = min(alpha[y, x], int(round(max(0, min(1, (232 - mn[y, x]) / 36)) * 255)))
    out = Image.fromarray(np.dstack([a.astype(np.uint8), alpha]), 'RGBA')
    bb = out.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    out = out.crop(bb); w, h = out.size; s = max(w, h); pad = int(s * 0.04)
    sq = Image.new('RGBA', (s + 2 * pad, s + 2 * pad), (0, 0, 0, 0)); sq.paste(out, ((s - w) // 2 + pad, (s - h) // 2 + pad))
    sq.resize((256, 256), Image.LANCZOS).save(dst, optimize=True)
for pair in sys.argv[1:]:
    src, dst = pair.split('=')
    cutout(src, dst); print('ok', dst)
