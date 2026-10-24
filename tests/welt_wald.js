const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.evaluate(() => { const u = getActiveUser(); addPoints(u, 300); u.pet = { type: 'fuchs', name: 'Flinki' }; saveState(); });
await p.click('[data-tab=world]'); await p.waitForTimeout(300);
await p.click('#worldCards button:nth-child(1)'); await p.waitForTimeout(300);
for (const [i, x, y] of [[4, .2, .75], [1, .45, .9], [2, .6, .8], [5, .8, .7], [6, .35, .65], [7, .7, .62]]) {
  await p.click(`#shop button:nth-child(${i})`);
  await p.locator('#scene').scrollIntoViewIfNeeded(); const sb = await p.locator('#scene').boundingBox();
  await p.mouse.click(sb.x + sb.width * x, sb.y + sb.height * y); await p.waitForTimeout(150); }
console.log('Bauteile:', await p.evaluate(() => getActiveUser().worlds.wald.items.map(i => i.i).join(', ')));
await p.locator('#scene').screenshot({ path: 'wald.png' });
await p.locator('#petChoice').screenshot({ path: 'f_choice.png' });
console.log('ERR', errs); await b.close(); })();
