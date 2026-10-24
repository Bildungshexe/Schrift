const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.click('#panelToggle'); await p.waitForTimeout(300);
const box = await p.locator('#padHolder').boundingBox();
// Vorlage „e“ als Mausbewegung in echter Zeit nachfahren (1 Zeile groß)
const pts = await p.evaluate(() => { const row = rowGeom(0), ms = modelShape('e', studioVariantFor), tf = pad.tf;
  const P = ms.skel.map(s => ({ x: s.x + 1.2, y: row.base + s.y })), out = [P[0]], used = new Set([0]);
  // Skelettpunkte zu einem Pfad verketten (nächster Nachbar)
  let cur = 0; for (let k = 1; k < P.length; k++) { let bi = -1, bd = 1e9; for (let j = 0; j < P.length; j++) { if (used.has(j)) continue; const d = Math.hypot(P[j].x - P[cur].x, P[j].y - P[cur].y); if (d < bd) { bd = d; bi = j; } } if (bd > 0.3) break; used.add(bi); out.push(P[bi]); cur = bi; }
  return out.filter((_, i) => i % 3 === 0).map(q => [tf.ox + q.x * tf.scale, q.y * tf.scale]); });
await p.mouse.move(box.x + pts[0][0], box.y + pts[0][1]); await p.mouse.down();
for (const [x, y] of pts) await p.mouse.move(box.x + x, box.y + y);
await p.mouse.up();
// zweiter, bewusst falscher Strich (Zickzack daneben)
await p.mouse.move(box.x + 600, box.y + 300); await p.mouse.down();
for (let k = 0; k < 20; k++) await p.mouse.move(box.x + 600 + k * 8, box.y + 300 + (k % 2 ? 60 : 0));
await p.mouse.up();
await p.click('#evalBtn'); await p.waitForTimeout(300);
console.log('Kriterien:', await p.evaluate(() => [...document.querySelectorAll('#resultPanel .crit')].map(c => c.children[0].textContent + '=' + c.children[2].textContent).filter(t => /tempo|Rhythmus|Druck/i.test(t)).join(' | ')));
console.log('Markierung:', await p.evaluate(() => pad.strokes.map((s, i) => `Strich ${i + 1}: ${s.pts.filter(q => q.bad).length}/${s.pts.length} rot`).join(', ')));
await p.locator('#padHolder').screenshot({ path: 'u_marked.png' });
// Radierer: Zickzack wegwischen
await p.click('#eraseBtn'); await p.mouse.move(box.x + 640, box.y + 330); await p.mouse.down(); await p.mouse.move(box.x + 700, box.y + 330, { steps: 8 }); await p.mouse.up();
console.log('nach Radieren:', await p.evaluate(() => `${pad.strokes.length} Strich(e), ausgewertet=${studio.evaluated}, markiert=${pad.strokes.some(s => s.marked)}`));
await p.click('#eraseBtn');
// Untergründe
await p.evaluate(() => { document.getElementById('settingsCard').open = true; });
await p.click('#panelToggle'); await p.waitForTimeout(200);
for (const sf of ['weiss', 'kariert', 'pergament', 'tafel', 'schiefer']) {
  await p.selectOption('#surfaceSel', sf); await p.waitForTimeout(150);
  if (sf === 'tafel') { await p.click('#panelToggle'); await p.waitForTimeout(300); const b2 = await p.locator('#padHolder').boundingBox();
    await p.mouse.move(b2.x + pts[0][0], b2.y + pts[0][1]); await p.mouse.down(); for (const [x, y] of pts) await p.mouse.move(b2.x + x, b2.y + y); await p.mouse.up();
    await p.click('#evalBtn'); await p.waitForTimeout(300); await p.click('#panelToggle'); await p.waitForTimeout(300); }
  await p.locator('#padHolder').screenshot({ path: `u_${sf}.png` });
}
console.log('Kreide auf Tafel:', await p.evaluate(() => pad.strokes.map(s => s.color).join(',')));
// Arbeitsblatt mit Karos 5 mm
await p.click('[data-tab=paper]'); await p.selectOption('#wsGrid', '5'); await p.selectOption('#wsBand', '5'); await p.selectOption('#wsGuides', '0');
const ws = await p.evaluate(() => buildWorksheet().toDataURL('image/png')); require('fs').writeFileSync('ws_karo.png', Buffer.from(ws.split(',')[1], 'base64'));
console.log('ERR', errs); await b.close(); })();
