const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2 });
const errs=[]; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1200);
await p.click('[data-tab=world]'); await p.click('#petChoice button:nth-child(2)'); await p.click('[data-tab=draw]'); await p.waitForTimeout(2200);
const box = await p.locator('#padHolder').boundingBox();
const st = async t => console.log(t.padEnd(30), await p.evaluate(() => document.getElementById('pet').className + ' | ' + (document.getElementById('petBubble').classList.contains('hidden') ? '-' : document.getElementById('petBubble').textContent)));
// Strich weit über die Linie hinaus
await p.mouse.move(box.x + 100, box.y + 300); await p.mouse.down(); await p.mouse.move(box.x + 120, box.y + 300, { steps: 5 }); await p.mouse.move(box.x + 140, box.y + 15, { steps: 10 });
await st('während Strich über Linie:'); await p.mouse.up(); await p.waitForTimeout(1700);
await p.click('#clearBtn'); await p.waitForTimeout(2600);
// zittriger Strich
await p.mouse.move(box.x + 100, box.y + 260); await p.mouse.down();
for (let k = 0; k < 60; k++) await p.mouse.move(box.x + 100 + k * 4, box.y + 260 + (k % 2 ? 7 : -7));
await p.mouse.up(); await st('nach zittrigem Strich:');
await p.click('#clearBtn'); await p.waitForTimeout(2600);
// Gekritzel auswerten
await p.mouse.move(box.x + 100, box.y + 260); await p.mouse.down();
for (let k = 0; k < 40; k++) await p.mouse.move(box.x + 100 + Math.random() * 120, box.y + 200 + Math.random() * 100);
await p.mouse.up(); await p.waitForTimeout(2600); await p.click('#evalBtn'); await p.waitForTimeout(150);
await st('nach Auswertung (Gekritzel):');
console.log('Ergebnis-Begleiter:', await p.evaluate(() => { const r = document.querySelector('.res-pet'); return r ? r.querySelector('.pet').className + ' | ' + r.textContent : 'fehlt'; }));
await p.locator('#resultPanel').scrollIntoViewIfNeeded(); await p.locator('.res-pet').screenshot({ path: 'r_pet.png' });
console.log('ERR', errs); await b.close(); })();
