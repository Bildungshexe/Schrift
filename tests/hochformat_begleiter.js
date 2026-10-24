const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 820, height: 1180 }, hasTouch: true });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(900);
await p.evaluate(() => { const u = getActiveUser(); u.pet = { type: 'fuchs', name: 'Flocke' }; saveState(); renderPet(); petSet('freut', 0, 'Schön locker!', true); });
await p.waitForTimeout(300);
await p.screenshot({ path: 'studio_portrait.png' });
console.log('ERR', errs); await b.close(); })();
