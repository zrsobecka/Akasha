# Type Analysis — referencja ISTP

Status: pierwszy pionowy przekrój zaimplementowany; dokument referencyjny

Aktualizacja: 2026-07-13

Profil lokalny: prawdziwe imię pozostaje poza repozytorium

## 1. Cel

Ekran `Type Analysis` ma:

1. pokazać osiem funkcji roboczej hipotezy;
2. przegrupować jeden profil bez kopiowania danych;
3. wyjaśnić pojedynczą funkcję i cały blok;
4. pokazać drogę od definicji do wniosku;
5. przejść do obserwacji albo pytania z zachowanym kontekstem;
6. nie mylić konsekwencji modelu z potwierdzonym opisem osoby.

UI komunikuje założenie: „Jeśli robocza hipoteza ISTP jest trafna, model przewiduje następującą strukturę”.

## 2. Kanoniczne wejście

Według `Types/ISTP.md`:

- typ: ISTP;
- rdzeń: TiSe;
- Leading sign: Ti+;
- nazwa socjoniczna: ISTj;
- behavioral match: SLI;
- functional match: LSI.

| Pozycja    | Funkcja | Aspect       |
| ---------- | ------- | ------------ |
| Leading    | Ti      | Ego          |
| Creative   | Se      | Ego          |
| Activating | Ni      | Subconscious |
| Anima      | Fe      | Subconscious |
| Ignoring   | Te      | Shadow       |
| Background | Si      | Shadow       |
| Blindspot  | Ne      | Super-Ego    |
| Demon      | Fi      | Super-Ego    |

## 3. Macierz grupowań

Wszystkie widoki przedstawiają poniższy profil; przełącznik zmienia grupowanie, nie dane.

| Funkcja | Position   | Aspect       | Dimension         | Reflection | Axis     | Orbit      | Sphere    | Mode       |
| ------- | ---------- | ------------ | ----------------- | ---------- | -------- | ---------- | --------- | ---------- |
| Ti      | Leading    | Ego          | 4D Generalization | Lens       | Drive    | Worldview  | Identity  | Stance     |
| Se      | Creative   | Ego          | 3D Adaptation     | Expression | Method   | Impact     | Exchange  | Navigation |
| Ni      | Activating | Subconscious | 2D Norms          | Projection | Method   | Template   | Identity  | Regulation |
| Fe      | Anima      | Subconscious | 1D Experience     | Resonance  | Drive    | Impression | Exchange  | Sync       |
| Te      | Ignoring   | Shadow       | 3D Adaptation     | Resonance  | Friction | Worldview  | Avoidance | Regulation |
| Si      | Background | Shadow       | 4D Generalization | Projection | Drift    | Impact     | Filter    | Sync       |
| Ne      | Blindspot  | Super-Ego    | 1D Experience     | Expression | Drift    | Template   | Avoidance | Stance     |
| Fi      | Demon      | Super-Ego    | 2D Norms          | Lens       | Friction | Impression | Filter    | Navigation |

### Ring traits

| Funkcja       | Awareness   | Capacity | Receptivity | Preference | Rigidity | Scope       | Boldness |
| ------------- | ----------- | -------- | ----------- | ---------- | -------- | ----------- | -------- |
| Ti Leading    | Conscious   | Strong   | Accepting   | Valued     | Rigid    | Universal   | Bold     |
| Se Creative   | Conscious   | Strong   | Producing   | Valued     | Flexible | Situational | Cautious |
| Ni Activating | Unconscious | Weak     | Producing   | Valued     | Rigid    | Universal   | Cautious |
| Fe Anima      | Unconscious | Weak     | Accepting   | Valued     | Flexible | Situational | Bold     |
| Te Ignoring   | Unconscious | Strong   | Accepting   | Subdued    | Rigid    | Situational | Cautious |
| Si Background | Unconscious | Strong   | Producing   | Subdued    | Flexible | Universal   | Bold     |
| Ne Blindspot  | Conscious   | Weak     | Producing   | Subdued    | Rigid    | Situational | Bold     |
| Fi Demon      | Conscious   | Weak     | Accepting   | Subdued    | Flexible | Universal   | Cautious |

Testy domenowe powinny wykryć brak, duplikację lub zmianę którejkolwiek pozycji i cechy.

## 4. Zachowanie ekranu

Wzorzec desktopowy to lista osób, główny canvas i kontekstowy inspector. Profil, robocza hipoteza i status struktury pozostają widoczne podczas pracy.

Sterowanie:

- `Position grid`, `Aspects`, `Dimensions` są dostępne bezpośrednio;
- kolejne widoki mogą trafić do `More`;
- `Overview` pokazuje jedną lub dwie konsekwencje;
- `Deep dive` pokazuje traits, członkostwa, derivation i źródła;
- filtr evidence podświetla miejsca z przykładami, sprzecznościami albo pytaniami, ale nie zmienia modelu.

Powrót z innej zakładki zachowuje aktywny szkic, funkcję, grupowanie i głębokość. Aktywna praca nie może zniknąć tylko dlatego, że React odmontował widok.

## 5. Minimalna treść funkcji

Karta pokazuje element, pozycję, Aspect, Dimension, krótki wynik modelowy i liczbę przykładów. Nie stwierdza, że prawdziwa osoba na pewno zachowuje się zgodnie z opisem.

| Funkcja       | Skrót konsekwencji hipotezy                                                       |
| ------------- | --------------------------------------------------------------------------------- |
| Ti Leading    | Wewnętrzna spójność jako główny filtr; autonomia w testowaniu argumentów.         |
| Se Creative   | Elastyczne, sytuacyjne działanie wspierające Ti.                                  |
| Ni Activating | Ceniony, słabszy obszar wyboru kierunku i przyszłości.                            |
| Fe Anima      | Ceniona potrzeba emocjonalnej więzi, trudniejsza w samodzielnej obsłudze.         |
| Te Ignoring   | Silne użycie zewnętrznej wiedzy bez budowania na niej głównego sposobu myślenia.  |
| Si Background | Silna, automatyczna obsługa doświadczenia i stabilności, odsunięta od tożsamości. |
| Ne Blindspot  | Świadoma słabość w alternatywach, konsekwencjach i cudzych intencjach.            |
| Fi Demon      | Świadoma słabość wokół wartości, samooceny i osobistego stosunku emocjonalnego.   |

Status real-life pozostaje `brak danych`, dopóki użytkowniczka nie doda obserwacji.

## 6. Inspector Ti Leading

Inspector pokazuje:

```text
Ti · Leading
Primary lens · Hero · core identity

OVERVIEW
Internal logical consistency is the default frame for processing reality.

TRAITS
Conscious · Strong · Accepting · Valued · Rigid · Universal · Bold

MEMBERSHIPS
Ego · 4D Generalization · Lens · Drive · Worldview · Identity · Stance

REAL LIFE / QUESTIONS
Powiązane przykłady i pytania albo jeden następny krok

DERIVATION / SOURCES
Składniki reguły i źródłowe sekcje notatek
```

Wnioski są oznaczone jako `source`, `derived` albo `synthesis`. Synteza nie może udawać cytatu.

## 7. Aspects i Dimensions

### Aspects

| Blok         | Funkcje                     | Charakter                    |
| ------------ | --------------------------- | ---------------------------- |
| Ego          | Ti Leading + Se Creative    | conscious valued strength    |
| Subconscious | Ni Activating + Fe Anima    | unconscious valued weakness  |
| Shadow       | Te Ignoring + Si Background | unconscious subdued strength |
| Super-Ego    | Ne Blindspot + Fi Demon     | conscious subdued weakness   |

Każdy blok pokazuje funkcje, trzy cechy definiujące, krótką syntezę oraz liczbę przykładów pasujących, częściowych, sprzecznych i nierozstrzygniętych.

### Dimensions

| Dimension         | Funkcje ISTP               | Skrót                                        |
| ----------------- | -------------------------- | -------------------------------------------- |
| 4D Generalization | Ti Leading + Si Background | globalne i autonomiczne rozumienie           |
| 3D Adaptation     | Se Creative + Te Ignoring  | elastyczne dopasowanie do sytuacji           |
| 2D Norms          | Ni Activating + Fi Demon   | korzystanie z norm i wzorców                 |
| 1D Experience     | Fe Anima + Ne Blindspot    | uczenie głównie przez osobiste doświadczenie |

## 8. Referencyjny deep dive: Super-Ego

Skład: Ne Blindspot + Fi Demon; Conscious + Subdued + Weak.

Super-Ego jest obszarem świadomej słabości i nacisku społecznego. Braki pozostają odczuwalne, mimo że funkcje są słabe albo odsuwane. Może to tworzyć irytację, niepewność i kierunek rozwoju.

- **Ne Blindspot:** trudniej rozpisuje alternatywne przyszłości, konsekwencje i cudze intencje.
- **Fi Demon:** trudniej utrzymuje stabilny dostęp do własnych wartości, emocji i poczucia wartości.

Referencyjna synteza:

> Jeśli hipoteza ISTP jest trafna, model przewiduje świadome napięcie wokół pytań „czego inni naprawdę chcą i dokąd to prowadzi?” oraz „co to znaczy dla mnie i mojej wartości?”. Ponieważ obie funkcje są słabe i subdued, osoba może upraszczać, odsuwać albo kontrolować te obszary zamiast swobodnie je eksplorować.

Status: **synteza modelowa wymagająca zatwierdzenia** — nie cytat i nie potwierdzony opis osoby.

Pusty stan zachęca do dodania sytuacji dotyczącej przewidywania konsekwencji, cudzych intencji, osobistych wartości albo presji społecznej. Brak przykładów nie wygląda jak potwierdzenie modelu.

## 9. Derivation

Przykład dla Ne Blindspot:

```text
ISTP
└─ position 7 = Ne Blindspot
   ├─ Conscious · Weak · Producing · Subdued
   ├─ Rigid · Situational · Bold
   ├─ Super-Ego · 1D Experience · Expression
   └─ Drift · Template · Avoidance · Stance
```

Każdy węzeł może otworzyć definicję i źródło reguły.

## 10. Przejścia i stany

- `Add real-life example` otwiera evidence ze wstępnie wybraną funkcją lub blokiem.
- `Add further question` zachowuje kontekst analizy.
- licznik przykładów otwiera przefiltrowane evidence.
- źródło otwiera właściwą sekcję notatki.
- powrót nie usuwa aktywnego formularza ani zaznaczenia.

Wymagane stany: brak typu, brak przykładów, sprzeczna obserwacja, niekompletne źródło i konflikt źródeł. Konflikt pokazuje obie wartości i ich pochodzenie; UI nie wybiera cicho jednej wersji.

## 11. Znany konflikt ISTP

- `Types/ISTP.md`: `Temperament: IJ (Balanced-Stable)`;
- `Groups/Temperament.md`: ISTP należy do `IP (Receptive-Adaptive)`;
- reguła E/I + P/J również wskazuje IP.

Robocza wartość dla Groups to `IP / Receptive-Adaptive`, ale źródło typu wymaga świadomej korekty albo wyjaśnienia przed uznaniem wyniku za kanoniczny. Konflikt nie zmienia stosu ośmiu funkcji.

## 12. Kryteria akceptacji

- wszystkie osiem funkcji jest widoczne bez utraty kontekstu osoby;
- Position grid, Aspects i Dimensions używają jednej struktury;
- Ti można prześledzić przez wszystkie członkostwa;
- Super-Ego łączy Ne Blindspot i Fi Demon oraz oznacza syntezę;
- opis ma pochodzenie `source`, `derived` albo `synthesis`;
- brak przykładów nie potwierdza teorii;
- przykład lub pytanie zachowuje wybraną funkcję;
- aktywny szkic przeżywa zmianę zakładki;
- prywatne dane nie trafiają do repozytorium;
- konflikty wiedzy są jawne;
- testy wykrywają brak i duplikację funkcji lub cech.

## 13. Źródła domenowe

- `Types/ISTP.md`;
- `Model/Model Layout.md`;
- `Model/Cognitive Attitudes.md`;
- `Model/Rings.md`;
- `Model/Blocks.md`;
- `Descriptions/Function Manifestation.md`;
- `Groups/Temperament.md` — dla konfliktu z sekcji 11.

`Drafts`, Legacy, Sources i Archive nie są tu źródłami kanonicznymi.
