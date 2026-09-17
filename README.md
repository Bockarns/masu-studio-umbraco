# MaSu Studio – CMS Webbprojekt (E-handel & Portfölj)

En modern, innehållsdriven webbplats och portfölj med e-handelskaraktär utvecklad i **Umbraco 17** (ASP.NET Core / C#). Projektet är skapat som slutprojekt i kursen *Publiceringsverktyg (20 YH-poäng)* inom utbildningen Webbutvecklare på TUC Yrkeshögskola.

---

## 🎨 Scenario & Syfte

Webbplatsen simulerar en komplett digital närvaro för den frilansande konstnären **Ma* Su* (MaSu Studio)**. Lösningen fungerar som en kombinerad visuell portfölj, kommunikationskanal för utställningar samt en e-handelsplats för försäljning av originalkonst, reproduktioner (prints) och rekommenderat konstnärsmaterial.

### Målgrupper
* **Primär målgrupp:** Konstintresserade privatpersoner, konstsamlare, gallerister samt journalister/media som söker pressmaterial.
* **Sekundär målgrupp:** Konstnären själv (Admin) och hens assistent (Editor) som hanterar det dagliga redaktionella innehållet.

---

## ⚙️ Teknisk Stack

* **CMS:** [Umbraco](https://umbraco.com/) (v17, ASP.NET Core / C#)
* **Databas:** SQLite (lokal utvecklingsdatabas)
* **Frontend:** Razor Views (`.cshtml`), HTML5, CSS3, JavaScript
* **CSS-ramverk:** Bootstrap 5
* **Externa bibliotek:** [GLightbox](https://biati-digital.github.io/glightbox/) för responsiv bildförstoring

---

## 🏗️ Innehållsmodellering (Document Types)

Projektet använder Umbracos starka datatypning för att separera olika typer av innehåll och säkerställa att redaktörer inte kan bryta sidans layout:

| Document Type | Beskrivning & Fält |
| :--- | :--- |
| **`HomePage`** | Startsida med hero-banner, intro, CTA samt dynamisk karusell via *Multi-Node Tree Picker* och snabbnyheter. |
| **`Artwork`** | Konstverk i galleriet (`Titel`, `Beskrivning`, `Bild`, `Teknik`, `Storlek`, `År`, `Till salu`). Stödjer bläddring via syskonnoder (`NextSibling`/`PreviousSibling`). |
| **`Product`** | E-handelsartiklar för prints och material (`Namn`, `Pris`, `Beskrivning`, `Bild`, `Kategori`, `Lager`). Kan kopplas till konstverk via *Content Picker*. |
| **`GalleryPage`** | Galleriöversikt som listar alla `Artwork`-noder i ett responsivt grid. |
| **`ShopPage`** | Butiksöversikt som listar tillgängliga produkter och prints. |
| **`NewsPage`** | Samlingssida för nyheter och utställningar. |
| **`NewsPost`** | Enskild artikel eller kalenderhändelse (`Titel`, `Brödtext (RTE)`, `Bild`, `Datum`, `Typ`). Ett typ-fält (Dropdown: Nyhet/Utställning) styr visningslogiken. |
| **`CartPage`** | Demonstrativ varukorg som hanterar klientsessionsbaserad checkout via JavaScript. |
| **`AboutPage`** | Informationssida med biografi och kontaktformulär. |

---

## 👥 Roller & Publiceringsflöde

Säkerhet och redaktionell integritet är implementerade genom differentierade användarbehörigheter i Umbraco Backoffice:

1. **Konsult / Utvecklare (`Administrators`):** Full teknisk behörighet för att skapa Document Types, mallar, partial views och datastruktur under utvecklingsfasen.
2. **Konstnären (`Administrators`):** Slutgiltig ägare med full behörighet att granska och publicera material live samt hantera övergripande inställningar.
3. **Assistenten (`Editors`):** Begränsad redaktörsroll. Assistenten har behörighet att skapa, uppdatera och spara utkast för konstverk, produkter och nyheter, men saknar behörighet att publicera live (`Publish = false`) eller ändra systemkonfiguration.

### Publiceringsflöde i praktiken:
```text
[ Assistent (Editor) ]  -->  Laddar upp bild & fyller i metadata (Artwork / Product)
                                      │
                                      ▼
                                Sparar som Utkast
                                      │
                                      ▼
[ Konstnär (Admin) ]   -->  Granskar innehåll, korrigerar vid behov & klickar "Publicera"
                                      │
                                      ▼
                          Live på webbplatsen!
```

🚀 Kom igång lokalt
Förutsättningar
.NET SDK (.NET 9 / relevant version för Umbraco 17)

Visual Studio 2022 eller Visual Studio Code

Installation & Körning
Klona repot:

```Bash
git clone [https://github.com/DITT-ANVANDARNAMN/MaSu-Studio.git](https://github.com/DITT-ANVANDARNAMN/MaSu-Studio.git)
cd MaSu-Studio
```

Återställ paket & bygg:

```Bash
dotnet restore
dotnet build
```

Kör projektet:

```Bash
dotnet run
```

Öppna i webbläsaren:

Webbplats: https://localhost:xxxx

Umbraco Backoffice: https://localhost:xxxx/umbraco
