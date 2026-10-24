const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1000);
const r = await p.evaluate(() => {
  const row = rowGeom(0); let t = 0;
  const mk = pts => ({ src: 'sim', pts: pts.map(([x, y]) => ({ x, y: row.base + y, p: 0.5, t: (t += 8) })) });
  const line = (x, y0, y1) => { const a = []; for (let k = 0; k <= 30; k++) a.push([x, y0 + (y1 - y0) * k / 30]); return mk(a); };
  const loopL = x => { const a = []; // Anstrich hoch, Schlaufe oben, Abstrich
    for (let k = 0; k <= 60; k++) { const th = k / 60 * 2 * Math.PI; a.push([x + 0.25 * Math.sin(th) + 0.0, -0.9 - 0.9 * (1 - Math.cos(th)) / 2 * 1.0]); }
    for (let k = 0; k <= 20; k++) a.push([x, -0.9 + 0.9 * k / 20]); return mk(a); };
  const run = (ch, v, strokes) => { const u = getActiveUser(); const src = modelSource(ch, v); const res = analyzeAttempt(strokes, { mode: 'letter', letter: ch, rows: 1, user: u, src });
    return `${ch}/${v}: ` + res.crit.filter(c => ['struct','extent'].includes(c.key)).map(c => `${c.name}=${c.score} [${c.value}] tip=${c.tip||'-'}`).join(' | ') + ' || info: ' + res.info.filter(i => /Schlaufe|Punkt/.test(i)).join(' / '); };
  return [
    run('l', 'va', [line(1, -1.8, 0)]),          // VA-l ohne Schlaufe
    run('l', 'va', [loopL(1)]),                  // VA-l mit Schlaufe
    run('l', 'gs', [loopL(1)]),                  // Grundschrift-l mit Schlaufe -> nur Hinweis
    run('i', 'va', [line(1, -1, 0)]),            // i ohne Punkt
  ];
});
console.log(r.join('\n')); console.log('ERR', errs);
await p.click('[data-tab=alphabet]'); await p.waitForTimeout(300);
await p.click('#alphaGrid button[data-ch=g]'); await p.waitForTimeout(300);
console.log(await p.textContent('#alphaFeatures'));
await b.close(); })();
