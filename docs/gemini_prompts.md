# Gemini-Prompts für SchreibFlow

Bilder für den Begleiter (3 Tiere × 6 Zustände), die 6 Welten (je 1 Hintergrund + 8 Bauteile) und den Schreibbaum. Insgesamt 79 Bilder.

## So gehst du vor

1. **Eine Welt bzw. ein Tier pro Gemini-Chat.** Gemini hält Stil und Figur innerhalb eines Chats besser durch. Erzeuge zuerst das *Referenzbild*, danach die weiteren Bilder mit „im gleichen Stil wie das erste Bild“.
2. **Den Stil-Baustein** unten an jeden Prompt anhängen (oder einmal am Anfang des Chats schicken: „Halte dich bei allen folgenden Bildern an diesen Stil: …“).
3. **Bild speichern und exakt so benennen**, wie es bei *Dateiname* steht (z. B. `pet_drache_freut.png`).
4. In SchreibFlow: **Meine Welt → Bilder → „Mehrere Bilder laden“** und alle Dateien auf einmal auswählen. Die App ordnet sie über den Dateinamen zu und entfernt bei Figuren und Bauteilen den weißen Hintergrund automatisch.
5. Prüfe jedes Bild: kein Text, keine Buchstaben, keine Wasserzeichen. Gemini hält sich nicht immer an das Seitenverhältnis – dann einfach neu erzeugen lassen.

Hinweis: Bitte die Nutzungsbedingungen von Google für erzeugte Bilder beachten.

---

## Stil-Baustein (immer anhängen)

> Stil: freundliche Kinderbuch-Illustration für Grundschulkinder, weiche Aquarell- und Buntstift-Optik, warme helle Farben, klare runde Formen, sanfte Konturen, fröhlich und ruhig, nicht gruselig. Keine Schrift, keine Buchstaben, keine Zahlen, kein Text, kein Wasserzeichen, kein Rahmen.

## Zusatz für Figuren und Bauteile (Sprites)

> Ein einzelnes Objekt, vollständig sichtbar, mittig, füllt etwa 80 % des Bildes. Reinweißer, einfarbiger Hintergrund (#FFFFFF) ohne Boden, ohne Schatten, ohne Verlauf. Quadratisches Format 1:1.

## Zusatz für Hintergründe

> Breitformat 16:9. Leere Landschaft ohne Figuren, ohne Tiere, ohne Gebäude im Vordergrund. Die untere Bildhälfte ist eine freie, ebene Fläche, auf die später Dinge gestellt werden. Ruhige Farben, damit Objekte davor gut sichtbar sind.

---

## 1. Begleiter (18 Bilder)

Für jedes Tier zuerst das Referenzbild (`normal`), dann die fünf weiteren Zustände im selben Chat.

### Figurenbeschreibungen

- **Drache:** ein kleiner, runder Babydrache, mintgrün mit hellgelbem Bauch, kleine Flügelchen, kurze Hörnchen, große freundliche Augen, kurzer Schwanz mit herzförmiger Spitze.
- **Eule:** eine kleine, runde Eule, hellbraun und cremefarben, große runde Augen, kleine Federohren, kurze Flügel, kleine orange Füße.
- **Fuchs:** ein kleiner, junger Fuchs, orange mit weißer Brust und weißer Schwanzspitze, großer buschiger Schwanz, blaues Halstuch, freundliches Gesicht.

### Prompt-Vorlage

> Zeichne [FIGURENBESCHREIBUNG] als Ganzkörperfigur, [ZUSTAND]. + Stil-Baustein + Zusatz für Figuren

| Zustand | Text für [ZUSTAND] | Dateinamen |
|---|---|---|
| normal | sitzt aufrecht, lächelt freundlich und schaut den Betrachter an, als würde sie geduldig warten | `pet_drache_normal.png`, `pet_eule_normal.png`, `pet_fuchs_normal.png` |
| freut sich | springt fröhlich in die Luft, beide Arme bzw. Flügel nach oben, strahlendes Lachen | `pet_drache_freut.png`, `pet_eule_freut.png`, `pet_fuchs_freut.png` |
| zusammengequetscht | ist komisch flach zusammengedrückt, als würde von oben auf sie gedrückt, breit und platt wie ein Pfannkuchen, Augen zusammengekniffen, leicht empörter, aber lustiger Gesichtsausdruck, nicht verletzt | `pet_drache_gequetscht.png`, `pet_eule_gequetscht.png`, `pet_fuchs_gequetscht.png` |
| stolpert | stolpert nach vorne, ein Fuß hakt, Arme bzw. Flügel rudern, überraschter Gesichtsausdruck, kurz vor dem Hinfallen, komisch und harmlos | `pet_drache_stolpert.png`, `pet_eule_stolpert.png`, `pet_fuchs_stolpert.png` |
| schläft | liegt zusammengerollt, Augen geschlossen, entspannt und zufrieden, ohne „Zzz“ oder andere Zeichen | `pet_drache_schlaeft.png`, `pet_eule_schlaeft.png`, `pet_fuchs_schlaeft.png` |
| jubelt | hält stolz einen kleinen goldenen Pokal hoch, um sie herum etwas buntes Konfetti, sehr glücklich | `pet_drache_jubelt.png`, `pet_eule_jubelt.png`, `pet_fuchs_jubelt.png` |

Folge-Prompt im selben Chat, z. B.:
> Dieselbe Figur wie im ersten Bild, gleicher Stil und gleiche Farben, jetzt: [ZUSTAND]. Reinweißer Hintergrund, quadratisch, kein Text.

---

## 2. Welten (54 Bilder)

Pro Welt einen Chat. Zuerst den Hintergrund, dann die 8 Bauteile mit dem Zusatz „im gleichen Stil wie der Hintergrund“.

**Vorlage Hintergrund:**
> Zeichne einen Hintergrund für eine Kinder-Bauwelt: [WELT]. + Stil-Baustein + Zusatz für Hintergründe

**Vorlage Bauteil:**
> Zeichne [BAUTEIL] für die Bauwelt „[WELTNAME]“, leicht von schräg oben gesehen, im gleichen Stil wie der Hintergrund. + Stil-Baustein + Zusatz für Figuren und Bauteile

### Zauberwald
- Hintergrund `welt_wald_hintergrund.png`: eine helle Waldlichtung mit weichem Moosboden, im Hintergrund zarte Bäume und Lichtstrahlen, ein Hauch Magie mit kleinen Glitzerpunkten
- `welt_wald_blume.png` – eine einzelne große Wildblume mit rosa Blüten
- `welt_wald_pilz.png` – ein roter Fliegenpilz mit weißen Punkten
- `welt_wald_busch.png` – ein runder, grüner Busch mit ein paar Beeren
- `welt_wald_tanne.png` – eine einzelne, kleine Tanne
- `welt_wald_igel.png` – ein freundlicher Igel
- `welt_wald_reh.png` – ein junges Reh, stehend
- `welt_wald_huette.png` – eine gemütliche kleine Holzhütte mit Moosdach
- `welt_wald_brunnen.png` – ein steinerner Zauberbrunnen mit glitzerndem Wasser

### Stadt
- Hintergrund `welt_stadt_hintergrund.png`: ein freundlicher, leerer Stadtplatz mit hellem Pflaster, im Hintergrund ein blauer Himmel und eine ferne, sanfte Stadtsilhouette
- `welt_stadt_laterne.png` – eine altmodische Straßenlaterne
- `welt_stadt_baum.png` – ein runder Stadtbaum in einem kleinen Beet
- `welt_stadt_bank.png` – eine hölzerne Parkbank
- `welt_stadt_auto.png` – ein kleines, rundes, buntes Auto
- `welt_stadt_haus.png` – ein schmales, buntes Wohnhaus mit Fenstern und Tür
- `welt_stadt_laden.png` – ein kleiner Laden mit gestreifter Markise, ohne Schrift
- `welt_stadt_schule.png` – ein freundliches Schulgebäude mit Glockentürmchen, ohne Schrift
- `welt_stadt_hochhaus.png` – ein fröhliches, buntes Hochhaus

### Bauernhof
- Hintergrund `welt_hof_hintergrund.png`: sanfte grüne Wiesen und Felder unter blauem Himmel, im Hintergrund Hügel, vorne eine freie Wiese
- `welt_hof_weizen.png` – ein kleines Büschel goldener Weizenähren
- `welt_hof_huhn.png` – ein Huhn
- `welt_hof_schaf.png` – ein flauschiges Schaf
- `welt_hof_schwein.png` – ein rosa Schwein
- `welt_hof_kuh.png` – eine gefleckte Kuh
- `welt_hof_pferd.png` – ein braunes Pferd
- `welt_hof_traktor.png` – ein kleiner roter Traktor
- `welt_hof_hofhaus.png` – ein gemütliches Bauernhaus mit roter Scheune daneben

### Unterwasserwelt
- Hintergrund `welt_meer_hintergrund.png`: eine helle Unterwasserlandschaft, oben türkisblaues Wasser mit Lichtstrahlen, unten heller Sandboden
- `welt_meer_muschel.png` – eine schöne Muschel
- `welt_meer_koralle.png` – eine bunte Koralle
- `welt_meer_fisch.png` – ein bunter Fisch
- `welt_meer_krabbe.png` – eine freundliche rote Krabbe
- `welt_meer_krake.png` – ein kleiner, lustiger Krake
- `welt_meer_schildkroete.png` – eine Meeresschildkröte
- `welt_meer_delfin.png` – ein springender Delfin
- `welt_meer_wal.png` – ein freundlicher blauer Wal

### Weltraum
- Hintergrund `welt_all_hintergrund.png`: ein freundlicher, dunkelblauer Sternenhimmel mit zarten Nebeln in Violett und Blau, nicht bedrohlich, unten eine helle Mondoberfläche mit kleinen Kratern
- `welt_all_stern.png` – ein leuchtender, goldener Stern
- `welt_all_komet.png` – ein kleiner Komet mit Schweif
- `welt_all_mond.png` – eine lächelnde Mondsichel
- `welt_all_satellit.png` – ein kleiner Satellit mit Solarflügeln
- `welt_all_planet.png` – ein bunter Planet mit Ring
- `welt_all_alien.png` – ein freundlicher, kleiner grüner Außerirdischer
- `welt_all_ufo.png` – ein rundes, freundliches Ufo
- `welt_all_rakete.png` – eine rot-weiße Rakete

### Ritterburg
- Hintergrund `welt_burg_hintergrund.png`: eine sonnige, grüne Hügellandschaft mit Weg, im Hintergrund ferne Berge und weiße Wolken, vorne freie Wiese
- `welt_burg_fahne.png` – eine wehende Fahne an einem Mast, ohne Wappen mit Schrift
- `welt_burg_fackel.png` – eine Fackel in einer Wandhalterung
- `welt_burg_ritterpferd.png` – ein Pferd mit bunter Schabracke
- `welt_burg_zauberer.png` – ein freundlicher, alter Zauberer mit Sternenhut
- `welt_burg_prinzessin.png` – eine fröhliche Prinzessin oder ein Prinz in Abenteuerkleidung
- `welt_burg_drache.png` – ein freundlicher, großer roter Drache, sitzend
- `welt_burg_turm.png` – ein runder Burgturm
- `welt_burg_burg.png` – eine kleine, fröhliche Ritterburg

---

## 3. Schreibbaum (7 Bilder)

Die App zeichnet den Baum selbst: Wurzeln, Stamm, Äste und die Position jedes Blattes ergeben sich aus den Übungsdaten. Die Bilder geben ihm Rinde, Blätter, Blüten und eine Landschaft. Alle Baum-Bilder in **einem** Chat erzeugen.

**Hintergrund** `baum_hintergrund.png`
> Zeichne eine ruhige Landschaft als Hintergrund für einen einzelnen Baum: hellblauer Himmel mit wenigen Wolken, eine sanfte grüne Wiese, die genau bei 80 % der Bildhöhe beginnt (gerade Horizontlinie), darunter etwas brauner Erdboden im Querschnitt. In der Bildmitte ist kein Baum und kein Objekt – die Mitte bleibt frei. Breitformat 16:9. + Stil-Baustein

**Rinde** `baum_rinde.png`
> Zeichne eine nahtlos kachelbare Rindenstruktur eines Laubbaums, warmes mittleres Braun, gleichmäßig über das ganze Bild verteilt, ohne Licht- und Schattenverlauf, ohne Ränder, quadratisch 1:1, flache Draufsicht. + Stil-Baustein

**Blätter** – alle mit diesem Zusatz:
> Ein einzelnes Blatt eines Laubbaums, waagerecht liegend, Stiel links, Spitze zeigt nach rechts, von oben gesehen. Reinweißer Hintergrund (#FFFFFF), ohne Schatten, quadratisch 1:1. + Stil-Baustein

| Dateiname | Bedeutung in der App | Beschreibung im Prompt |
|---|---|---|
| `baum_blatt_knospe.png` | Buchstabe noch nicht geübt | statt eines Blattes eine kleine, geschlossene, hellgrüne Knospe |
| `baum_blatt_welk.png` | Ø unter 45 | ein trockenes, braunes, leicht eingerolltes Blatt |
| `baum_blatt_gelb.png` | Ø 45–64 | ein gelbgrünes Blatt mit ersten gelben Stellen |
| `baum_blatt_gruen.png` | Ø 65–84 | ein gesundes, kräftig grünes Blatt |
| `baum_blatt_bluete.png` | Ø ab 85 | statt des Blattes eine einzelne rosa Blüte mit fünf Blütenblättern und gelber Mitte, von oben gesehen |

---

## Kurzliste aller Dateinamen

Begleiter: `pet_{drache|eule|fuchs}_{normal|freut|gequetscht|stolpert|schlaeft|jubelt}.png`
Welten: `welt_{wald|stadt|hof|meer|all|burg}_hintergrund.png` und die 8 Bauteile je Welt (siehe oben)
Baum: `baum_hintergrund.png`, `baum_rinde.png`, `baum_blatt_{knospe|welk|gelb|gruen|bluete}.png`

Die vollständige Liste mit allen 79 Plätzen siehst du auch in der App unter **Meine Welt → Bilder**.
