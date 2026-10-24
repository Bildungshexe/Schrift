const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1200);
// Striche direkt ins Schreibfeld legen (Stift, flüssiges Tempo) und wie ein Kind auswerten
const run = (name, mode, target, gen) => p.evaluate(({ name, mode, target, gen }) => {
  if (mode !== studio.mode) setMode(mode);
  if (mode === 'letter') selectLetter(target); else if (mode === 'word') { studio.word = target; renderStudio(); }
  pad.clear(); studio.evaluated = false;
  const row = rowGeom(0); let t = performance.now();
  const strokes = new Function('row', 'rnd', gen)(row, Math.random);
  pad.strokes = strokes.map(a => ({ type: 'pen', src: 'pen', color: '#000', pts: a.map(([x, y]) => ({ x, y: row.base + y, p: 0.4, t: (t += 6) })) }));
  const u = getActiveUser(); u.badges = Object.fromEntries(BADGES.map(b => [b.id, 1]));  // Abzeichen-Bonus aus dem Test heraushalten
  const coins = u.coins, hl = u.history.length, ink = pad.strokes.reduce((a, s) => a + pathLen(s.pts), 0);
  evaluateAttempt();
  if (u.history.length === hl) return name + ': nicht ausgewertet (Tinte ' + ink.toFixed(2) + ', Striche ' + pad.strokes.length + ', Toast: ' + document.getElementById('toast').textContent + ')';
  const res = document.getElementById('resultPanel').textContent.replace(/\s+/g, ' ');
  return `${name}: Punkte ${u.history[0].score} · Tropfen +${u.coins - coins} · ${res.match(/⚠️[^.]*\./)?.[0] || ''} · ${[...document.querySelectorAll('#resultPanel .crit')].map(c => c.children[0].textContent + '=' + c.children[2].textContent.split(' ·')[0]).join(', ')}`;
}, { name, mode, target, gen });
// Skelett der Vorlage als echte Polylinie (Nachbarpixel verbinden) + Verformung/Zittern
const fromModel = (ch, amp, jit, dx) => `
  const ms = modelShape(${JSON.stringify(ch)}, studioVariantFor); const pts = ms.skel.map(p => ({...p}));
  const used = new Set(), out = []; const key = p => Math.floor(p.x*40+1e-6)+','+Math.floor(p.y*40+1e-6);
  const map = new Map(pts.map(p => [key(p), p]));
  for (const s0 of pts) { if (used.has(key(s0))) continue; let cur = s0; const line = [];
    while (cur && !used.has(key(cur))) { used.add(key(cur)); line.push(cur); let nx = null;
      for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]) { const q = map.get((Math.floor(cur.x*40+1e-6)+dx)+','+(Math.floor(cur.y*40+1e-6)+dy)); if (q && !used.has(key(q))) { nx = q; break; } }
      cur = nx; }
    if (line.length > 1) out.push(line); }
  const ph = rnd()*6;
  return out.filter(l => l.length > 2).map(l => l.filter((_, i) => i % 2 === 0).map(p => [p.x + ${dx} + ${amp}*Math.sin(p.y*3+ph) + (rnd()-0.5)*${jit}, p.y + ${amp}*Math.cos(p.x*2.5+ph) + (rnd()-0.5)*${jit}]));`;
const lines = [];
lines.push(await run('e sauber (Vorlage nachgefahren)', 'letter', 'e', fromModel('e', 0.02, 0, 1)));
lines.push(await run('e leicht abweichend', 'letter', 'e', fromModel('e', 0.08, 0, 1)));
lines.push(await run('e deutlich abweichend', 'letter', 'e', fromModel('e', 0.18, 0, 1)));
lines.push(await run('e zittrig', 'letter', 'e', fromModel('e', 0.02, 0.06, 1)));
lines.push(await run('c statt e', 'letter', 'e', fromModel('c', 0.02, 0, 1)));
lines.push(await run('o statt e', 'letter', 'e', fromModel('o', 0.02, 0, 1)));
lines.push(await run('Gekritzel statt e', 'letter', 'e', `const a=[]; for(let k=0;k<60;k++) a.push([1+rnd()*1.2, -rnd()*1.1]); return [a];`));
lines.push(await run('ein Strich statt e', 'letter', 'e', `const a=[]; for(let k=0;k<30;k++) a.push([1, -1+k/29]); return [a];`));
lines.push(await run('Schlaufe statt l (zu klein)', 'letter', 'l', `const a=[]; for(let k=0;k<60;k++){const t=k/59*2*Math.PI; a.push([1+0.25*Math.sin(t), -0.5-0.5*(1-Math.cos(t))/2]);} return [a];`));
lines.push(await run('l sauber', 'letter', 'l', fromModel('l', 0.02, 0, 1)));
lines.push(await run('Wort Ente sauber', 'word', 'Ente', fromModel('Ente', 0.03, 0, 0.5)));
lines.push(await run('Wort Ente zu breit gezogen', 'word', 'Ente', fromModel('Ente', 0.03, 0, 0.5).replace('p.x + 0.5', 'p.x*1.6 + 0.5')));
lines.push(await run('Wort Ente – Gekritzel', 'word', 'Ente', `const a=[]; for(let k=0;k<120;k++) a.push([0.5+rnd()*4, -rnd()*1.8]); return [a];`));
console.log(lines.join('\n')); console.log('ERR', errs); await b.close(); })();
