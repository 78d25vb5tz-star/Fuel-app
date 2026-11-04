# FUEL — Dag 5: echte voedingsregistratie

## Wat je vandaag toevoegt
- Bestaand Supabase-account en eigen persoonsgegevens blijven behouden.
- Zoeken in de centrale NEVO 2025/9.0 database.
- Meerdere voedingsmiddelen per maaltijd, per ingrediënt grammen aangeven.
- Maaltijd in één transactie opslaan met beveiligde Supabase RPC.
- Vandaag-overzicht met werkelijke geregistreerde kcal, eiwitten, koolhydraten en vetten.
- Bestaande waterregistratie en persoonlijke eiwit-/waterdoelen vanuit Supabase.
- Historische grafiek voor geregistreerde voeding, zonder verzonnen Garmin-waarden.

## 1. Eenmalig: SQL uitvoeren (voordat je de website vervangt)
1. Open Supabase > project `fuel-app` > **SQL Editor** > **New query**.
2. Kopieer de volledige inhoud van `01_DAG5_MAALTIJD_OPSLAAN.sql`.
3. Klik **Run** en controleer of er geen SQL-fout staat.

De functie werkt onder de identiteit van de ingelogde gebruiker (security invoker). Binnen één transactie worden de maaltijd en alle ingrediënten vastgelegd. De bestaande RLS-policies blijven gelden.

## 2. Website updaten in de BESTAANDE GitHub-repository
**Let op:** gebruik je webapp-repository die aan `fuelapp-two.vercel.app` hangt, **niet** `fuel-nevo-import`.

1. Maak eventueel op je computer een backup van je huidige `index.html` (via GitHub is de oude versie ook via de commitgeschiedenis beschikbaar).
2. Open je bestaande GitHub-webapp-repository > **Code**.
3. Klik het bestaande `index.html` aan > **Edit** (potloodje), verwijder de inhoud en plak de volledige inhoud uit het nieuwe `index.html`.
4. Kies **Commit changes** naar `main`.
5. Upload via **Add file > Upload files** ook: `fuel-logo.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest`, `sw.js` en `vercel.json` (naar de hoofdmap, niet in een submap). Overspring deze bestanden niet, want de nieuwe site gebruikt de iconen en manifest.
6. Upload geen SQL-bestand naar de publieke webapp: SQL hoort in Supabase SQL Editor.
7. Controleer in Vercel onder **Deployments** dat de nieuwe commit **Ready** is.

## 3. Inloggen en testen
1. Open `https://fuelapp-two.vercel.app/` in een vernieuwd tabblad. Op iPhone kan een hard refresh of PWA helemaal sluiten en openen nodig zijn.
2. De nieuwe app leest dezelfde lokale Supabase-project-URL + publishable key uit `fuel_day4_public_config` als de Dag 4-testpagina. Als je een andere browser gebruikt, vul die gegevens eenmaal in. Gebruik **NOOIT** een secret/service-role/Garmin-sleutel.
3. Log in met je bestaande FUEL-account.
4. Open **Registreren**. Zoek `Skyr`; klik **+ Voeg toe**; geef bijvoorbeeld `250` gram op.
5. Zoek daarna `Walnoot` en voeg bijvoorbeeld `25` gram toe.
6. Geef de maaltijd een naam (`Ontbijt — Skyr met walnoten`) en klik **Maaltijd opslaan**.
7. Op **Vandaag** verschijnen de opgeslagen voedingswaarden, niet meer de fictieve 1.680 kcal.
8. Voeg 250 ml water toe. De bestaande 500 ml van dag 4 telt voor dezelfde kalenderdag mee.
9. Test het wijzigen van een maaltijd via verwijderen + opnieuw invoeren. Controleer na opnieuw openen of de maaltijd aanwezig blijft.

## Wat nog niet aangesloten is
- Fotoanalyse (dag 6): deze versie gebruikt handmatige ingrediënten en grammen.
- Garmin: geen live calorietekort of stappen zolang de echte verbinding niet online is geïntegreerd.
- Trainingsplanner/achievements: nog niet aan de backend gekoppeld.
- Uitgebreide micronutriëntendetails en 5-jaar archivering: de database ondersteunt ze; de dag-5 UI haalt maximaal de 500 meest recente maaltijden op als tijdelijke limiet. De grafiek toont de beschikbare registraties.
- Voedingswaarde is een benadering op basis van NEVO per 100 gram en geschatte/gecorrigeerde porties. Ontbrekende NEVO-waarden zijn onbekend, niet automatisch nul.

## Bij problemen
- **Could not find function `fuel_save_meal`:** controleer of je SQL hebt uitgevoerd, en ververs de pagina. Bij hardnekkige caching, kijk in Supabase of de functie bestaat.
- **Permission denied:** controleer of je ingelogd bent en of dag 4 SQL inclusief RLS is uitgevoerd.
- **Geen zoekresultaten:** zoek één ingrediënt tegelijk (Skyr, walnoten); de database bevat niet iedere maaltijdcombinatie.
- **Niet ingelogd:** gebruik je bestaande account. Deel nooit wachtwoorden, Garmin API-sleutels of Supabase secret keys.
- **Website blijft oud:** ververs Vercel-deployment, heropen iPhone PWA. Onze nieuwe serviceworker ruimt de oude democache op.

**Bronvermelding:** Gebaseerd op gegevens van NEVO-online versie 2025/9.0, RIVM, Bilthoven.
