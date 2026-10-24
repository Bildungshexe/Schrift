const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
const box = await p.locator('#padHolder').boundingBox();
async function write(path) { await p.evaluate(() => document.getElementById('padHolder').scrollIntoView({ block: 'start' })); await p.waitForTimeout(100); const box = await p.locator('#padHolder').boundingBox();
  const px = await p.evaluate(P => { const r = rowGeom(0), tf = pad.tf; return P.map(([x, y]) => [tf.ox + x * tf.scale, (r.base + y) * tf.scale]); }, path);
  await p.mouse.move(box.x + px[0][0], box.y + px[0][1]); await p.mouse.down();
  for (const [x, y] of px) { await p.mouse.move(box.x + x, box.y + y); await p.waitForTimeout(10); }
  await p.mouse.up();
}
const circle = cw => Array.from({ length: 41 }, (_, i) => { const a = -Math.PI / 4 + (cw ? 1 : -1) * i / 40 * 2 * Math.PI; return [1.5 + 0.42 * Math.cos(a), -0.5 + 0.48 * Math.sin(a)]; });
const view = () => p.evaluate(() => { const bx = document.getElementById('resultPanel');
  const vis = [...bx.querySelectorAll(':scope > .crit')].map(c => c.children[0].textContent + ' ' + c.children[2].textContent);
  return `sichtbar: [${vis.join(' | ')}] · Tipp: ${(bx.querySelector(':scope > .tip, :scope > .praise') || {}).textContent || '–'} · aufklappbar: ${bx.querySelectorAll('details.all-crit .crit').length} Werte`; });
await p.evaluate(() => { selectLetter('o'); getActiveUser().ghostOk = { o: 3 }; pad.redrawGuides(); });
await write(circle(true)); await p.click('#evalBtn'); await p.waitForTimeout(300);
console.log('Kind, ohne Schwerpunkt:', await view());
await p.locator('#resultPanel').screenshot({ path: 'x3_kind.png' });
await p.click('[data-tab=users]'); await p.waitForTimeout(200);
await p.click('#focusChips button:has-text("Grundlinie")'); await p.click('#focusChips button:has-text("Flüssigkeit")'); await p.click('#focusChips button:has-text("Neigung")');
console.log('Schwerpunkte:', await p.evaluate(() => appData.settings.focusCrit.join(',')));
await p.click('[data-tab=draw]'); await p.waitForTimeout(300); await p.evaluate(() => { pad.clear(); studio.evaluated = false; }); await write(circle(true)); await p.click('#evalBtn'); await p.waitForTimeout(300);
console.log('Kind, mit Schwerpunkten:', await view());
await p.click('[data-tab=users]'); await p.selectOption('#resultViewSel', 'alle');
await p.click('[data-tab=draw]'); await p.evaluate(() => { pad.clear(); studio.evaluated = false; }); await write(circle(true)); await p.click('#evalBtn'); await p.waitForTimeout(300);
console.log('Ausführlich:', (await view()).slice(0, 160));
console.log('ERR', errs); await b.close(); })();
