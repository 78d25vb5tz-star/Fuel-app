# FUEL — Dag 3: online publiceren zonder Node.js

Dit is een **demonstratie**. Er staan geen Garmin-sleutels, geen echte voeding, geen privégegevens en geen NEVO-database in dit ZIP-bestand. Gebruikersaccounts, clouddata en echte API-integraties volgen later.

## Stap 1 — GitHub
1. Maak gratis een account bij https://github.com of log in.
2. Klik rechtsboven op `+` → `New repository`.
3. Repository name: `fuel-app` (of een andere naam).
4. Kies bij voorkeur **Private** en selecteer **Add a README** om het repository meteen te initialiseren.
5. Klik `Create repository`.
6. Klik in het repository op `Add file` → `Upload files`.
7. Pak eerst dit ZIP-bestand uit en upload de **inhoud van de map**, dus `index.html`, `vercel.json`, `sw.js`, `manifest.webmanifest`, de icoonbestanden, logo's, enzovoort — **niet het ZIP-bestand zelf**. Zorg dat `index.html` in de hoofdmap staat, niet in een submap.
8. Klik `Commit changes`.

## Stap 2 — Vercel
1. Ga naar https://vercel.com en meld je aan met GitHub.
2. Klik `Add New` → `Project` (soms `New Project`).
3. Verleen Vercel toegang tot jouw **fuel-app** repository, indien gevraagd.
4. Kies het GitHub-repository `fuel-app` en klik `Import`.
5. Zet **Framework Preset** op `Other`.
6. Zet **Root Directory** op `./` (of de hoofdmap van de repository).
7. Er is **geen Build Command** nodig. Laat dit veld leeg. Output Directory is `.` (de hoofdmap); de meegeleverde `vercel.json` stelt dit in.
8. Klik `Deploy`.
9. Open de `*.vercel.app` URL die Vercel toont en test de vier tabbladen.

## Stap 3 — iPhone
1. Open de Vercel URL in **Safari** op de iPhone.
2. Tik op **Deel** → **Zet op beginscherm**.
3. Start FUEL via het eigen icoontje. Het blijft een demo met fictieve data.

## Belangrijke veiligheid
- Een **private GitHub-repository maakt de gepubliceerde Vercel-website niet automatisch privé**. Wie de URL kent kan de demo doorgaans openen. Zet dus nog geen echte gezondheiddata of sleutels in de site.
- Upload **nooit** Garmin API-sleutels, OpenAI API-sleutels of `.env` bestanden naar GitHub.
- De NEVO-bronbestanden worden op Dag 4 via een afgeschermde databank geïmporteerd; ze zitten bewust niet in deze site.
- In deze demo worden water-/trainingswijzigingen alleen opgeslagen in de `localStorage` van de browser waar je hem opent; er is nog geen synchronisatie tussen apparaten of accounts.
- Als je werkt op een beheerde werklaptop: houd rekening met beleid voor het openen van GitHub, Vercel en persoonlijke accounts.

## Problemen?
- **404**: controleer of `index.html` in de **root** van de repository staat, niet onder een extra map.
- **Vercel wil iets builden**: kies `Other`, zet Build Command Override aan en maak het veld leeg.
- **Repo ontbreekt in Vercel**: geef de Vercel GitHub-integratie expliciet toegang tot het repository.
- **Pagina oud**: open de Vercel URL opnieuw; PWA-serviceworker kan offline een vorige kopie tonen. Online ververs je in Safari.

## Volgende bouwdag
Supabase-authenticatie, veilige gebruikersscheiding en centrale NEVO-tabellen. Daarna wordt de Garmin-koppeling met veilige per-user authenticatie ontworpen.
