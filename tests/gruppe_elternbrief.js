const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, acceptDownloads: true }); const p = await ctx.newPage();
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept());
await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1200);
// Lerngruppe: 3 Kinder – verbessert, verschlechtert, ohne genug Daten
await p.evaluate(() => {
  const mk = (name, from, to, n) => { const u = defaultUser(name); const now = Date.now();
    for (let i = 0; i < n; i++) { const f = n > 1 ? i / (n - 1) : 0; u.history.unshift({ ts: now - (50 - 50 * f) * 864e5, mode: 'letter', target: 'a', letter: 'a', score: Math.round(from + (to - from) * f), m: { form: Math.round(from + (to - from) * f), base: 70, flu: Math.round(to - 10 + 0 * f) } }); }
    return u; };
  appData.users = [mk('Ali', 50, 80, 24), mk('Ben', 75, 60, 24), mk('Cem', 60, 60, 2)]; appData.activeUserId = appData.users[0].id; saveState(); refreshAll();
});
const g = await p.evaluate(() => { const pages = buildGroupReport('first'); const rows = groupData('first');
  window.__gp = pages.map(c => c.toDataURL('image/png')); return `Seiten ${pages.length} · ` + rows.map(r => `${r.u.name}: ${r.sa ?? '–'}→${r.sb ?? '–'} (${r.d ?? '–'})`).join(', '); });
console.log('Gruppe:', g);
require('fs').writeFileSync('gruppe.png', Buffer.from((await p.evaluate(() => window.__gp[0])).split(',')[1], 'base64'));
// viele Kinder → Folgeseite
console.log('40 Kinder:', await p.evaluate(() => { const base = appData.users[0]; const keep = appData.users; appData.users = Array.from({ length: 40 }, (_, i) => ({ ...base, name: 'Kind ' + (i + 1), id: 'k' + i })); const n = buildGroupReport('first').length; appData.users = keep; return n + ' Seiten'; }));
// Elternbrief: Felder ausfüllen, Vorschau, Word und PDF
await p.click('[data-tab=users]'); await p.waitForTimeout(300);
const inputs = p.locator('#letterFields input');
await inputs.nth(0).fill('Grundschule am Wald, Waldweg 1, 32756 Detmold'); await inputs.nth(1).fill('4b'); await inputs.nth(2).fill('Frau Muster');
await p.waitForTimeout(800);
await p.click('#letterPreviewBtn'); await p.waitForTimeout(600);
console.log('Brief-Vorschau:', await p.evaluate(() => document.querySelectorAll('#letterPreview img').length + ' Seiten'));
const shots = await p.evaluate(() => buildLetterPages().map(c => c.toDataURL('image/png')));
shots.forEach((s, i) => require('fs').writeFileSync(`brief_${i + 1}.png`, Buffer.from(s.split(',')[1], 'base64')));
for (const [btn, file] of [['#letterDocxBtn', 'Elternbrief.docx'], ['#letterPdfBtn', 'Elternbrief.pdf']]) {
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click(btn)]); await dl.saveAs(file); console.log('Download:', dl.suggestedFilename());
}
await p.reload(); await p.waitForTimeout(1200);
console.log('nach Neuladen:', await p.evaluate(() => `${appData.letter.fields.gruppe} / ${appData.letter.text.length > 1000}`));
console.log('ERR', errs); await b.close(); })();
