# SchreibFlow – Mix-&-Match-Handschrift-Trainer

Übungsprogramm für eine saubere, lesbare und ermüdungsfreie Handschrift auf Tablets mit Stift oder Finger (iPad, Android-Tablet, Windows-Convertible). Kinder, die eine Ausgangsschrift gelernt haben (z. B. VA), entwickeln daraus ihre eigene Mix-&-Match-Schrift: Für jeden Buchstaben wird die Form gewählt – Druckschrift, Grundschrift, VA, LA, SAS oder eine eigene –, alle Formen sind gleichwertig.

## Starten

Die App ist eine einzelne Datei (`index.html`). Sie lädt nichts aus dem Internet nach, und alle Übungsdaten bleiben auf dem Gerät.

### Empfohlen: über GitHub Pages (für iPads)

1. Auf GitHub im Repository **Settings → Pages** öffnen.
2. Unter „Build and deployment“ bei **Source** „Deploy from a branch“ wählen, dann Branch **main** und Ordner **/ (root)** → **Save**.
3. Nach ein bis zwei Minuten läuft die App unter **https://bildungshexe.github.io/Schrift/**.
4. Auf dem iPad diese Adresse in Safari öffnen → „Teilen“ → „Zum Home-Bildschirm“. Danach startet sie wie eine App und funktioniert auch ohne Internet weiter, solange Safari die Seite im Speicher hat.

Wichtig:
- Immer **dieselbe Adresse** verwenden. Jede Adresse hat ihren eigenen Speicher; unter einer anderen Adresse sieht man die bisherigen Daten nicht.
- Die Seite selbst ist öffentlich, die Übungsdaten nicht: Sie liegen nur im Browser des jeweiligen Geräts.
- Bei einem privaten Repository braucht GitHub Pages ein kostenpflichtiges GitHub-Konto (Pro, Team oder Enterprise).

### Ohne Internet-Adresse

`index.html` am Computer im Browser öffnen (Doppelklick). Auf dem iPad funktioniert das Öffnen aus der Dateien-App meist nicht zuverlässig, dort GitHub Pages nutzen.

## Funktionen

- **Schreib-Studio:** Buchstaben, Wörter und Verbindungen sowie freies Schreiben mit Ausdauer-Test, Lineatur, Spurhilfe und Vorlage mit „Bewegung zeigen“.
- **Lineatur wählbar:** alle vier Linien, Grund-/Mittel-/Oberlinie, Grund-/Mittellinie oder nur Grundlinie. Der Heft-Modus bietet kleine Schrift mit echtem Zeilenabstand (3,5–12 mm, nach einmaliger Bildschirm-Vermessung mit dem Lineal). Die Leiste mit den Einstellungen gleitet auf Knopfdruck zur Seite hinaus, damit das Schreibfeld die ganze Breite nutzt. Sie sitzt nach Schreibhand links (Rechtshänder) oder rechts (Linkshänder) oder fest auf einer gewählten Seite.
- **Auswertung durch Bildvergleich mit der Vorlage:**
  - Form, Größe und Lage im Liniensystem
  - Ober- und Unterlängen
  - Proportionen im Buchstaben und zwischen den Buchstaben
  - Zittern, gerade Abstriche
  - Schlaufen und Bögen
  - Grundlinie, Neigung, Flüssigkeit
  - Schreibtempo (Auf- und Abbewegungen pro Sekunde, Zielbereich einstellbar) und Rhythmus (Gleichmaß der Bewegungen)
  - Druck und Druckschwankung (nur mit Stift mit Drucksensor)

  Nach der Auswertung färbt sich die Schrift: Rot zeigt Abweichungen von der Vorlage, zu viel Druck, Verlassen der Linie oder Zittern; Grün bzw. Weiß auf der Tafel heißt „in Ordnung“.

  - Schriftbild auf der Zeile: Mittelband im Verhältnis zur Zeilenhöhe (auch bei sehr flacher oder sehr großer Schrift, im Heft-Modus in Millimetern), Platz zwischen den Zeilen (stoßen Ober- und Unterlängen an die Nachbarzeile?) und beim freien Schreiben die Wortabstände
  - Bewegungsablauf: mit selbst vorgeschriebener Vorlage genau (Strichfolge und Richtung), bei den eingebauten Schriften nach Grundregeln (Rundungen gegen den Uhrzeigersinn, Abstriche von oben nach unten, von links nach rechts)

  Die Strenge (mild, normal, streng) ist unter „Nutzer & Daten“ einstellbar.
- **Einfache Auswertung für Kinder:** Gesamtwert, Vergleichsbild und höchstens zwei Schwerpunkte; alle Werte lassen sich für Erwachsene aufklappen. Die Lehrkraft wählt unter „Daten“ pro Kind bis zu zwei Schwerpunkte (z. B. Grundlinie und Flüssigkeit) oder schaltet die ausführliche Ansicht ein.
- **Spurhilfe ehrlich bewertet:** Nachspuren bringt nur wenige Tropfen und zählt nicht für den Fortschritt. In der Einstellung „automatisch“ verschwindet die Spurhilfe nach drei guten Versuchen je Buchstabe.
- **Radierer:** einzelne Striche wegwischen; „Zurück“ nimmt den letzten Strich weg.
- **Untergründe:** Papier (creme), weißes Blatt, kariertes Blatt (Kästchen 4/5/7/10 mm in echter Größe), Pergament, grüne Tafel und Schiefertafel (mit Kreide).
- **Berichte zum Ausdrucken** (unter „Fortschritt“, A4):
  - *Förderbericht:* Gesamtwert, alle Bereiche als Balken, die drei wichtigsten Übungsfelder mit Übungstipps, Buchstaben mit Übungsbedarf, Platz für Bemerkungen.
  - *Elternbericht:* Entwicklung vorher → jetzt (erste/letzte Übungen oder die letzten 4 Wochen mit den 4 Wochen davor), Verlauf als Diagramm, Bereiche mit ▲/●/▼, Schriftproben erster und letzter Versuch, Tipps für zu Hause, Unterschriftszeilen.
  - Gewertet werden nur echte Schreibversuche; Nachspuren mit Spurhilfe zählt nicht.
  - *Lerngruppe (für die Unterlagen der Lehrkraft):* Anzahl der Kinder, Entwicklung jedes Kindes (vorher, jetzt, Δ), Entwicklung der ganzen Gruppe, Anteile verbessert/gleich/verschlechtert, Schwerpunkte für den Unterricht; mehrseitig bei großen Gruppen, auch als PDF.
- **Elternbrief zu Datenschutz und Einwilligung** (unter „Daten“): Ziel der Maßnahme, erhobene Daten und Zweck, Offline-Betrieb, Speicherdauer, Freiwilligkeit und Rechte, Einwilligungserklärung mit Unterschrift. Felder (Schule, Lerngruppe, Lehrkraft …) und der ganze Text lassen sich in der App ändern; Ausgabe als Ausdruck, Word (.docx) und PDF. Eine leere Vorlage liegt in `docs/`. Vor dem Versand bitte von der/dem Datenschutzbeauftragten der Schule prüfen lassen.
- **Meine Schrift:** Form je Buchstabe wählen, eigene Formen und Klassen-Vorlagen vorschreiben.
- **Begleiter:** Drache, Eule oder Fuchs reagieren beim Schreiben und nach der Auswertung. Er sitzt auf der Seite, die die Schreibhand nicht verdeckt: bei Rechtshändern links, bei Linkshändern rechts.
- **Welten und Abzeichen:** Mit Tropfen sechs Welten aufbauen.
- **Schreibbaum:** Wurzeln stehen für die Grundlagen, der Stamm für das Liniengefühl, die Äste für Buchstabengruppen und die Blätter für einzelne Buchstaben.
- **Papier:** A4-Arbeitsblätter drucken (auch kariert oder ohne Linien), Foto entzerren und selbst einschätzen.
- **Daten:** Sicherung mit Erinnerung nach 7 Tagen, Speicherstände und optionaler Passwortschutz. Einstellungen wie Lineatur, Untergrund und Spurhilfe gelten pro Kind. Unter „Daten“ steht, wie voll der Speicher ist. Ist er voll, wird der ältere Übungsverlauf gekürzt; Statistik, Proben und Welten bleiben erhalten.

## Ordner

| Ordner | Inhalt |
|---|---|
| `index.html` | die App (Bilder und Schriften eingebettet) |
| `docs/gemini_prompts.md` | Prompts für alle 79 Bilder (Begleiter, Welten, Baum) |
| `bilder/begleiter`, `bilder/welten` | freigestellte Originalbilder; Dateiname = Bild-Platz in der App |
| `bilder/alternativen` | nicht verwendete Varianten |
| `werkzeuge/` | Skripte zum Freistellen und Einbetten neuer Bilder |
| `tests/` | automatische Browser-Tests (siehe unten) |

## Neue Bilder einbauen

```bash
python3 werkzeuge/freistellen.py gemini_bild.jpg=bilder/begleiter/pet_fuchs_normal.png
python3 werkzeuge/bilder_einbetten.py
```

Hintergründe (`welt_*_hintergrund`) nicht freistellen, sondern als JPEG (ca. 1280 px breit) nach `bilder/welten/` legen. Bilder lassen sich auch ohne Programmierung in der App unter „Meine Welt → Bilder“ laden.

## Tests

Nach jeder Änderung prüfen 23 automatische Tests die App im Browser: Auswertung, Schriftbild auf der Zeile, Bewegungsablauf, Spurhilfe, Kinderansicht, Einstellungen pro Kind, Speicher, Radierer, Untergründe, Heft-Modus, Begleiter, Welten und Baum. Bei jedem Hochladen auf GitHub laufen sie automatisch (Reiter **Actions**; ein grüner Haken heißt bestanden).

Selbst ausführen (Node.js nötig):

```bash
npm install
npx playwright install chromium
npm test                                # alle Tests
node tests/alle_tests.js kinderansicht  # nur ein Test
```

Bildschirmfotos der Tests landen in `tests/ausgabe/`.

## Lizenzen

Die Schriften Playwrite DE Grund, VA, LA und SAS stehen unter Copyright 2023 The Playwrite Project Authors (https://github.com/TypeTogether/Playwrite) und sind unter der SIL Open Font License 1.1 lizenziert. Sie sind unverändert eingebettet. Die Bilder wurden mit Google Gemini erstellt.
