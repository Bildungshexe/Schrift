const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1200);
// Leerer Schreiber: Berichte dürfen nicht abstürzen
console.log('leer:', await p.evaluate(() => { buildSupportReport(); buildParentReport('first'); return 'ok'; }));
// Simulierter Verlauf über 8 Wochen: Form und Grundlinie werden besser, Druck schlechter
await p.evaluate(() => {
  const u = getActiveUser(); u.name = 'Mia'; const now = Date.now(); let seed = 3; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  u.history = [];
  for (let i = 0; i < 40; i++) {
    const f = i / 39, ts = now - (56 - f * 56) * 864e5, ch = 'aegln'[i % 5];
    const m = { form: Math.round(45 + 40 * f + rnd() * 8), base: Math.round(50 + 35 * f), size: Math.round(70 + rnd() * 10), slant: 80, flu: Math.round(60 + 20 * f), pressure: Math.round(85 - 30 * f), dir: i % 4 ? 100 : 50, extent: Math.round(55 + 10 * f) };
    u.history.unshift({ ts, mode: 'letter', target: ch, letter: ch, variant: 'va', score: Math.round(48 + 30 * f + rnd() * 6), m, pAvg: null });
  }
  u.history.unshift({ ts: now, mode: 'letter', target: 'e', letter: 'e', score: 99, m: { form: 99 }, g: 1 }); // Nachspuren: zählt nicht
  u.letterStats = { a: { n: 8, sum: 8 * 62, best: 80, box: 1, due: 0 }, e: { n: 8, sum: 8 * 81, best: 90, box: 2, due: 0 }, g: { n: 8, sum: 8 * 55, best: 70, box: 1, due: 0 } };
  const loop = (k) => { const s = []; for (let i = 0; i <= 40; i++) { const a = (40 + i * 9) * Math.PI / 180; s.push(+(0.5 + 0.42 * Math.cos(a) + k * Math.sin(i)).toFixed(2), +(-0.5 - 0.5 * Math.sin(a)).toFixed(2)); } return { s: [s], w: 1 }; };
  u.samples = { a: { first: { ...loop(0.05), score: 48, ts: now - 50 * 864e5 }, latest: { ...loop(0), score: 80, ts: now - 864e5 } } };
  saveState();
});
for (const [name, fn] of [['bericht_foerder', 'buildSupportReport()'], ['bericht_eltern', "buildParentReport('first')"], ['bericht_eltern_wochen', "buildParentReport('weeks')"]]) {
  const url = await p.evaluate(f => eval(f).toDataURL('image/png'), fn);
  require('fs').writeFileSync(name + '.png', Buffer.from(url.split(',')[1], 'base64'));
}
await p.click('[data-tab=stats]'); await p.click('#parentPreviewBtn'); await p.waitForTimeout(400);
console.log('Vorschau:', await p.evaluate(() => !!document.querySelector('#reportPreview img')));
console.log('Kriterien Förder:', await p.evaluate(() => Object.entries(critAvg(reportAttempts(getActiveUser()).slice(-20))).map(([k, v]) => k + '=' + v.avg).join(' ')));
console.log('Nachspuren gezählt:', await p.evaluate(() => reportAttempts(getActiveUser()).some(h => h.g)));
console.log('ERR', errs); await b.close(); })();
