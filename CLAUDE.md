# Portfolio DaProd

Sito portfolio di Cammo / DaProd, pubblicato su GitHub Pages: https://cammo22.github.io/Portfolio/

## Pubblicazione

- **Si pubblica sempre su `main`, e lo fa Claude.** Le modifiche vanno portate su `main`
  (unendo la PR appena aperta, oppure con push diretto) senza chiedere conferma.
- Ogni push su `main` fa partire `.github/workflows/static.yml`, che pubblica il sito su Pages.
  Dopo il merge controlla che il workflow finisca con successo.
- Il README è la pagina GitHub di DaProd: tienilo allineato al sito (progetti, Sala Slot, link).

## Struttura

- `index.html`, `css/style.css`, `js/app.js`: HTML, CSS e JS scritti a mano, niente build
- `img/progetti/`, `img/giochi/`, `img/siti/`: screenshot di programmi, Sala Slot e siti fatti per altri (WebP).
  Si fanno in Chromium dagli script `test/foto.mjs` di ogni repo, o aprendo la demo (DaProdFinanza: build
  `vite.android.config.ts`, accesso consulente `cammo / 1234`; DaProd Suite: `apps/shell/scripts/banco-console.mjs`)
- `img/readme/`: banner e screenshot usati nel README
- `img/babbasone.svg`: l'avatar di Babbasone per il suo tesserino
- `video.txt`: video YouTube della sezione Musica (un link per riga)

## Contenuti

- La pagina è ordinata per **divisioni** di DaProd Produzioni: Software, Giochi (Sala Slot), Web, Musica, 3D, Operazioni.
  In cima ci sono i tesserini di **Cammo** (l'umano) e **Babbasone** (l'assistente digitale).
- Ogni repo selezionata ha la sua scheda con galleria di screenshot: quando esce una versione nuova, si rifanno le foto.

## Stile

- Base tech scura (pioggia Matrix, scanline, font mono Space Mono, verde `#00ff41` + ciano `#3ddbff`)
  con dettagli lucidi Y2K / Frutiger Aero (vetro scuro, bottoni aqua, icone lucide, bolle).
  Non andare troppo sul Frutiger chiaro, né sul tono aziendale.
- Testi in italiano, in prima persona, diretti.
