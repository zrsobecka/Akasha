# Akasha — plan aplikacji do nauki socjoniki przez prawdziwe osoby

Status: kierunek produktu zaakceptowany do dalszego projektowania  
Data: 2026-07-13

## 1. Wizja

Akasha ma być osobistym, lokalnym laboratorium socjoniki. Jej głównym zadaniem nie jest przechowywanie kontaktów ani automatyczne zgadywanie typów osobowości. Ma pomagać rozłożyć jedną prawdziwą osobę na pełny model socjoniczny, zobaczyć wszystkie jej funkcje i ich grupowania, zrozumieć, co z tej struktury wynika, a następnie połączyć teorię z obserwacjami z życia.

Podstawowa pętla produktu:

> wybieram osobę → oglądam kompletną strukturę jej typu → grupuję funkcje na różne sposoby → czytam, co wynika z tych kombinacji → łączę wnioski z realnymi sytuacjami → zapisuję wątpliwości i dalsze pytania

Akasha ma być czymś, do czego warto wracać codziennie, aby samodzielnie rozmyślać o ludziach i jednocześnie uczyć się modelu.

## 2. Dla kogo i w jakim zakresie

Pierwszą użytkowniczką jest właścicielka obecnych notatek socjonicznych. Aplikacja powstaje najpierw jako narzędzie osobiste, ale jej dane i architektura mają pozwolić później przekazać ją znajomym.

Decyzje zakresowe:

- aplikacja jest local-first i prywatna;
- na tym etapie nie jest projektowana jako produkt na sprzedaż;
- nie wymaga konta, chmury ani współdzielenia na żywo;
- wiedza socjoniczna pochodzi bezpośrednio z `Dropbox/zuziczek learning/socionics`;
- profile osób i prywatne obserwacje są przechowywane oddzielnie od wiedzy teoretycznej;
- aplikacja ma umożliwić późniejszy eksport i import danych;
- znajomy powinien móc korzystać z wersjonowanej paczki wiedzy bez dostępu do prywatnych profili właścicielki;
- typ osoby jest hipotezą roboczą, a nie niezmiennym faktem.

## 3. Zasady produktu

### 3.1. Jedna osoba jest centrum pracy

Głównym kontekstem aplikacji jest aktualnie wybrana osoba. Teoria, obserwacje, relacje i grupy są pokazywane w odniesieniu do niej.

### 3.2. Pełna struktura przed skrótem

Aplikacja może pokazywać krótkie overview, ale musi umożliwiać przejście do pełnej struktury: wszystkich ośmiu funkcji, pozycji, cech, bloków, pierścieni i grupowań opisanych w notatkach.

### 3.3. Każdy wniosek powinien być wyjaśnialny

Przy wynikowym opisie użytkowniczka powinna móc wybrać `Pokaż, z czego to wynika` i zobaczyć jego drogę przez model, na przykład:

```text
Ti + Leading
→ conscious + strong + valued + rigid
→ Ego + 4D Generalization + Worldview
→ wynikowy opis
```

### 3.4. Teoria, obserwacja i interpretacja są oddzielne

- **Teoria** opisuje, czego model pozwala się spodziewać.
- **Obserwacja** zapisuje konkretne zdarzenie lub zachowanie.
- **Interpretacja** łączy obserwację z funkcją, pozycją, blokiem, cechą albo typem.

Te trzy warstwy nie mogą być zlane w jedną notatkę. Chroni to przed traktowaniem pierwszej hipotezy jako potwierdzonego faktu.

### 3.5. Relacja intertypowa nie jest oceną relacji ludzi

Teoretyczne mapowanie funkcji dwóch typów należy oddzielić od prawdziwej więzi, historii i jakości kontaktu między konkretnymi osobami.

### 3.6. Najpierw użyteczna nauka, potem efektowne wizualizacje

Pierwsza wersja ma dostarczyć głęboki profil jednej osoby oraz połączenie teorii z przykładami. Złożone grafy wielu osób nie są warunkiem pierwszej wartościowej wersji.

## 4. Główny układ aplikacji

Aplikacja korzysta z układu list-detail odpowiedniego dla desktopowego narzędzia do regularnego przeglądania wiedzy:

- stała lista osób po lewej;
- profil wybranej osoby w głównym obszarze;
- sześć zakładek profilu;
- opcjonalny panel szczegółów po prawej po kliknięciu funkcji, grupy albo wniosku;
- szybkie wyszukiwanie osoby i wiedzy;
- zapamiętywanie ostatnio otwartej osoby i zakładki.

Po uruchomieniu Akasha wraca do ostatniego kontekstu, zamiast otwierać ogólny dashboard.

Zakładki profilu:

1. `Person`
2. `Type Analysis`
3. `Link to Real Life`
4. `Hypothesis & Further Questions`
5. `Relationships`
6. `Groups`

## 5. Zakładka Person

Lekki, ludzki overview osoby. Ma ułatwiać szybkie przypomnienie kontekstu, ale nie zastępuje pełnej analizy.

Zawartość:

- imię lub pseudonim;
- relacja z użytkowniczką;
- obecny roboczy typ i poziom pewności;
- krótkie pole `Jak rozumiem tę osobę`;
- najważniejsze potrzeby;
- preferowany sposób komunikacji;
- co ją motywuje;
- co może ją przeciążać;
- ostatnie obserwacje;
- skrót najważniejszych wniosków z analizy;
- skróty prowadzące do obszarów wymagających dalszego namysłu.

Ta zakładka ma odpowiadać na pytanie: `Kim jest ta osoba w moim realnym życiu i co jest dziś najważniejsze do zapamiętania?`

## 6. Zakładka Type Analysis — centrum produktu

`Type Analysis` jest najbogatszą i najważniejszą częścią Akashy. Przyjmuje roboczą hipotezę typu i wyprowadza z niej pełny profil modelowy. Nie ocenia, czy hipoteza jest poprawna — tym zajmuje się osobna zakładka.

### 6.1. Siatka ośmiu funkcji

Na początku zakładki znajduje się siatka 2 × 4 zgodna z `Model/Model Layout.md`:

```text
Leading     Creative     Activating     Anima
Ignoring    Background   Blindspot      Demon
```

Każda karta funkcji pokazuje co najmniej:

- element, np. `Ti`;
- pozycję, np. `Leading`;
- nazwę i notację z modelu;
- awareness: conscious albo unconscious;
- capacity: strong albo weak oraz wymiar;
- receptivity: accepting albo producing;
- preference: valued albo subdued;
- rigidity: rigid albo flexible;
- scope: universal albo situational;
- boldness: bold albo cautious;
- krótki opis działania elementu w tej pozycji;
- najważniejsze konsekwencje dla osoby;
- liczbę powiązanych przykładów z życia.

Kliknięcie karty otwiera pełny panel szczegółów z opisem elementu, pozycji, wynikowych cech i połączonych obserwacji.

### 6.2. Przełączniki grupowania funkcji

Te same osiem funkcji musi dać się oglądać przez różne struktury opisane w notatkach:

- **Position grid** — osiem pozycji modelu;
- **Aspects** — Ego, Super-Ego, Subconscious i Shadow;
- **Dimensions** — 4D, 3D, 2D i 1D;
- **Reflections** — Lens, Resonance, Projection i Expression;
- **Axes** — Drive, Method, Drift i Friction;
- **Orbits** — Worldview, Template, Impression i Impact;
- **Spheres** — Identity, Filter, Exchange i Avoidance;
- **Modes** — Stance, Sync, Regulation i Navigation;
- **Function pairs** — pary, osie, odbicia, procesy, grupowania o wspólnych dychotomiach i antipodes;
- **Valued / Subdued**;
- **Strong / Weak**;
- **Conscious / Unconscious**.

Przełącznik nie tworzy osobnej kopii danych. Zmienia sposób grupowania jednej wyliczonej struktury typu.

### 6.3. Analiza bloków

Po wybraniu `Aspects` aplikacja pokazuje cztery wyraźne sekcje:

- **Ego:** Leading + Creative;
- **Subconscious:** Activating + Anima;
- **Shadow:** Ignoring + Background;
- **Super-Ego:** Blindspot + Demon.

Każda sekcja odpowiada na trzy pytania:

1. Które funkcje zawiera?
2. Jak te funkcje i ich pozycje działają razem?
3. Co z tej kombinacji wynika dla sposobu funkcjonowania osoby?

Ten sam wzorzec prezentacji dotyczy Dimensions, Reflections, Axes, Orbits, Spheres i Modes.

### 6.4. Dwa poziomy głębokości

Każdy fragment analizy ma dwa poziomy:

- **Overview** — krótkie, skanowalne wnioski;
- **Deep dive** — pełne wyprowadzenie z elementów, pozycji, rings, blocks, cech i źródeł.

Interfejs nie powinien od razu pokazywać wszystkich opisów w formie jednej ściany tekstu.

### 6.5. Pochodzenie wniosków

Przy każdym wynikowym opisie aplikacja pokazuje:

- czy treść pochodzi bezpośrednio z notatki;
- czy została złożona deterministycznie z kilku definicji;
- z jakich plików i sekcji pochodzi;
- jakie składniki modelu doprowadziły do wniosku.

Treść automatycznie wygenerowana w przyszłości nie może udawać cytatu z notatek.

## 7. Zakładka Link to Real Life

Ta zakładka zakotwicza teorię w doświadczeniu. Nie jest zwykłym chronologicznym dziennikiem. Pokazuje strukturę typu i umożliwia przypinanie przykładów do konkretnych elementów modelu.

Przykładowy wpis:

```text
Obszar: Ti Leading
Przewidywanie modelu: osoba próbuje sprowadzać złożoność do spójnych zasad.
Obserwacja: podczas rozmowy o projekcie najpierw uporządkowała wszystkie definicje.
Ocena: pasuje / częściowo pasuje / nie pasuje / jeszcze nie wiem.
Alternatywne wyjaśnienie: zachowanie mogło wynikać z doświadczenia zawodowego.
```

Każda obserwacja zawiera:

- datę;
- sytuację lub kontekst;
- neutralny opis tego, co się wydarzyło;
- osobną interpretację;
- powiązane elementy, funkcje, pozycje, bloki, cechy lub grupy;
- ocenę dopasowania;
- siłę dowodu;
- opcjonalne alternatywne wyjaśnienie;
- informację, które hipotezy wspiera albo osłabia.

Widoki i filtry:

- według funkcji;
- według bloków;
- według kontekstu;
- tylko obszary bez realnych przykładów;
- tylko obserwacje sprzeczne z teorią;
- ostatnio dodane;
- obserwacje wymagające ponownej interpretacji.

Akasha może pokazywać pokrycie analizy przykładami, ale bez punktów i zbędnej gamifikacji.

## 8. Zakładka Hypothesis & Further Questions

Typowanie jest procesem odrębnym od oglądania konsekwencji wybranego typu.

Zawartość:

- aktualna hipoteza typu;
- poziom pewności;
- alternatywne typy;
- argumenty za;
- argumenty przeciw;
- obserwacje nierozstrzygnięte;
- funkcje lub dychotomie wymagające dalszego sprawdzenia;
- konkretne dalsze pytania;
- historia zmian hipotezy z datą i powodem;
- sugestie, jakie sytuacje mogłyby rozróżnić konkurencyjne hipotezy.

Przykład pytania:

> Nie jest jasne, czy Ne jest Leading, czy Creative. Warto sprawdzić, czy osoba spontanicznie otwiera możliwości jako główny sposób patrzenia, czy używa ich do realizacji innego dominującego procesu.

Aplikacja może pomagać formułować pytania, ale nie zmienia typu bez świadomej decyzji użytkowniczki.

## 9. Zakładka Relationships

Ta zakładka porównuje aktualnie wybraną osobę z drugą osobą.

### 9.1. Analiza teoretyczna

- wybór drugiej osoby;
- nazwa i rodzina relacji intertypowej;
- informacja, czy relacja jest symetryczna czy asymetryczna;
- wyraźny kierunek dla Benefit i Supervision;
- mapowanie wszystkich ośmiu funkcji;
- mapowanie Ego jednej osoby na bloki drugiej;
- funkcje, które się wzmacniają;
- funkcje trafiające w cenione potrzeby;
- funkcje mocne, ale ignorowane;
- miejsca potencjalnego tarcia;
- osobne perspektywy A → B oraz B → A;
- wyjaśnienie strukturalne zgodne z `Types/Intertype Relations.md`.

### 9.2. Relacja w prawdziwym życiu

- rodzaj rzeczywistej relacji, np. znajomy, partner, współpracownik;
- co faktycznie działa;
- realne sytuacje tarcia;
- wspólne obserwacje;
- zgodność między teorią a doświadczeniem;
- rozbieżności wymagające dalszej refleksji.

Teoretyczny wynik nie może być przedstawiany jako werdykt `pasują` albo `nie pasują`.

## 10. Zakładka Groups

Zakładka pokazuje osobę przez wszystkie dostępne podziały socjoniczne i łączy ją z innymi zapisanymi osobami.

### 10.1. Grupy jednej osoby

Docelowo:

- Quadra;
- Club;
- Temperament;
- Communication Style;
- Interaction Style;
- Roles;
- Romance Style;
- Square;
- Social Control;
- Bouquet;
- Health;
- kolejne grupy obecne w kuratorowanych notatkach.

Każda karta grupy pokazuje:

- nazwę grupy i członkostwo osoby;
- jakie funkcje, wartości lub dychotomie o nim decydują;
- co dana grupa opisuje;
- co wynika z członkostwa;
- innych zapisanych ludzi należących do tej samej grupy;
- realne przykłady wspólnego wzorca;
- odnośnik do źródłowej wiedzy.

### 10.2. Widok wielu osób

Po otwarciu podziału, np. Quadra, aplikacja pokazuje zapisane osoby rozłożone pomiędzy grupami. Ten widok służy porównywaniu i uczeniu się na przykładach, a nie ocenianiu ludzi.

## 11. Codzienny workflow

Przykładowa sesja:

1. Akasha otwiera ostatnio oglądaną osobę i zakładkę.
2. Użytkowniczka przechodzi do `Type Analysis` i wybiera grupowanie `Aspects`.
3. Otwiera Super-Ego i czyta wynikowy opis Blindspot + Demon.
4. Wybiera `Pokaż, z czego to wynika`, aby zobaczyć konstrukcję wniosku.
5. Przechodzi do `Link to Real Life` i dodaje pasującą albo sprzeczną sytuację.
6. Jeśli pojawia się wątpliwość, dodaje pytanie w `Hypothesis & Further Questions`.
7. Opcjonalnie porównuje osobę z kimś innym w `Relationships` albo sprawdza jej grupy.

Sukces produktu oznacza, że taka sesja jest możliwa bez przełączania się między wieloma notatkami i ręcznego odtwarzania całego modelu.

## 12. Wiedza socjoniczna jako źródło prawdy

### 12.1. Zakres źródeł

Podstawowym źródłem jest `Dropbox/zuziczek learning/socionics`.

Domyślnie aplikacja korzysta z kuratorowanych obszarów:

- `Foundation`;
- `Functions`;
- `Types`;
- `Groups`;
- `Model`;
- `Descriptions`;
- `Contexts`;
- głównych map treści.

`Drafts`, `_Legacy Main`, `_Sources` i `_Archive` nie są automatycznie traktowane jako wiedza kanoniczna. Mogą być dostępne jako materiały pomocnicze, ale muszą być wyraźnie oznaczone.

Zgodnie z `Socionics Home.md`, pliki Foundation są autorytatywne według stanu opisanego w notatce.

### 12.2. Odczyt i synchronizacja

- aplikacja czyta notatki bez ich automatycznego nadpisywania;
- rozpoznaje YAML frontmatter, nagłówki, tabele i wikilinki;
- indeksuje pojęcia oraz powiązania pomiędzy nimi;
- przechowuje ścieżkę źródłową i identyfikator wersji treści;
- wykrywa brakujące albo sprzeczne definicje;
- po zmianie notatek odświeża wyprowadzone analizy bez utraty prywatnych obserwacji.

### 12.3. Przenośność

Warstwa wiedzy korzysta ze wspólnego interfejsu `KnowledgeProvider`:

- `VaultKnowledgeProvider` czyta żywy folder notatek właścicielki;
- `PackKnowledgeProvider` czyta wersjonowaną paczkę przeznaczoną do przekazania innej osobie.

Dzięki temu aplikacja nie zależy na stałe od jednej absolutnej ścieżki, a prywatne dane nie muszą znaleźć się w paczce wiedzy.

## 13. Model danych

### 13.1. Wiedza i definicje

- `KnowledgeConcept` — pojęcie, jego treść, rodzaj i źródło;
- `KnowledgeSource` — plik, sekcja, wersja i status kanoniczności;
- `TypeDefinition` — definicja jednego z szesnastu typów;
- `InformationElement` — Ti, Te, Fi, Fe, Si, Se, Ni albo Ne;
- `FunctionPosition` — jedna z ośmiu pozycji;
- `TraitDefinition` — wartość ring albo innej cechy;
- `BlockDefinition` — definicja grupowania pozycji;
- `TypeGroupDefinition` — definicja grupy i reguły członkostwa;
- `IntertypeRelationDefinition` — relacja i reguła mapowania stosów.

### 13.2. Prywatne dane użytkowniczki

- `Person` — tożsamość, kontekst i podstawowe notatki;
- `TypeHypothesis` — typ, pewność, alternatywy i status;
- `HypothesisRevision` — historia zmiany typu wraz z uzasadnieniem;
- `FurtherQuestion` — pytanie lub obszar do obserwacji;
- `Observation` — konkretna sytuacja z życia;
- `EvidenceLink` — połączenie obserwacji z pojęciem modelu lub hipotezą;
- `PersonConnection` — prawdziwy kontekst relacji dwóch osób;
- `RelationshipObservation` — obserwacja dotycząca konkretnej pary;
- `WorkspaceSettings` — wybrana ścieżka wiedzy, ostatni kontekst i preferencje.

### 13.3. Dane wyliczane

- `DerivedTypeProfile` — pełny stos funkcji i wszystkie cechy wynikające z typu;
- `DerivedBlockAnalysis` — funkcje pogrupowane według wybranego bloku;
- `DerivedGroupMembership` — członkostwo osoby w grupach;
- `DerivedIntertypeAnalysis` — teoretyczne mapowanie dwóch typów.

Dane wyliczane nie są ręcznie duplikowane w profilach. Powstają z definicji wiedzy i bieżącej hipotezy typu.

## 14. Architektura aplikacji

### 14.1. Główne moduły

- `people` — profile osób i podstawowy overview;
- `type-analysis` — wyprowadzanie i prezentacja pełnego profilu typu;
- `real-life` — obserwacje i ich powiązania z modelem;
- `hypotheses` — hipotezy, dowody, historia i dalsze pytania;
- `relationships` — porównanie dwóch osób i mapowanie relacji;
- `groups` — członkostwo i widoki wielu osób;
- `knowledge` — indeksowanie, wyszukiwanie i źródła notatek;
- `workspace` — persistence, import, eksport i ustawienia lokalne.

### 14.2. Reguły zależności

- UI nie czyta bezpośrednio plików ani bazy;
- `knowledge` udostępnia definicje przez stabilny interfejs;
- silnik domenowy wyprowadza funkcje, bloki, grupy i relacje;
- moduły profilu korzystają z wyników silnika, ale nie duplikują reguł socjonicznych;
- prywatne dane zależą od identyfikatorów pojęć, a nie od skopiowanych opisów;
- infrastruktura Tauri, system plików i baza pozostają poza komponentami React;
- stan tymczasowy widoku jest lokalny, a dane produktowe są utrwalane;
- zmiana hipotezy powoduje ponowne wyliczenie profilu, nie utratę obserwacji.

### 14.3. Przepływ danych

```text
notatki Markdown
→ KnowledgeProvider
→ indeks i zwalidowane definicje
→ silnik domenowy
→ wyliczony profil / relacja / grupy
→ model widoku
→ interfejs

obserwacja użytkowniczki
→ walidowana komenda
→ lokalne persistence
→ odświeżony profil osoby
→ interfejs
```

### 14.4. Persistence

Obecny prototyp korzysta z `localStorage`. Przed rozbudowaniem danych należy przejść do lokalnej bazy odpowiedniej dla Tauri, rekomendacyjnie SQLite.

Powody:

- wiele połączonych encji;
- historia zmian;
- wyszukiwanie i filtrowanie obserwacji;
- bezpieczne migracje schematu;
- niezawodny eksport i import;
- możliwość rozwoju bez jednego dużego pliku JSON.

Eksport ma używać wersjonowanego formatu, aby przyszłe wersje aplikacji mogły migrować starsze dane.

## 15. Najmniejsza użyteczna wersja

Pierwszy kompletny milestone powinien zawierać:

1. profil jednej lub wielu osób;
2. sześć zakładek profilu w docelowym układzie;
3. wybór roboczej hipotezy typu;
4. pełne wyliczenie ośmiu funkcji;
5. siatkę 2 × 4;
6. grupowania Position grid, Aspects i Dimensions;
7. krótkie wnioski oraz `Pokaż, z czego to wynika`;
8. przypinanie realnych przykładów do funkcji i bloków;
9. hipotezę, alternatywne typy i dalsze pytania;
10. podstawowe porównanie dwóch osób;
11. grupy Quadra, Club i Temperament;
12. lokalne zapisanie danych;
13. podstawowy eksport i import workspace'u.

Milestone jest gotowy, gdy można przeprowadzić pełną codzienną sesję opisaną w sekcji 11 na dwóch prawdziwych profilach.

## 16. Kolejność wdrożenia

### Etap 0 — specyfikacja modelu

- spisać stabilne identyfikatory wszystkich elementów, pozycji, cech i bloków;
- zmapować szesnaście stosów funkcji;
- zmapować reguły grup i relacji;
- ustalić priorytet źródeł przy sprzecznościach;
- przygotować przykładowy kompletny profil jednego typu jako fixture.

### Etap 1 — pionowy przekrój Type Analysis

- wybrać jeden typ;
- wyprowadzić jego osiem funkcji;
- pokazać siatkę 2 × 4;
- dodać Aspects i Dimensions;
- dodać overview i deep dive;
- dodać pochodzenie każdego wniosku.

Ten etap sprawdza najważniejsze założenie produktu przed budowaniem pozostałych funkcji.

### Etap 2 — profile i realne przykłady

- nowy shell skoncentrowany na osobach;
- Person;
- Link to Real Life;
- lokalne persistence;
- filtry przykładów i sprzeczności.

### Etap 3 — hipotezy

- typ główny, alternatywy i pewność;
- argumenty za i przeciw;
- dalsze pytania;
- historia zmian;
- bezpieczne przeliczanie profilu po zmianie typu.

### Etap 4 — relacje

- testowana macierz relacji wszystkich par typów;
- mapowanie funkcji A → B oraz B → A;
- oddzielenie teorii od obserwacji pary;
- kierunkowe relacje asymetryczne.

### Etap 5 — grupy

- wszystkie grupy jednej osoby;
- wyjaśnienie reguły członkostwa;
- widok wielu zapisanych osób;
- kolejne grupowania zgodnie z notatkami.

### Etap 6 — przenośność i rozszerzenia

- wersjonowany eksport i import;
- paczka wiedzy dla innej osoby;
- dodatkowe grupowania funkcji;
- bardziej rozbudowane porównania wielu osób;
- wizualny graf relacji dopiero po zebraniu wystarczającej liczby profili.

## 17. Weryfikacja i testy

### 17.1. Reguły domenowe

- każdy z 16 typów ma dokładnie 8 unikalnych elementów w poprawnych pozycjach;
- wszystkie cechy pozycji zgadzają się z Model Layout;
- każde grupowanie obejmuje właściwe funkcje bez zgubienia lub duplikacji;
- każda osoba trafia do dokładnie właściwej grupy w danym podziale;
- wszystkie pary typów zwracają poprawną relację;
- relacje asymetryczne zachowują prawidłowy kierunek;
- zmiana hipotezy przelicza dane pochodne i zachowuje obserwacje.

### 17.2. Źródła wiedzy

- parser poprawnie obsługuje frontmatter, nagłówki, tabele i wikilinki;
- brakująca notatka nie powoduje utraty prywatnych danych;
- treść z Drafts albo Archive nie jest przedstawiana jako kanoniczna;
- użytkowniczka widzi źródło wyświetlanego wniosku;
- aktualizacja notatki odświeża analizę w przewidywalny sposób.

### 17.3. Workflow użytkowniczki

- szybkie otwarcie ostatniej osoby;
- przejście od funkcji do bloku bez utraty kontekstu;
- dodanie obserwacji z ekranu analizy;
- znalezienie obszarów bez przykładów;
- dodanie pytania z poziomu sprzecznej obserwacji;
- porównanie dwóch osób w obu kierunkach;
- użyteczność przy pustym, częściowym i bardzo bogatym profilu;
- obsługa klawiatury i różnych szerokości okna.

## 18. Kryteria sukcesu

Pierwsza wersja rozwiązuje właściwy problem, jeżeli:

- użytkowniczka potrafi zrozumieć pełny układ funkcji osoby bez ręcznego otwierania wielu notatek;
- każdy skrótowy wniosek można prześledzić do struktury i źródła;
- teoria daje się łatwo połączyć z konkretną sytuacją z życia;
- sprzeczne przykłady są widoczne, a nie ukrywane;
- hipoteza typu może się zmienić bez utraty pracy;
- profile dwóch osób dają się porównać strukturalnie i empirycznie;
- aplikacja wspiera regularne samodzielne myślenie zamiast wydawania automatycznych werdyktów.

## 19. Kierunki późniejsze

Po zweryfikowaniu podstawowego workflow można rozważyć:

- aktywne podpowiadanie, jaka obserwacja najlepiej rozróżni dwie hipotezy;
- wykrywanie, że dowody pochodzą tylko z jednego kontekstu;
- zestawianie podobnych manifestacji tej samej funkcji u kilku osób;
- wskazywanie rozbieżności między teorią a realnymi przykładami;
- prywatny atlas manifestacji funkcji budowany z wielu profili;
- AI wspierające klasyfikację istniejących obserwacji, zawsze z widoczną niepewnością i możliwością ręcznej korekty.

AI nie jest częścią pierwszego milestone'u. Najpierw trzeba zebrać uporządkowane przykłady i sprawdzić, które czynności rzeczywiście warto automatyzować.

## 20. Następny konkretny krok

Przed przebudową kodu należy przygotować szczegółowy wireframe `Type Analysis` na jednym prawdziwym typie. Wireframe powinien pokazać:

- siatkę ośmiu funkcji;
- przełączenie Position grid / Aspects / Dimensions;
- kartę jednej funkcji;
- analizę jednego bloku, najlepiej Super-Ego;
- poziomy Overview i Deep dive;
- `Pokaż, z czego to wynika`;
- przejście do powiązanych przykładów z życia.

Ten ekran jest testem całej koncepcji Akashy. Jeśli okaże się czytelny i użyteczny na prawdziwej osobie, kolejne zakładki mogą być budowane wokół niego bez zgadywania.
