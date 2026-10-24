const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.evaluate(() => { document.getElementById('settingsCard').open = true; });
// Heft-Modus
await p.click('#heftBtn'); await p.waitForTimeout(300);
console.log('Heft:', await p.evaluate(() => `Zeilen ${pad.rows}, px/Mittelband ${pad.scale.toFixed(1)}, Linien ${appData.settings.guides}, Info: ${document.getElementById('heftInfo').textContent}`));
await p.locator('#padHolder').screenshot({ path: 'h_heft0.png' });
for (const g of ['1', '2', '3']) { await p.selectOption('#guidesSelect', g); await p.waitForTimeout(200); await p.locator('#padHolder').screenshot({ path: `h_heft${g}.png` }); }
// Vermessung: Balken 300 px = 57 mm
await p.click('#calibBtnScreen'); await p.fill('#msgCard input', '57'); await p.click('#msgCard button'); await p.waitForTimeout(300);
console.log('nach Vermessung:', await p.evaluate(() => `mm/px ${appData.settings.mmPerPx}, Zeilen ${pad.rows}, Zeilenabstand px ${(pad.scale * rowPitch()).toFixed(1)} = ${(pad.scale * rowPitch() * appData.settings.mmPerPx).toFixed(1)} mm`));
// im Heft-Modus schreiben und auswerten (kleine Schrift)
await p.selectOption('#guidesSelect', '0'); await p.waitForTimeout(200);
const r = await p.evaluate(() => { selectLetter('e'); const row = rowGeom(0); let t = performance.now();
  const ms = modelShape('e', studioVariantFor); const pts = ms.skel.slice().sort((a, b) => a.x - b.x);
  pad.strokes = [{ type: 'pen', src: 'pen', color: '#000', pts: ms.skel.map(q => ({ x: q.x + 1, y: row.base + q.y, p: .4, t: (t += 5) })) }];
  return analyzeAttempt(pad.strokes, { mode: 'letter', letter: 'e', rows: pad.rows, user: getActiveUser(), src: modelSource('e'), variantFor: studioVariantFor }).score != null; });
console.log('Auswertung im Heft-Modus möglich:', r);
// Arbeitsblatt mit nur Grundlinie, 3 mm
await p.click('[data-tab=paper]'); await p.selectOption('#wsBand', '3'); await p.selectOption('#wsGuides', '0');
const ws = await p.evaluate(() => buildWorksheet().toDataURL('image/png'));
require('fs').writeFileSync('ws_heft.png', Buffer.from(ws.split(',')[1], 'base64'));
console.log('Arbeitsblatt:', await p.evaluate(() => JSON.stringify(appData.lastWorksheet)));
console.log('ERR', errs); await b.close(); })();
