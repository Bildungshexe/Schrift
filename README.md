# SchreibFlow – Mix-&-Match-Handschrift-Trainer

Übungsprogramm für eine saubere, lesbare und ermüdungsfreie Handschrift auf Tablets mit Stift oder Finger (iPad, Android-Tablet, Windows-Convertible). Kinder, die eine Ausgangsschrift gelernt haben (z. B. VA), entwickeln daraus ihre eigene Mix-&-Match-Schrift: Für jeden Buchstaben wird die Form gewählt – Druckschrift, Grundschrift, VA, LA, SAS oder eine eigene –, alle Formen sind gleichwertig.

## Starten

`index.html` im Browser öffnen. Die App ist eine einzelne Datei, läuft offline und lädt nichts aus dem Internet. Alle Daten bleiben auf dem Gerät.

Tipp für das iPad: Seite in Safari öffnen → „Teilen“ → „Zum Home-Bildschirm“. Dann läuft sie wie eine App, und Safari löscht die gespeicherten Daten nicht nach einigen Tagen.

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

  - Bewegungsablauf: mit selbst vorgeschriebener Vorlage genau (Strichfolge und Richtung), bei den eingebauten Schriften nach Grundregeln (Rundungen gegen den Uhrzeigersinn, Abstriche von oben nach unten, von links nach rechts)

  Die Strenge (mild, normal, streng) ist unter „Nutzer & Daten“ einstellbar.
- **Spurhilfe ehrlich bewertet:** Nachspuren bringt nur wenige Tropfen und zählt nicht für den Fortschritt. In der Einstellung „automatisch“ verschwindet die Spurhilfe nach drei guten Versuchen je Buchstabe.
- **Radierer:** einzelne Striche wegwischen; „Zurück“ nimmt den letzten Strich weg.
- **Untergründe:** Papier (creme), weißes Blatt, kariertes Blatt (Kästchen 4/5/7/10 mm in echter Größe), Pergament, grüne Tafel und Schiefertafel (mit Kreide).
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

## Neue Bilder einbauen

```bash
python3 werkzeuge/freistellen.py gemini_bild.jpg=bilder/begleiter/pet_fuchs_normal.png
python3 werkzeuge/bilder_einbetten.py
```

Hintergründe (`welt_*_hintergrund`) nicht freistellen, sondern als JPEG (ca. 1280 px breit) nach `bilder/welten/` legen. Bilder lassen sich auch ohne Programmierung in der App unter „Meine Welt → Bilder“ laden.

## Lizenzen

Die Schriften Playwrite DE Grund, VA, LA und SAS stehen unter Copyright 2023 The Playwrite Project Authors (https://github.com/TypeTogether/Playwrite) und sind unter der SIL Open Font License 1.1 lizenziert. Sie sind unverändert eingebettet. Die Bilder wurden mit Google Gemini erstellt.
