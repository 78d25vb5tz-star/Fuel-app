# FUEL – Dag 6: fotoherkenning

**Je hoeft niets lokaal te installeren.** Gebruik je bestaande Supabase-project `fuel-app` en je bestaande FUEL GitHub/Vercel-site.

## 1. API-sleutel voor AI regelen

Open https://platform.openai.com/api-keys en maak een nieuwe OpenAI API-sleutel. Een ChatGPT Plus-abonnement omvat geen API-tegoed; controleer je API-billing en stel een gebruikslimiet/budgetmelding in. **Plak deze sleutel nooit in GitHub, `index.html` of `fuel-config.js`. Stuur hem ook niet in de chat.**

## 2. Supabase SQL uitvoeren

Open Supabase → `fuel-app` → SQL Editor → New query. Plak de volledige inhoud van `01_DAG6_AI_LIMIET.sql` en klik Run. Deze functie telt maximaal tien AI-aanroepen per gebruiker per UTC-dag. Mislukte analyses nadat het dagquotum geclaimd is, tellen ook mee.

## 3. OpenAI-sleutel veilig als Supabase-secret opslaan

Supabase → Edge Functions → Secrets. Voeg één secret toe:

- **Name:** `OPENAI_API_KEY`
- **Value:** je volledige OpenAI API-sleutel

Bewaar en deel de waarde nergens anders. Supabase levert `SUPABASE_URL` en `SUPABASE_ANON_KEY` automatisch in de functieomgeving.

## 4. Edge Function aanmaken

Supabase → Edge Functions → Deploy a new function → Via Editor. Naam **exact** `fuel-analyze-photo`.

Vervang in de online editor de volledige inhoud van `index.ts` door `supabase/functions/fuel-analyze-photo/index.ts` uit het ZIP-pakket. Klik **Deploy function**.

**Beveiliging:** laat **Verify JWT** aan staan (niet uitzetten om een 401 te omzeilen). De functie valideert zelf ook het ingelogde Supabase-account, bewaart OpenAI-sleutel op de server en gebruikt de SQL-limiet.

## 5. Alleen websitebestanden bijwerken

Open de **gewone FUEL-webapp repository** die aan Vercel gekoppeld is (niet de NEVO-import-repository).

Upload/overschrijf in de hoofdmap:
- `index.html`
- `sw.js`
- `fuel-logo.svg`
- `manifest.webmanifest`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`
- `vercel.json`

**BELANGRIJK: `fuel-config.js` is bewust niet inbegrepen. Houd de reeds werkende versie in GitHub ongewijzigd.** Je juiste Supabase-URL blijft `https://kmmtdjfpbfwqkgwsyuyv.supabase.co` (zonder `/rest/v1/`). Upload **nooit** je OpenAI-sleutel of het SQL-bestand naar de openbare site.

## 6. Eerste foto testen

Open op je iPhone `https://fuelapp-two.vercel.app/?v=6` in Safari, log in, ga naar **Registreren**. Kies of maak een foto van een herkenbare maaltijd. Druk **Analyseer foto**. Je krijgt geschatte ingrediënten en gewichten. Als de AI twijfelt toont FUEL **precies drie suggesties en de optie zelf invullen**. Kies per ingrediënt het juiste NEVO-product; pas de grammen aan. De gekozen producten verschijnen in **Jouw maaltijd**, waar je de maaltijd kunt opslaan zoals op dag 5. Controleer na heropenen of de maaltijd is bewaard.

## Veiligheids- en productnotities

- AI herkent zichtbare ingrediënten, maar kan bereidingswijze, olie, sauzen of grammen missen. **Er wordt niets zonder jouw bevestiging opgeslagen.**
- Foto's worden in browsergeheugen tijdelijk verkleind en alleen voor de analyse naar OpenAI gestuurd via de Supabase-functie. Deze versie slaat **geen foto** op in Supabase Storage. Controleer het actuele gegevensverwerkingsbeleid van de AI-leverancier voordat je dit breed uitrolt.
- De app gebruikt een *hard quotum van tien analyseverzoeken per ingelogde gebruiker per UTC-dag* in SQL, ook bij parallelle verzoeken. Stel daarnaast zelf een budget-/spend-limiet in op het OpenAI API-account.
- Deze servercode is een prototype voor besloten testgebruik. Voor publieke uitrol: extra abuse-limieten, logging zonder foto's, heldere privacyinformatie, releaseproces en uitgebreidere beveiligingstesten.
- `Failed to send a request to the Edge Function`: controleer de functie-naam, deployment, JWT en online Edge Function Logs.
- `Daglimiet`: wacht tot de volgende UTC-dag; verhoog niet zomaar de teller.
- `AI-aanroep mislukt (401/429)`: controleer je OpenAI-key, API-billing en quota.

De code is statisch gecontroleerd met Node JS syntaxcheck. De daadwerkelijke OpenAI/Supabase-aanroep moet je met je eigen accounts testen; ik heb geen toegang tot je private sleutels.
