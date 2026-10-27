// Führt alle Browser-Tests gegen index.html aus.
// Aufruf im Hauptordner:  node tests/alle_tests.js            (alle)
//                         node tests/alle_tests.js kinderansicht (nur Tests, deren Name das Wort enthält)
// Voraussetzung: Node.js und Playwright mit Chromium (npm install, dann npx playwright install chromium).
// Bildschirmfotos landen in tests/ausgabe/ (nicht im Repository).
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML = path.join(ROOT, 'index.html');
const OUT = path.join(__dirname, 'ausgabe');

// Erwartungen: jede Zeile muss in der Ausgabe des Tests vorkommen.
// Zusätzlich gilt für alle Tests: kein Absturz und keine Fehler im Browser („ERR []“ bzw. „ERRORS []“ leer).
const EXPECT = {
  spurhilfe_kinder_speicher: [
    /o mit Spurhilfe: .*Spurhilfe ja .*Stats 0/,
    /nach 3 guten Versuchen aktiv= false/,
    /o im Uhrzeigersinn: .*Rundung im Uhrzeigersinn/,
    /l von unten nach oben: .*Abstrich von unten nach oben/,
    /l von oben nach unten: .*Grundregeln eingehalten/,
    /zurück bei Kind 1: tafel, Spurhilfe auto/,
    /bei Mia: weiss, Spurhilfe off/,
    /nach Neuladen \(Mia aktiv\): Mia: weiss, off/,
    /Speicher voll → Verlauf \d+, gespeichert=true/
  ],
  bewegungsablauf: [
    /e Druckschrift: .*Grundregeln eingehalten/,
    /e Schreibschrift: .*Grundregeln eingehalten/,
    /e rückwärts: .*Rundung im Uhrzeigersinn/,
    /a richtig: .*Grundregeln eingehalten/,
    /d richtig: .*Grundregeln eingehalten/
  ],
  kinderansicht: [
    /Kind, ohne Schwerpunkt: sichtbar: \[[^|\]]+\]/,
    /Schwerpunkte: flu,slant/,
    /Kind, mit Schwerpunkten: sichtbar: \[Flüssigkeit/,
    /Ausführlich: sichtbar: \[Grundlinie \d+ · .*\|/
  ],
  schriftbild_zeile: [
    /normal: Wert (8|9)\d .*size=9\d lines=100 space=100/,
    /flach: Wert [0-6]\d .*size=[0-2]?\d /,
    /zu groß mit Unterlängen: .*lines=[0-6]\d/,
    /ohne Wortlücken: .*space=30/,
    /riesige Lücken: .*space=[0-4]?\d /,
    /Heft 9 mm: .*≈ \d,\d mm/
  ],
  berichte: [/leer: ok/, /Vorschau: true/, /Nachspuren gezählt: false/],
  gruppe_elternbrief: [/Gruppe: Seiten 1 · Ali: \d+→\d+ \(\d+\), Ben: \d+→\d+ \(-\d+\), Cem: –→– \(–\)/, /40 Kinder: 2 Seiten/, /Brief-Vorschau: 2 Seiten/,
    /Download: Elternbrief_SchreibFlow_4b\.docx/, /Download: Elternbrief_SchreibFlow_4b\.pdf/, /nach Neuladen: 4b \/ true/],
  radierer_untergruende: [/nach Radieren: 1 Strich\(e\), ausgewertet=false/],
  begleiter_seite: [/links-H: .*panel-right/, /Linksh\., Leiste links: .*Klassen lefty$/m]
};

const only = process.argv[2];
const tests = fs.readdirSync(__dirname).filter(f => f.endsWith('.js') && f !== 'alle_tests.js')
  .map(f => f.slice(0, -3)).filter(n => !only || n.includes(only)).sort();

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(path.join(__dirname, 'fixtures'))) fs.copyFileSync(path.join(__dirname, 'fixtures', f), path.join(OUT, f));

let failed = 0;
for (const name of tests) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(__dirname, name + '.js'), HTML], { cwd: OUT, encoding: 'utf8', timeout: 300000 });
  const out = (r.stdout || '') + (r.stderr || '');
  const problems = [];
  if (r.status !== 0) problems.push(`beendet mit Code ${r.status}${r.error ? ' (' + r.error.message + ')' : ''}`);
  for (const m of out.matchAll(/ERR(?:ORS)? (\[.*\])/g)) if (m[1] !== '[]') problems.push('Browser-Fehler: ' + m[1].slice(0, 300));
  for (const re of EXPECT[name] || []) if (!re.test(out)) problems.push('erwartet, aber nicht gefunden: ' + re);
  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  if (problems.length) {
    failed++;
    console.log(`✗ ${name} (${sec} s)\n  - ${problems.join('\n  - ')}\n  Ausgabe:\n${out.split('\n').slice(-15).map(l => '    ' + l).join('\n')}`);
  } else console.log(`✓ ${name} (${sec} s)`);
}
console.log(failed ? `\n${failed} von ${tests.length} Tests fehlgeschlagen.` : `\nAlle ${tests.length} Tests bestanden.`);
process.exit(failed ? 1 : 0);
