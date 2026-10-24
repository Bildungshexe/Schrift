const { chromium } = require('playwright');
(async () => { for (const [vw, vh, name] of [[1180, 820, 'quer'], [820, 1180, 'hoch']]) {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: vw, height: vh } });
  const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
  await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
  await p.evaluate(() => { getActiveUser().pet = { type: 'eule', name: '' }; getActiveUser().history.push({ ts: Date.now(), mode: 'letter', target: 'e', score: 50, m: {} }); saveState(); renderPet(); });
  await p.screenshot({ path: `l_${name}_vorher.png` });
  const before = await p.evaluate(() => { const r = document.getElementById('padHolder').getBoundingClientRect(); return `Feld ${Math.round(r.width)}×${Math.round(r.height)} ab y=${Math.round(r.top)}`; });
  await p.click('#panelToggle'); await p.waitForTimeout(400);
  await p.screenshot({ path: `l_${name}_ohne_leiste.png` });
  const after = await p.evaluate(() => { const r = document.getElementById('padHolder').getBoundingClientRect(); return `Feld ${Math.round(r.width)}×${Math.round(r.height)} · Leiste aus: ${appData.settings.panelOff} · Knopf: ${document.getElementById('panelToggle').textContent} · Punkt am Sichern: ${!document.getElementById('backupDot').classList.contains('hidden')}`; });
  console.log(name, '| mit Leiste:', before, '| ohne:', after, '| ERR', errs);
  await b.close(); } })();
