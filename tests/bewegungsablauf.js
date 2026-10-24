const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.click('#panelToggle'); await p.waitForTimeout(400);
const box = await p.locator('#padHolder').boundingBox();
// Pfad in Mittelband-Einheiten (y relativ zur Grundlinie, nach unten positiv) schreiben
async function write(path) {
  const px = await p.evaluate(P => { const r = rowGeom(0), tf = pad.tf; return P.map(([x, y]) => [tf.ox + x * tf.scale, (r.base + y) * tf.scale]); }, path);
  await p.mouse.move(box.x + px[0][0], box.y + px[0][1]); await p.mouse.down();
  for (const [x, y] of px) { await p.mouse.move(box.x + x, box.y + y); await p.waitForTimeout(10); }
  await p.mouse.up();
}
const circle = (cx, cw) => Array.from({ length: 41 }, (_, i) => { const a = -Math.PI / 4 + (cw ? 1 : -1) * i / 40 * 2 * Math.PI; return [cx + 0.42 * Math.cos(a), -0.5 + 0.48 * Math.sin(a)]; });
async function evalOne(letter, path, tag) {
  await p.evaluate(l => { selectLetter(l); pad.clear(); studio.evaluated = false; }, letter);
  await write(path); await p.click('#evalBtn'); await p.waitForTimeout(250);
  console.log(tag, await p.evaluate(() => { const u = getActiveUser(), h = u.history[0], c = [...document.querySelectorAll('#resultPanel .crit')].map(x => x.children[0].textContent + '=' + x.children[2].textContent).filter(t => /Bewegung/.test(t));
    return `Wert ${h.score} · Spurhilfe ${h.g ? 'ja' : 'nein'} · ${c.join(' | ') || 'kein Bewegungs-Kriterium'} · Stats ${u.letterStats[h.letter] ? u.letterStats[h.letter].n : 0}`; }));
}
await p.evaluate(() => { getActiveUser().ghostOk = { e: 3, o: 3, a: 3, d: 3 }; });
const smooth = P => { const out = []; for (let i = 0; i < P.length - 1; i++) for (let k = 0; k < 6; k++) out.push([P[i][0] + (P[i+1][0] - P[i][0]) * k / 6, P[i][1] + (P[i+1][1] - P[i][1]) * k / 6]); out.push(P[P.length - 1]); return out; };
await evalOne('e', smooth([[1.1,-0.5],[1.9,-0.5],[1.85,-0.85],[1.5,-1],[1.15,-0.8],[1.05,-0.4],[1.2,-0.05],[1.6,0],[1.9,-0.15]]), 'e Druckschrift:');
await evalOne('e', smooth([[1.0,0],[1.7,-0.55],[1.6,-0.95],[1.35,-0.95],[1.1,-0.5],[1.25,-0.05],[1.7,0],[2.0,-0.2]]), 'e Schreibschrift:');
await evalOne('e', smooth([[2.0,-0.2],[1.7,0],[1.25,-0.05],[1.1,-0.5],[1.35,-0.95],[1.6,-0.95],[1.7,-0.55],[1.0,0]]), 'e rückwärts:');
await evalOne('a', smooth([[1.9,-0.85],[1.5,-1],[1.15,-0.75],[1.1,-0.3],[1.4,0],[1.8,-0.2],[1.9,-0.6],[1.9,-1],[1.9,0],[2.1,-0.1]]), 'a richtig:');
await evalOne('d', smooth([[1.9,-0.85],[1.5,-1],[1.15,-0.75],[1.1,-0.3],[1.4,0],[1.8,-0.2],[1.9,-1],[1.95,-2],[1.95,0],[2.1,-0.1]]), 'd richtig:');
console.log('ERR', errs); await b.close(); })();
