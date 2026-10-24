const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
await p.click('#panelToggle'); await p.waitForTimeout(400);
const box = await p.locator('#padHolder').boundingBox();
// Pfad in Mittelband-Einheiten (y relativ zur Grundlinie, nach unten positiv) schreiben
async function write(path) {
  const px = await p.evaluate(P => { const r = rowGeom(0), tf = pad.tf; return P.map(([x, y]) => [tf.ox + x * tf.scale, (r.base + y) * tf.scale]); }, path);
  await p.mouse.move(box.x + px[0][0], box.y + px[0][1]); await p.mouse.down();
  for (const [x, y] of px) { await p.mouse.move(box.x + x, box.y + y); await p.waitForTimeout(10); }
  await p.mouse.up();
}
const circle = (cx, cw) => Array.from({ length: 41 }, (_, i) => { const a = -Math.PI / 4 + (cw ? 1 : -1) * i / 40 * 2 * Math.PI; return [cx + 0.42 * Math.cos(a), -0.5 + 0.48 * Math.sin(a)]; });
async function evalOne(letter, path, tag) {
  await p.evaluate(l => { selectLetter(l); pad.clear(); studio.evaluated = false; }, letter);
  await write(path); await p.click('#evalBtn'); await p.waitForTimeout(250);
  console.log(tag, await p.evaluate(() => { const u = getActiveUser(), h = u.history[0], c = [...document.querySelectorAll('#resultPanel .crit')].map(x => x.children[0].textContent + '=' + x.children[2].textContent).filter(t => /Bewegung/.test(t));
    return `Wert ${h.score} · Spurhilfe ${h.g ? 'ja' : 'nein'} · ${c.join(' | ') || 'kein Bewegungs-Kriterium'} · Stats ${u.letterStats[h.letter] ? u.letterStats[h.letter].n : 0}`; }));
}
// 1. Spurhilfe automatisch an
console.log('Spurhilfe:', await p.evaluate(() => `${appData.settings.ghost}, aktiv=${ghostActive()}`));
await evalOne('o', circle(1.5, false), 'o mit Spurhilfe:');
console.log('Info:', await p.evaluate(() => [...document.querySelectorAll('#resultPanel .info li')][0].textContent));
// Spurhilfe ausblenden (3 gute Versuche simuliert)
await p.evaluate(() => { getActiveUser().ghostOk = { o: 3, l: 3, c: 3 }; pad.redrawGuides(); });
console.log('nach 3 guten Versuchen aktiv=', await p.evaluate(() => ghostActive()));
await p.locator('#padHolder').screenshot({ path: 'x_ohne_spur.png' });
// 2. Bewegungsablauf
await evalOne('o', circle(1.5, false), 'o gegen Uhrzeigersinn:');
await evalOne('o', circle(1.5, true), 'o im Uhrzeigersinn:');
await evalOne('l', Array.from({ length: 30 }, (_, i) => [1.5, 0 - i / 29 * 2]), 'l von unten nach oben:');
await evalOne('l', Array.from({ length: 30 }, (_, i) => [1.5, -2 + i / 29 * 2]), 'l von oben nach unten:');
await evalOne('c', Array.from({ length: 30 }, (_, i) => { const a = -Math.PI / 4 - i / 29 * 1.5 * Math.PI; return [1.5 + 0.42 * Math.cos(a), -0.5 + 0.48 * Math.sin(a)]; }), 'c richtig:');
// 3. Einstellungen pro Kind
await p.evaluate(() => { appData.settings.surface = 'tafel'; saveState(); });
await p.click('[data-tab=users]'); await p.fill('#newUserName', 'Mia'); await p.click('#createUserBtn'); await p.waitForTimeout(200);
const mia = await p.evaluate(() => appData.users.find(u => u.name === 'Mia').id);
await p.evaluate(id => switchUser(id), mia); await p.waitForTimeout(200);
await p.evaluate(() => { appData.settings.surface = 'weiss'; appData.settings.ghost = 'off'; saveState(); });
const first = await p.evaluate(() => appData.users[0].id);
await p.evaluate(id => switchUser(id), first); await p.waitForTimeout(200);
console.log('zurück bei Kind 1:', await p.evaluate(() => `${appData.settings.surface}, Spurhilfe ${appData.settings.ghost}, Auswahl ${document.getElementById('surfaceSel').value}`));
await p.evaluate(id => switchUser(id), mia); await p.waitForTimeout(200);
console.log('bei Mia:', await p.evaluate(() => `${appData.settings.surface}, Spurhilfe ${appData.settings.ghost}, Auswahl ${document.getElementById('ghostSel').value}`));
await p.reload(); await p.waitForTimeout(1500);
console.log('nach Neuladen (Mia aktiv):', await p.evaluate(() => `${getActiveUser().name}: ${appData.settings.surface}, ${appData.settings.ghost}`));
// 4. Speicher voll → Verlauf kürzen
console.log(await p.evaluate(() => {
  const u = getActiveUser(); for (let i = 0; i < 400; i++) u.history.push({ ts: Date.now() - i * 1000, mode: 'letter', target: 'e', letter: 'e', score: 60, m: { a: 1 } });
  const orig = Storage.prototype.setItem; const lim = JSON.stringify(appData).length - 20000;
  Storage.prototype.setItem = function (k, v) { if (v.length > lim) throw new DOMException('voll', 'QuotaExceededError'); return orig.call(this, k, v); };
  saveState(); Storage.prototype.setItem = orig;
  return `Speicher voll → Verlauf ${u.history.length}, gespeichert=${storageOk}`; }));
await p.click('[data-tab=users]'); await p.waitForTimeout(200);
console.log('Anzeige:', await p.evaluate(() => document.getElementById('storageInfo').textContent));
console.log('ERR', errs); await b.close(); })();
