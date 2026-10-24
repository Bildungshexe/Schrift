const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.evaluate(() => { document.getElementById('settingsCard').open = true; });
await p.click('#heftBtn'); await p.selectOption('#heftMm', '3.5'); await p.waitForTimeout(300);
await p.click('#panelToggle'); await p.waitForTimeout(300);
console.log(await p.evaluate(() => `3,5 mm: ${pad.rows} Zeilen, ${pad.scale.toFixed(1)} px je Mittelband`));
// sauber nachgefahrenes e in Mini-Größe: Zittern darf nicht anschlagen
const r = await p.evaluate(() => { selectLetter('e'); const row = rowGeom(0); let t = 0;
  const ms = modelShape('e', studioVariantFor);
  // Mittellinie der Vorlage als eine Linie (nach Winkel um den Mittelpunkt sortiert, reicht für den Test)
  const q = 1 / pad.scale; // auf Bildschirmpixel runden wie bei Maus/Finger
  const pts = ms.skel.map(s => ({ x: Math.round((s.x + 1) / q) * q, y: Math.round((row.base + s.y) / q) * q }));
  pad.strokes = [{ type: 'mouse', src: 'sim', color: '#000', pts: pts.map(s => ({ ...s, p: .5, t: (t += 6) })) }];
  const res = analyzeAttempt(pad.strokes, { mode: 'letter', letter: 'e', rows: pad.rows, user: getActiveUser(), src: modelSource('e'), variantFor: studioVariantFor, pxPerBand: pad.scale });
  const res2 = analyzeAttempt(pad.strokes, { mode: 'letter', letter: 'e', rows: pad.rows, user: getActiveUser(), src: modelSource('e'), variantFor: studioVariantFor });
  const tr = x => (x.crit.find(c => c.key === 'tremor') || {}).score;
  return `Zittern mit Korrektur: ${tr(res)} · ohne Korrektur: ${tr(res2)}`; });
console.log(r);
await p.locator('#padHolder').screenshot({ path: 'k_mini.png' });
await p.click('[data-tab=paper]'); await p.selectOption('#wsBand', '1.5'); await p.selectOption('#wsGuides', '0');
const ws = await p.evaluate(() => buildWorksheet().toDataURL('image/png'));
require('fs').writeFileSync('ws_mini.png', Buffer.from(ws.split(',')[1], 'base64'));
console.log('Arbeitsblatt 1,5 mm:', await p.evaluate(() => `Zeilen ${appData.lastWorksheet.n}, Zeilenabstand ${appData.lastWorksheet.pitch.toFixed(2)} mm`));
console.log('ERR', errs); await b.close(); })();
