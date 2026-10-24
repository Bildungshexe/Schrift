const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1000);
for (const [name, fn] of [['tree_full', `const u = getActiveUser(); const d1 = Date.now() - 2*864e5, d0 = Date.now();
  const add = (ts, ch, sc) => u.history.unshift({ ts, mode: 'letter', target: ch, letter: ch, score: sc, m: { base: 90, size: 90, slant: 90, flu: 90, pressure: 95 } });
  for (const g of TREE_GROUPS) for (const ch of g.letters) add(d1, ch, 85);
  for (const g of TREE_GROUPS) for (const ch of g.letters) { add(d0, ch, 'gjpqy'.includes(ch) ? 60 : 92); add(d0, ch, 'gjpqy'.includes(ch) ? 60 : 92); }`],
  ['tree_bad', `const u = getActiveUser(); u.history = []; for (const ch of 'aeilnost') u.history.unshift({ ts: Date.now(), mode: 'letter', target: ch, letter: ch, score: 20, m: { base: 25, size: 20, flu: 15, pressure: 30 } });`],
  ['tree_start', `getActiveUser().history = [];`]]) {
  await p.evaluate(fn + '; saveState();');
  await p.evaluate(() => openTree()); await p.waitForTimeout(400);
  console.log(name, await p.textContent('#treeSummary'));
  await p.locator('#treeBig').screenshot({ path: name + '.png' });
  await p.evaluate(() => closeTree());
}
await p.locator('header').screenshot({ path: 'header.png' });
console.log('ERR', errs); await b.close(); })();
