const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.click('[data-tab=world]'); await p.waitForTimeout(300);
await p.click('#petChoice button:nth-child(2)'); await p.waitForTimeout(400);
await p.locator('#petChoice').screenshot({ path: 'e_choice.png' });
await p.click('[data-tab=draw]'); await p.waitForTimeout(300);
const res = [];
for (const st of ['normal', 'freut', 'gequetscht', 'stolpert', 'schlaeft', 'jubelt']) {
  await p.evaluate(s => { pet.hold = false; petSet(s, 0, 'Test: ' + s, true); }, st); await p.waitForTimeout(150);
  res.push(st + ':' + await p.evaluate(() => { const i = document.querySelector('#pet img'); return i ? (i.src === IMG['pet_eule_' + pet.state]?.src ? 'eigenes Bild' : 'Ersatzbild') : 'Emoji'; }));
  await p.locator('.live').screenshot({ path: `e_${st}.png` });
}
console.log(res.join(' | '));
console.log('panel', await p.evaluate(() => { renderImagePanel(); return document.getElementById('imgCount').textContent; }));
console.log('ERR', errs); await b.close(); })();
