const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, acceptDownloads: true }); const p = await ctx.newPage();
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1000);
// Übungen mit Stift: hoher Druck -> Pet gequetscht, Pause -> stolpert
const st = await p.evaluate(async () => {
  const ink = document.querySelector('#padHolder .pad-ink'), r = ink.getBoundingClientRect(); const out = {};
  const fire = (type, x, y, pr) => ink.dispatchEvent(new PointerEvent(type, { pointerId: 3, pointerType: 'pen', clientX: x, clientY: y, pressure: pr, bubbles: true, cancelable: true, buttons: 1 }));
  fire('pointerdown', r.left + 100, r.top + 150, 0.95);
  for (let k = 1; k < 15; k++) fire('pointermove', r.left + 100 + k * 6, r.top + 150 + Math.sin(k) * 20, 0.95);
  await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));
  out.squish = document.getElementById('pet').className;
  fire('pointerup', r.left + 190, r.top + 150, 0);
  out.afterUp = document.getElementById('pet').className;
  return out; });
console.log('PET', JSON.stringify(st));
// Pet wählen
await p.click('[data-tab=world]'); await p.waitForTimeout(200);
await p.click('#petChoice button:nth-child(1)'); await p.waitForTimeout(200);
console.log('pet type', await p.evaluate(() => getActiveUser().pet.type));
// Punkte geben, Welt freischalten, Bauteil kaufen
await p.evaluate(() => { addPoints(getActiveUser(), 200); saveState(); renderWorldTab(); });
await p.click('#worldCards button:nth-child(1)'); await p.waitForTimeout(200);
await p.click('#shop button:nth-child(4)'); await p.waitForTimeout(100);
const sb = await p.locator('#scene').boundingBox(); await p.mouse.click(sb.x + sb.width * 0.4, sb.y + sb.height * 0.7); await p.waitForTimeout(200);
await p.click('#shop button:nth-child(1)'); await p.mouse.click(sb.x + sb.width * 0.6, sb.y + sb.height * 0.85); await p.waitForTimeout(200);
console.log('items', await p.evaluate(() => JSON.stringify(getActiveUser().worlds.wald)), 'coins', await p.evaluate(() => getActiveUser().coins));
// Bilder per Sammel-Import
await p.click('#view-world details summary');
await p.setInputFiles('#imgBulk', ['pet_drache_freut.png', 'welt_wald_tanne.png', 'welt_wald_hintergrund.png', 'unbekannt.png']); await p.waitForTimeout(1500);
console.log('imgs', await p.evaluate(() => Object.keys(IMG).join(',')), '| alpha corner', await p.evaluate(() => { const im = IMG.welt_wald_tanne; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return [x.getImageData(2, 2, 1, 1).data[3], x.getImageData(im.width/2|0, im.height/2|0, 1, 1).data[3]].join('/'); }));
await p.screenshot({ path: 'world.png', fullPage: false });
// Baum
await p.evaluate(() => { const u = getActiveUser(); const d1 = Date.now() - 2*864e5, d0 = Date.now();
  const add = (ts, ch, sc) => u.history.unshift({ ts, mode: 'letter', target: ch, letter: ch, score: sc, m: { base: sc, size: sc, slant: sc, flu: sc, pressure: 90 } });
  for (const ch of 'aceimnorsuvbdfhgjAB') add(d1, ch, 80); for (const ch of 'aceimnorsuvbdfhg') add(d0, ch, ch === 'e' ? 55 : 88); for (const ch of 'aeo') add(d0, ch, 90);
  saveState(); });
await p.click('#miniTree'); await p.waitForTimeout(500);
const tb = await p.locator('#treeBig').boundingBox();
const hov = await p.evaluate(() => { const h = treeUi.hits.find(x => x.type === 'leaf' && x.data.ch === 'e'); return h ? [h.x, h.y] : null; });
await p.mouse.move(tb.x + hov[0], tb.y + hov[1]); await p.waitForTimeout(200);
console.log('TIP', await p.textContent('#treeTip'));
await p.screenshot({ path: 'tree.png' });
console.log('SUMMARY', await p.textContent('#treeSummary'));
await p.mouse.click(tb.x + hov[0], tb.y + hov[1]); await p.waitForTimeout(200);
console.log('INFO', await p.textContent('#treeInfo'));
await p.click('#treeInfo button'); await p.waitForTimeout(300);
console.log('studio letter', await p.evaluate(() => studio.letter + ' ' + studio.mode + ' tab=' + activeTab));
// Ast-Training
await p.click('#miniTree'); await p.waitForTimeout(300);
await p.click('#treeGroups button:nth-child(4)'); await p.click('#treeInfo button'); await p.waitForTimeout(300);
console.log('branch', await p.textContent('#recoLabel'), await p.textContent('#recoChips'));
// Sicherung
await p.click('[data-tab=users]'); await p.waitForTimeout(300);
console.log('banner before', await p.evaluate(() => !document.getElementById('backupDot').classList.contains('hidden')));
const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#backupBtn')]);
console.log('download', dl.suggestedFilename()); await p.waitForTimeout(500);
console.log('banner after', await p.evaluate(() => !document.getElementById('backupDot').classList.contains('hidden')));
console.log('snaps', (await p.textContent('#snapList')).slice(0, 160));
// 8 Tage alt -> Banner
await p.evaluate(() => { appData.backup.lastAt = Date.now() - 8 * 864e5; saveState(); });
console.log('banner 8d', await p.evaluate(() => document.getElementById('backupBtn').title));
// Speicherstand laden: Änderung machen und zurücksetzen
await p.evaluate(() => { getActiveUser().name = 'GEÄNDERT'; saveState(); });
await p.click('#loadLastSnapBtn'); await p.waitForTimeout(800);
console.log('name after restore', await p.evaluate(() => getActiveUser().name));
// Passwort
await p.locator('#secPanel input').nth(0).fill('geheim123'); await p.locator('#secPanel input').nth(1).fill('geheim123');
await p.click('#secPanel button'); await p.waitForTimeout(400);
const code = (await p.textContent('#msgCard')).match(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/)[0]; console.log('code', code);
await p.click('#msgCard button'); await p.click('#lockBtn'); await p.waitForTimeout(200);
console.log('locked', await p.evaluate(() => [locked, document.getElementById('app').classList.contains('hidden')].join()));
await p.fill('#lockPw', 'falsch'); await p.click('#lockOk'); console.log('msg', await p.textContent('#lockMsg'));
await p.fill('#lockPw', 'geheim123'); await p.click('#lockOk'); console.log('unlocked', await p.evaluate(() => !locked));
// Neuladen -> gesperrt, Wiederherstellungscode
await p.reload(); await p.waitForTimeout(1000);
console.log('locked on start', await p.evaluate(() => locked));
await p.click('#lockScreen summary'); await p.fill('#lockRec', code.toLowerCase()); await p.click('#lockRecOk');
console.log('after recovery', await p.evaluate(() => [locked, appData.security.enabled].join()));
console.log('ERR', errs); await b.close(); })();
