const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1200);
// Künstliche Schreibschrift: Wörter aus Bögen (Höhe h, Bogenbreite w), Wortlücke gap, optional Unterlängen
const run = (name, o) => p.evaluate(({ name, o }) => {
  if (studio.mode !== 'free') setMode('free');
  pad.clear(); studio.evaluated = false;
  const cfg = lineCfg(); let t = performance.now(); const strokes = [];
  for (let r = 0; r < 3; r++) {
    const row = rowGeom(r, cfg); let x = 0.4;
    for (let wd = 0; wd < 4; wd++) {
      const pts = []; const n = 5;
      for (let k = 0; k <= n * 20; k++) {
        const u = k / 20, y = -o.h * Math.abs(Math.sin(u * Math.PI));
        pts.push([x + u * o.w, y + (Math.random() - 0.5) * 0.004]);
      }
      if (o.desc && wd % 2 === 0) { const xe = x + n * o.w; for (let k = 1; k <= 20; k++) pts.push([xe, k / 20 * o.desc]); }
      strokes.push(pts.map(([px, py]) => ({ x: px, y: row.base + py, p: 0.4, t: (t += 7) })));
      x += n * o.w + o.gap;
    }
  }
  pad.strokes = strokes.map(a => ({ type: 'pen', src: 'pen', color: '#000', pts: a }));
  pad.redraw(); evaluateAttempt();
  const h = getActiveUser().history[0], cap = (document.querySelector('#resultPanel .warn') || {}).textContent || '';
  return `${name}: Wert ${h.score}${cap ? ' [' + cap.slice(2, 70) + ']' : ''} · ` + ['size', 'lines', 'space'].map(k => k + '=' + (h.m[k] ?? '–')).join(' ') +
    ' · ' + [...document.querySelectorAll('#resultPanel .crit')].map(c => c.children[0].textContent + ': ' + c.children[2].textContent).filter(t => /Mittelband|Zeilen|Wortab/.test(t)).join(' | ');
}, { name, o });
await p.evaluate(() => { appData.settings.resultView = 'alle'; });
console.log(await run('normal', { h: 1, w: 0.55, gap: 1.1 }));
console.log(await run('flach', { h: 0.42, w: 0.8, gap: 1.1 }));
console.log(await run('zu groß mit Unterlängen', { h: 1.6, w: 0.6, gap: 1.2, desc: 3.2 }));
console.log(await run('ohne Wortlücken', { h: 1, w: 0.55, gap: 0.12 }));
console.log(await run('riesige Lücken', { h: 1, w: 0.55, gap: 3.5 }));
await p.evaluate(() => { appData.settings.heftMm = 9; appData.settings.rowsByMode.free = 'heft'; pad.setRows('heft'); });
console.log(await run('Heft 9 mm', { h: 1, w: 0.55, gap: 1.1 }));
console.log('ERR', errs); await b.close(); })();
