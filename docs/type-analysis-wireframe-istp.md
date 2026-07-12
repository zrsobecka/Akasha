# Type Analysis — pierwszy wireframe na przykładzie ISTP

Status: specyfikacja pierwszego pionowego przekroju  
Data: 2026-07-13  
Profil lokalny: prawdziwe imię pozostaje poza repozytorium  
Hipoteza robocza: ISTP

## 1. Cel tego wireframe'u

Ten dokument sprawdza najważniejsze założenie Akashy na jednym konkretnym typie. Ekran ma pozwolić:

1. zobaczyć wszystkie osiem funkcji ISTP;
2. przegrupować te same funkcje według struktur modelu;
3. przeczytać, co wynika z pojedynczej funkcji i z całego bloku;
4. prześledzić, z czego powstał wniosek;
5. przejść od teorii do prawdziwego przykładu albo dalszego pytania;
6. nie pomylić konsekwencji hipotezy ISTP z potwierdzonym opisem osoby.

Wireframe dotyczy wyłącznie zakładki `Type Analysis`. Dane o prawdziwej osobie, jej zachowaniu i relacjach nie są częścią repozytorium.

## 2. Kanoniczne wejście typu

Według `Types/ISTP.md`:

- typ: ISTP;
- rdzeń: TiSe;
- Leading sign: Ti+;
- alternatywna nazwa w ramie socjonicznej: ISTj;
- behavioral match: SLI;
- functional match: LSI.

Stos funkcji:

| Pozycja | Funkcja | Aspect |
|---|---|---|
| Leading | Ti | Ego |
| Creative | Se | Ego |
| Activating | Ni | Subconscious |
| Anima | Fe | Subconscious |
| Ignoring | Te | Shadow |
| Background | Si | Shadow |
| Blindspot | Ne | Super-Ego |
| Demon | Fi | Super-Ego |

W UI wszystkie wynikowe treści muszą być poprzedzone znaczeniem:

> Jeśli robocza hipoteza ISTP jest trafna, model przewiduje następującą strukturę.

## 3. Układ całego ekranu

Wzorzec desktopowy: lista osób + główny canvas + kontekstowy inspector.

```text
┌──────────────────┬──────────────────────────────────────────────────────────────┐
│ PEOPLE           │  Example person        ISTP · working hypothesis            │
│                  │  Person  [Type Analysis]  Real Life  Hypothesis  ...         │
│ Search…          ├──────────────────────────────────────────────────────────────┤
│                  │  View: [Position grid] Aspects Dimensions More ▾             │
│ • selected       │  Depth: [Overview] Deep dive         Evidence: All ▾         │
│ • another person ├────────────────────────────────────────────┬─────────────────┤
│                  │                                            │ INSPECTOR       │
│                  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │ Ti · Leading    │
│                  │  │ Ti  Le │ │ Se  Cr │ │ Ni  Ac │ │Fe An │ │                │
│                  │  │  Ego   │ │  Ego   │ │ Subcon │ │Subcon│ │ What it is     │
│                  │  │ 4D     │ │ 3D     │ │ 2D     │ │ 1D   │ │ What follows   │
│                  │  └────────┘ └────────┘ └────────┘ └──────┘ │ Traits         │
│                  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │ Derivation     │
│                  │  │ Te  Ig │ │ Si  Ba │ │ Ne  Bl │ │Fi De │ │ Sources        │
│                  │  │ Shadow │ │ Shadow │ │Super-Eg│ │Super │ │                │
│                  │  │ 3D     │ │ 4D     │ │ 1D     │ │ 2D   │ │ [Add example]  │
│                  │  └────────┘ └────────┘ └────────┘ └──────┘ │ [Add question] │
│                  │                                            │                │
│                  │  Selected grouping explanation             │                │
└──────────────────┴────────────────────────────────────────────┴─────────────────┘
```

Zasady:

- lista osób pozostaje widoczna;
- profil i hipoteza pozostają widoczne podczas przewijania;
- centralny canvas pokazuje strukturę;
- inspector otwiera szczegóły bez opuszczania siatki;
- maksymalnie trzy główne panele;
- ostatni widok, grupowanie i zaznaczona funkcja są zapamiętywane per osoba.

## 4. Pasek kontekstu

Nagłówek profilu pokazuje:

- nazwę osoby pobraną z lokalnej bazy;
- `ISTP` jako roboczą hipotezę;
- poziom pewności, jeśli został ustawiony;
- `TiSe` jako skrót rdzenia;
- status danych, np. `8/8 functions derived`;
- ostrzeżenie, jeśli źródła wiedzy są niespójne albo niekompletne.

Kliknięcie `working hypothesis` prowadzi do `Hypothesis & Further Questions`, ale nie przerywa analizy bez potwierdzenia.

## 5. Pasek sterowania analizą

### View

Widoczne bezpośrednio:

- `Position grid`;
- `Aspects`;
- `Dimensions`.

Menu `More`:

- Reflections;
- Axes;
- Orbits;
- Spheres;
- Modes;
- Value;
- Capacity;
- Awareness;
- Function pairs.

Najczęściej używane trzy widoki są na wierzchu. Pozostałe nie zajmują stale miejsca, ale można je przypiąć później jako ulubione.

### Depth

- `Overview` — jedna lub dwie główne konsekwencje na kartę albo blok;
- `Deep dive` — pełne traits, opis pozycji, synteza i źródła.

### Evidence

- All;
- With examples;
- Without examples;
- Contradictions;
- Questions.

Filtr dowodów nie zmienia modelu. Podświetla jedynie miejsca, które mają odpowiednie powiązania z `Link to Real Life`.

## 6. Pełna macierz ISTP

Poniższa tabela jest głównym fixture'em domenowym dla wireframe'u. Wszystkie widoki mają przedstawiać te same dane bez ich duplikowania.

| Funkcja | Position | Aspect | Dimension | Reflection | Axis | Orbit | Sphere | Mode |
|---|---|---|---|---|---|---|---|---|
| Ti | Leading | Ego | 4D Generalization | Lens | Drive | Worldview | Identity | Stance |
| Se | Creative | Ego | 3D Adaptation | Expression | Method | Impact | Exchange | Navigation |
| Ni | Activating | Subconscious | 2D Norms | Projection | Method | Template | Identity | Regulation |
| Fe | Anima | Subconscious | 1D Experience | Resonance | Drive | Impression | Exchange | Sync |
| Te | Ignoring | Shadow | 3D Adaptation | Resonance | Friction | Worldview | Avoidance | Regulation |
| Si | Background | Shadow | 4D Generalization | Projection | Drift | Impact | Filter | Sync |
| Ne | Blindspot | Super-Ego | 1D Experience | Expression | Drift | Template | Avoidance | Stance |
| Fi | Demon | Super-Ego | 2D Norms | Lens | Friction | Impression | Filter | Navigation |

## 7. Pełne profile ring każdej funkcji

| Funkcja i pozycja | Awareness | Capacity | Receptivity | Preference | Rigidity | Scope | Boldness |
|---|---|---|---|---|---|---|---|
| Ti Leading | Conscious | Strong | Accepting | Valued | Rigid | Universal | Bold |
| Se Creative | Conscious | Strong | Producing | Valued | Flexible | Situational | Cautious |
| Ni Activating | Unconscious | Weak | Producing | Valued | Rigid | Universal | Cautious |
| Fe Anima | Unconscious | Weak | Accepting | Valued | Flexible | Situational | Bold |
| Te Ignoring | Unconscious | Strong | Accepting | Subdued | Rigid | Situational | Cautious |
| Si Background | Unconscious | Strong | Producing | Subdued | Flexible | Universal | Bold |
| Ne Blindspot | Conscious | Weak | Producing | Subdued | Rigid | Situational | Bold |
| Fi Demon | Conscious | Weak | Accepting | Subdued | Flexible | Universal | Cautious |

W UI traits są krótkimi, klikalnymi tokenami. Kliknięcie `Rigid` pokazuje definicję cechy oraz jej rolę w aktualnym wniosku.

## 8. Karty ośmiu funkcji — treść Overview

Karty nie stwierdzają, że prawdziwa osoba na pewno zachowuje się w opisany sposób. Pokazują konsekwencję roboczej hipotezy ISTP.

### Ti Leading — Ego · 4D · Identity

- Główny filtr rzeczywistości oparty na wewnętrznej spójności logicznej.
- Model przypisuje tej pozycji szybkie wychwytywanie niespójności i samodzielne testowanie argumentów.
- Status real-life: brak danych, dopóki użytkowniczka nie doda przykładu.

### Se Creative — Ego · 3D · Exchange

- Elastyczne, sytuacyjne działanie wspierające Ti.
- Odpowiedzialność może wyrażać się przez rozwijanie konkretnej sprawności oraz podnoszenie poziomu wykonania u siebie i innych.
- Status real-life: brak danych.

### Ni Activating — Subconscious · 2D · Identity

- Ceniony, ale słabszy obszar związany z wyborem kierunku i pragnieniem określonej przyszłości.
- Model opisuje energię pojawiającą się wtedy, gdy można zdecydowanie pójść jedną drogą.
- Status real-life: brak danych.

### Fe Anima — Subconscious · 1D · Exchange

- Głęboko ceniona potrzeba emocjonalnej więzi i akceptacji, której samodzielne obsługiwanie może być trudne.
- Rozwój prowadzi przez bardziej otwartą komunikację emocji i budowanie empatii.
- Status real-life: brak danych.

### Te Ignoring — Shadow · 3D · Avoidance

- Silne, sytuacyjne korzystanie z zewnętrznej wiedzy, ale bez chęci oparcia na niej głównego sposobu myślenia.
- Napięcie może pojawić się przy automatycznym odrzucaniu cudzych badań albo kompetencji bez ich sprawdzenia.
- Status real-life: brak danych.

### Si Background — Shadow · 4D · Filter

- Silna, automatyczna obsługa doświadczenia, stabilności i fizycznego zaplecza, z którą osoba może się nie utożsamiać.
- Notatki wskazują na możliwy krytycyzm wobec własnej dyscypliny i jakości zgromadzonych doświadczeń.
- Status real-life: brak danych.

### Ne Blindspot — Super-Ego · 1D · Avoidance

- Świadomy, słaby i odrzucany obszar alternatywnych możliwości oraz przewidywania cudzych intencji.
- Ryzykiem modelowym jest działanie bez pełnego rozpisania przyszłych konsekwencji.
- Status real-life: brak danych.

### Fi Demon — Super-Ego · 2D · Filter

- Świadomy, słaby i odsunięty obszar osobistych wartości, samooceny i wewnętrznego stosunku emocjonalnego.
- Integracja oznacza budowanie stabilniejszego szacunku do siebie i działania zgodnego z własnymi wartościami.
- Status real-life: brak danych.

## 9. Inspector funkcji — przykład Ti Leading

Po kliknięciu Ti karta pozostaje zaznaczona, a inspector pokazuje:

```text
Ti · Leading
Refinement · Singular Perspective Propagation

ROLE
Primary lens · Hero · core identity

OVERVIEW
Internal logical consistency is the default frame for processing reality.

WHAT FOLLOWS
• high autonomy in testing arguments
• sensitivity to contradictions
• tendency to consult own reasoning before external authority

TRAITS
Conscious · Strong · Accepting · Valued · Rigid · Universal · Bold

GROUP MEMBERSHIPS
Ego · 4D Generalization · Lens · Drive · Worldview · Identity · Stance

REAL LIFE
No examples yet
[Add real-life example]

QUESTIONS
No open questions yet
[Add a question]

DERIVATION
[Show how this was derived]

SOURCES
Ti.md · Cognitive Attitudes.md · Model Layout.md
Function Manifestation.md
```

`What follows` musi rozróżniać:

- treści zapisane bezpośrednio w notatkach;
- proste konsekwencje cech modelu;
- syntezy wymagające autorskiego zatwierdzenia.

## 10. Widok Aspects

Po wybraniu `Aspects` osiem kart zmienia się w cztery bloki. W środku nadal widoczne są funkcje.

```text
┌──────────────────────────────┬──────────────────────────────┐
│ EGO                          │ SUBCONSCIOUS                 │
│ Ti Leading + Se Creative     │ Ni Activating + Fe Anima     │
│ I know / Others need me      │ I want / I need others       │
│ conscious valued strength    │ unconscious valued weakness  │
├──────────────────────────────┼──────────────────────────────┤
│ SHADOW                       │ SUPER-EGO                    │
│ Te Ignoring + Si Background  │ Ne Blindspot + Fi Demon      │
│ I can / I don't need others  │ I should / Others don't need │
│ unconscious subdued strength │ conscious subdued weakness   │
└──────────────────────────────┴──────────────────────────────┘
```

Każdy blok pokazuje:

- dwie funkcje;
- trzy cechy definiujące block;
- charakter bloku;
- krótką syntezę `co z tego wynika`;
- liczbę przykładów pasujących, częściowych, sprzecznych i nierozstrzygniętych;
- przyciski `Open block`, `Add example` i `Add question`.

## 11. Deep dive — Super-Ego ISTP

Ten blok jest pierwszym pełnym testem funkcji `co z tego wynika`.

### Skład

- Ne Blindspot;
- Fi Demon;
- Conscious;
- Subdued;
- Weak.

### Znaczenie strukturalne z notatek

Super-Ego jest obszarem świadomej słabości i nacisku społecznego. Funkcje są słabe, odrzucane albo uznawane za mało znaczące, ale ich braki pozostają świadomie odczuwalne. Blok może być źródłem irytacji, niepewności i potencjalnego rozwoju.

### Składniki funkcjonalne

**Ne Blindspot**

- słabo rozpisuje alternatywne przyszłości i konsekwencje;
- może nie zauważać cudzych pragnień albo intencji;
- rozwój zaczyna się od uznania: `nie wiem, co może się wydarzyć`.

**Fi Demon**

- trudność w stabilnym dostępie do własnych wartości, emocji i poczucia wartości;
- pod silnym stresem może reagować skrajnie na brak uznania;
- integracja prowadzi do większego szacunku do siebie i spójności z własnymi wartościami.

### Kandydat na wynikową syntezę

> Jeśli hipoteza ISTP jest trafna, model przewiduje świadome napięcie wokół dwóch powiązanych pytań: `czego inni naprawdę chcą i dokąd to prowadzi?` oraz `co to znaczy dla mnie i mojej wartości?`. Ponieważ obie funkcje są słabe i subdued, osoba może próbować upraszczać, odsuwać albo kontrolować te obszary zamiast swobodnie je eksplorować.

Status tej syntezy: **wyprowadzenie modelowe wymagające zatwierdzenia**, nie bezpośredni cytat z notatek i nie potwierdzony opis prawdziwej osoby.

### Link to Real Life

Pusta sekcja pokazuje:

```text
No real-life evidence yet.

Do not assume the model is confirmed.
Add a situation involving:
• anticipating consequences or other people's intentions;
• naming personal values or emotional preference;
• social pressure around either area.

[Add observation]  [Add further question]
```

## 12. Widok Dimensions

Funkcje są grupowane według jakości przetwarzania:

| Dimension | Funkcje ISTP | Skrót znaczenia |
|---|---|---|
| 4D Generalization | Ti Leading + Si Background | globalne i autonomiczne rozumienie |
| 3D Adaptation | Se Creative + Te Ignoring | elastyczne dopasowanie do sytuacji |
| 2D Norms | Ni Activating + Fi Demon | korzystanie z zewnętrznych norm i wzorców |
| 1D Experience | Fe Anima + Ne Blindspot | uczenie głównie przez osobiste doświadczenie |

Kliknięcie dimension pokazuje wspólną cechę oraz różnicę między funkcją cenioną i subdued, świadomą i nieświadomą.

## 13. Pokaż, z czego to wynika

Każdy wniosek otwiera ścieżkę derivation. Dla `Ne Blindspot`:

```text
ISTP type definition
└─ position 7 = Ne
   └─ position 7 = Blindspot
      ├─ Conscious
      ├─ Weak
      ├─ Producing
      ├─ Subdued
      ├─ Rigid
      ├─ Situational
      └─ Bold
         ├─ Aspect: Super-Ego
         ├─ Dimension: 1D Experience
         ├─ Reflection: Expression
         ├─ Axis: Drift
         ├─ Orbit: Template
         ├─ Sphere: Avoidance
         └─ Mode: Stance
```

Każdy węzeł jest klikalny. Inspector pokazuje definicję oraz źródło reguły.

## 14. Przejścia do pozostałych zakładek

Z Type Analysis dostępne są tylko działania związane z aktualnym kontekstem:

- `Add real-life example` → `Link to Real Life` z wstępnie przypiętą funkcją albo blokiem;
- `Add further question` → `Hypothesis & Further Questions` z zachowanym kontekstem;
- kliknięcie licznika przykładów → przefiltrowane `Link to Real Life`;
- kliknięcie hipotezy → historia i alternatywne typy;
- kliknięcie źródła → podgląd odpowiedniej sekcji notatki.

Powrót zachowuje zaznaczoną funkcję, grupowanie, głębokość i pozycję przewijania.

## 15. Stany interfejsu

### Brak typu

```text
Type Analysis needs a working hypothesis.
Choose a type to explore what the model would predict.
[Choose working type]
```

### Brak przykładów

Pokazuje wyraźnie, że teoria nie została jeszcze potwierdzona, oraz jedno działanie `Add real-life example`.

### Sprzeczne obserwacje

Karta dostaje znacznik `Contradiction`, ale opis teoretyczny nie jest automatycznie usuwany. Inspector pokazuje obie warstwy obok siebie.

### Niekompletne źródło

Wniosek nie jest generowany na siłę. UI pokazuje brakującą definicję oraz link do źródła.

### Konflikt źródeł

UI pokazuje obie wartości, ich pochodzenie i status rozstrzygnięcia. Nie wybiera cicho wygodniejszej wersji.

## 16. Znaleziona niespójność dotycząca ISTP

Podczas przygotowywania wireframe'u wykryto konflikt:

- `Types/ISTP.md` podaje `Temperament: IJ (Balanced-Stable)`;
- `Groups/Temperament.md` przypisuje ISTP do `IP (Receptive-Adaptive)`;
- reguła zdefiniowana jako E/I + P/J również wskazuje dla ISTP wartość IP.

Rekomendowane robocze rozstrzygnięcie dla przyszłego ekranu Groups: `IP / Receptive-Adaptive`, ale notatka `Types/ISTP.md` wymaga świadomej korekty albo wyjaśnienia przed uznaniem tej wartości za kanoniczną.

Ten konflikt nie wpływa na stos ośmiu funkcji ani wireframe `Type Analysis`.

## 17. Wymagania domenowe dla implementacji

Pierwszy fixture `ISTP` powinien być całkowicie niezależny od danych prawdziwej osoby.

Silnik musi:

- zwrócić osiem unikalnych funkcji w poprawnych pozycjach;
- wyliczyć siedem ring traits dla każdej pozycji;
- wyliczyć siedem block memberships dla każdej pozycji;
- grupować jedną strukturę bez kopiowania rekordów;
- zachować powiązania obserwacji po zmianie widoku;
- odróżnić source text, derived fact i synthesis;
- raportować brak albo konflikt źródeł;
- zwrócić stabilne identyfikatory dla każdej funkcji, pozycji, cechy i grupowania.

Prywatny rekord osoby powinien znajdować się w lokalnej bazie ignorowanej przez Git i zawierać jedynie odwołanie do `typeId: ISTP`.

## 18. Kryteria akceptacji wireframe'u

Wireframe spełnia cel, jeżeli:

- wszystkie osiem funkcji jest widoczne bez utraty kontekstu osoby;
- można przejść między Position grid, Aspects i Dimensions bez opuszczania zakładki;
- użytkowniczka potrafi wyjaśnić, dlaczego Ti ISTP jest jednocześnie Ego, 4D, Lens, Drive, Worldview, Identity i Stance;
- Super-Ego pokazuje razem Ne Blindspot i Fi Demon oraz wyjaśnia wspólne znaczenie;
- każdy opis jest oznaczony jako źródło, wyprowadzenie albo synteza;
- brak przykładów nie wygląda jak potwierdzenie teorii;
- przykład albo pytanie można dodać bez ręcznego ponownego wybierania funkcji;
- prawdziwe dane osoby nie muszą znajdować się w repozytorium;
- wykryte konflikty wiedzy są widoczne zamiast cicho rozstrzygane.

## 19. Najmniejszy następny krok implementacyjny

Nie należy od razu budować wszystkich sześciu zakładek. Pierwszy kodowy przekrój powinien zawierać:

1. statyczny fixture ISTP;
2. nagłówek roboczej hipotezy;
3. siatkę 2 × 4;
4. przełączniki Position grid / Aspects / Dimensions;
5. inspector Ti Leading;
6. deep dive Super-Ego;
7. puste stany real-life;
8. `Pokaż, z czego to wynika` dla Ne Blindspot;
9. testy pełnej macierzy z sekcji 6 i 7.

Po uruchomieniu tego przekroju na desktopie należy ocenić, czy struktura jest czytelna i czy faktycznie pomaga samodzielnie rozumować o typie. Dopiero wtedy warto podłączać parser całego vaultu i lokalny profil prawdziwej osoby.

## 20. Źródła użyte do wireframe'u

Kanoniczne pliki:

- `Types/ISTP.md`;
- `Model/Model Layout.md`;
- `Model/Cognitive Attitudes.md`;
- `Model/Rings.md`;
- `Model/Blocks.md`;
- `Descriptions/Function Manifestation.md`;
- `Groups/Temperament.md` — wyłącznie do wykrycia konfliktu opisanego w sekcji 16.

Wireframe nie korzysta z Drafts, Legacy, Sources ani Archive jako wiedzy kanonicznej.
