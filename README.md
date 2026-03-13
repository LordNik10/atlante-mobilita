# Pisa in movimento (P.In.Mov.)

Una piattaforma digitale che permette ai cittadini di **segnalare ostacoli o barriere architettoniche** e di **consultare una mappa interattiva** con tutte le segnalazioni.
L’obiettivo è favorire una mobilità più inclusiva e sostenibile nella città di Pisa. 🌍

🔗 **Demo online**: [https://pinmov.vercel.app/](https://pinmov.vercel.app/)

---

## ✨ Funzionalità principali

- **Landing page**: una pagina introduttiva che spiega lo scopo della piattaforma.
- **Mappa interattiva**: accessibile a tutti, anche senza login, per consultare le segnalazioni già inserite.
- **Segnalazioni con login Google**: per inserire un ostacolo o una barriera architettonica è necessario autenticarsi.
- **Accessibilità per tutti**: la consultazione è pubblica, così ogni cittadino può trarre beneficio dalle informazioni condivise.

---

## 🛠️ Tecnologie utilizzate

- [Next.js](https://nextjs.org/) — framework React per lo sviluppo web.
- [shadcn/ui](https://ui.shadcn.com/) — componenti UI moderni e accessibili.
- [Supabase](https://supabase.com/) — backend as a service per autenticazione e database.

---

## 🚀 Obiettivi futuri

- Implementazione di un **sistema di crediti verdi**: gli utenti guadagneranno punti facendo segnalazioni e potranno poi spenderli o donarli ad altri utenti, creando un circolo virtuoso di collaborazione.

---

## 🧪 Test end-to-end (Playwright)

I test end-to-end sono realizzati con [Playwright](https://playwright.dev/) e coprono flussi critici dell’applicazione: login, mappa, filtri, marker/hub e creazione segnalazioni.

### Struttura delle cartelle

```
├── e2e/
│   ├── .auth/              # Storage state salvato dal global setup (gitignore, non versionato)
│   │   └── user.json       # Sessione autenticata (cookie, localStorage)
│   ├── global-setup.ts     # Esegue il login una volta e salva lo storage state (non è un test)
│   ├── features/           # Page Object / feature (selettori e azioni riutilizzabili)
│   │   ├── index.ts        # getFeatures(page) → LoginFeature, MapFeature
│   │   ├── login.feature.ts
│   │   └── map.feature.ts
│   ├── utils/
│   │   └── index.ts        # createStepCounter() per step numerati nei report
│   └── tests/
│       ├── login/
│       │   └── T01.spec.ts
│       ├── filters/
│       │   ├── T02/        # T02.spec.ts, T02Operations.ts, T02Checks.ts
│       │   ├── T03/
│       │   └── T04/
│       └── markers/
│           ├── T05/        # Selezione marker hub
│           ├── T06/        # Creazione report (con cleanup afterEach)
│           └── T07/        # Utente non loggato → redirect login
├── fixtures.ts             # Fixtures Playwright: authPage, notAuthPage, BASE_URL
└── playwright.config.ts   # Configurazione Playwright (globalSetup, storageState)
```

### Organizzazione dei test

- **Features** (`e2e/features/`): classi tipo Page Object che espongono getter per elementi (es. `data-testid`, ruoli) e metodi riutilizzabili (es. `LoginFeature.login(email, password)`). Ogni spec ottiene le feature tramite `getFeatures(page)`.
- **Operations e Checks**: per ogni scenario (T02, T03, …) ci sono due classi nello stesso folder del `.spec.ts`:
  - **`TxxOperations.ts`**: esegue le azioni (click, fill, navigazione).
  - **`TxxChecks.ts`**: contiene le asserzioni (`expect`).  
  In questo modo azioni e verifiche restano separate e i test sono più leggibili.
- **Spec** (`*.spec.ts`): orchestrano gli step usando `test.step(stepCounter("Descrizione"), async () => { operations.stepN(); await checks.stepN(); })`, così nei report ogni step è numerato e descritto.
- **Fixtures** (`fixtures.ts`):
  - **`authPage`**: pagina già autenticata. Il progetto carica lo **storage state** da `e2e/.auth/user.json` (creato dal global setup); la fixture fa solo `page.goto(BASE_URL)` per caricare l’app. Nessun login ripetuto in ogni test.
  - **`notAuthPage`**: contesto nuovo con `storageState: undefined` (per non ereditare lo stato del progetto), poi `goto(BASE_URL)`. Usata per test che verificano il redirect al login (es. T07).
  - **`BASE_URL`**: usata da webServer in locale e da chiamate API (es. cleanup report in T06).

I test che richiedono login usano `authPage`; quelli che devono verificare il comportamento senza login usano `notAuthPage`.

### Scenari coperti (T01–T07)

| Test | Descrizione |
|------|-------------|
| **T01** | Login: dopo login viene mostrato il pulsante mappa. |
| **T02** | Filtri: apertura pannello filtri dalla mappa. |
| **T03** | Filtri: selezione card hub dal pannello filtri. |
| **T04** | Filtri: selezione priorità “Alta” e verifica report filtrati. |
| **T05** | Marker: click su marker hub e verifica titolo/servizi. |
| **T06** | Creazione report: navigazione, click sulla mappa, compilazione modale, verifica creazione; cleanup della segnalazione in `afterEach` tramite API. |
| **T07** | Utente non loggato: click sulla mappa per creare report → redirect alla pagina di login. |

### Configurazione e variabili d’ambiente

- **`playwright.config.ts`**: `testDir: './e2e'`, timeout 60s, esecuzione parallela, in CI: 1 worker, 2 retry, reporter HTML + GitHub. Trace salvata al primo retry. Caricamento variabili da `.env` tramite `dotenv`.
- **Global setup** (`e2e/global-setup.ts`): eseguito **una volta** prima di tutti i test. Effettua il login con `E2E_EMAIL` / `E2E_PASSWORD`, salva la sessione in `e2e/.auth/user.json` e termina. Non è un test, quindi **non compare nel report HTML** (nessuna traccia delle credenziali nei report). Il progetto `chromium` usa `storageState` puntando a questo file, così i test partono già autenticati senza rifare il login.
- **Web server**: se non è impostato un `BASE_URL` esterno (es. in CI con URL di preview), viene avviato in automatico `yarn build && yarn start` su `http://localhost:3000`.
- **Variabili richieste** (locale e CI): `E2E_EMAIL`, `E2E_PASSWORD` (usate dal global setup per generare lo storage state). Opzionali/CI: `BASE_URL`, `NEXT_DATABASE_URL`, `NEXT_SUPABASE_*`, `NEXT_PUBLIC_REDIRECT_URL`.

### Esecuzione in locale

```bash
yarn          # dipendenze
yarn test     # esegue tutti i test Playwright
yarn test:ui  # apre la UI di Playwright per eseguire e debuggare i test
```

Per i test in locale è necessario un file `.env` (o variabili d’ambiente) con `E2E_EMAIL` e `E2E_PASSWORD` di un account valido.

### Workflow CI (GitHub Actions)

- **File**: `.github/workflows/playwright.yml`
- **Trigger**: pull request verso i branch `main` e `master`.
- **Steps**: checkout → setup Node (LTS) → `yarn` → `yarn playwright install --with-deps` → `yarn playwright test` con le variabili d’ambiente fornite dai **secrets** del repository (`E2E_EMAIL`, `E2E_PASSWORD`, `BASE_URL`, `NEXT_DATABASE_URL`, `NEXT_SUPABASE_*`, `NEXT_PUBLIC_REDIRECT_URL`).
- **Artifact**: al termine (anche in caso di fallimento, se il job non è stato cancellato) viene caricato il report HTML in `playwright-report/` con retention di 30 giorni, per analizzare screenshot e trace dei test falliti.
- **Report pubblicato**: il report dei test Playwright è disponibile in versione pubblica all’indirizzo [https://lordnik10.github.io/atlante-mobilita/](https://lordnik10.github.io/atlante-mobilita/).

---

## 📌 Note

Questo progetto è stato realizzato come prototipo nell’ambito di un bando sulla **mobilità sostenibile**.
Attualmente rimane un progetto portfolio, non è aperto a contributi esterni.
