# Akasha — kierunek produktu

Status: aktywny kierunek produktu; pierwszy pionowy przekrój działa

Aktualizacja: 2026-07-13

## 1. Cel

Akasha jest osobistym, lokalnym laboratorium socjoniki. Nie przechowuje kontaktów ani nie wydaje automatycznych werdyktów o osobowości. Pomaga zobaczyć pełną strukturę roboczej hipotezy typu, zrozumieć jej konsekwencje i porównać je z konkretnymi sytuacjami z życia.

Podstawowa pętla:

> wybieram osobę → oglądam strukturę hipotezy → badam funkcję lub grupę → zapisuję obserwację → oceniam dopasowanie → zachowuję pytania i sprzeczności

Pierwszą użytkowniczką jest właścicielka notatek socjonicznych. Produkt pozostaje prywatny i local-first, ale architektura powinna później umożliwić przekazanie aplikacji znajomym bez ujawniania prywatnych profili.

## 2. Niezmienne zasady produktu

1. **Jedna osoba jest centrum pracy.** Teoria, obserwacje, relacje i grupy są pokazywane w jej kontekście.
2. **Typ jest hipotezą roboczą.** Zmiana typu nie może usuwać obserwacji ani historii rozumowania.
3. **Teoria, obserwacja i interpretacja są oddzielne.** Model mówi, czego można się spodziewać; obserwacja opisuje zdarzenie; interpretacja tworzy jawne połączenie.
4. **Każdy wniosek powinien być wyjaśnialny.** Użytkowniczka może zobaczyć składniki modelu i źródła prowadzące do opisu.
5. **Sprzeczności są wartościowe.** UI nie ukrywa dowodów niepasujących do teorii ani konfliktów źródeł.
6. **Relacja intertypowa nie ocenia realnej więzi.** Teoretyczne mapowanie i historia konkretnych ludzi pozostają osobnymi warstwami.
7. **Najpierw użyteczna nauka.** Grafy, automatyzacja i rozbudowane wizualizacje pojawiają się dopiero po sprawdzeniu podstawowego workflow.

Przykład wyjaśnienia:

```text
Ti + Leading
→ conscious + strong + valued + rigid
→ Ego + 4D Generalization + Worldview
→ wynikowy opis oznaczony jako źródło, wyprowadzenie albo synteza
```

## 3. Obecny przekrój

| Obszar                                                  | Stan                          |
| ------------------------------------------------------- | ----------------------------- |
| Shell list-detail i profile osób                        | działa                        |
| Robocze typy ISTP i ENFP                                | działa                        |
| Osiem funkcji                                           | działa                        |
| Position grid, Aspects, Dimensions                      | działa                        |
| Overview i deep dive                                    | działa                        |
| Lokalne obserwacje przypięte do funkcji                 | działa                        |
| Sugestie z lokalnego LM Studio z ręcznym potwierdzeniem | działa opcjonalnie            |
| Podstawowe porównanie relacji                           | działa dla fixture'ów         |
| Quadra, Club i Temperament                              | działa w podstawowym zakresie |
| Hipotezy alternatywne, pytania i historia zmian         | planowane                     |
| Pełna wiedza z vaultu, import/eksport i SQLite          | planowane                     |

Obecne dane produktowe są w `localStorage`. Wiedza domenowa jest jeszcze fixture'em w kodzie, a nie indeksem całego vaultu.

## 4. Docelowy workspace

Akasha używa desktopowego układu list-detail:

- lista osób po lewej;
- profil wybranej osoby w głównym obszarze;
- sześć zakładek profilu;
- kontekstowy panel szczegółów dla funkcji, grupy albo wniosku;
- zapamiętany ostatni kontekst i aktywna praca użytkowniczki.

Zakładki:

| Zakładka                       | Odpowiada na pytanie                                        |
| ------------------------------ | ----------------------------------------------------------- |
| Person                         | Kim jest ta osoba w moim realnym życiu?                     |
| Type Analysis                  | Co wynika z bieżącej hipotezy typu?                         |
| Link to Real Life              | Jak teoria pasuje do konkretnych sytuacji?                  |
| Hypothesis & Further Questions | Co wspiera, osłabia lub rozróżnia hipotezy?                 |
| Relationships                  | Jak wygląda teoria dwóch typów i realna relacja dwóch osób? |
| Groups                         | Do jakich podziałów należy osoba i dlaczego?                |

Stan aktywnego formularza nie może znikać przy zwykłym przełączaniu zakładek.

## 5. Type Analysis

To centrum produktu. Z roboczej hipotezy wyprowadza jeden profil ośmiu funkcji, który można grupować bez kopiowania danych.

Widoki podstawowe:

- pozycje modelu;
- Aspects: Ego, Subconscious, Shadow, Super-Ego;
- Dimensions: 4D, 3D, 2D, 1D.

Późniejsze grupowania obejmują Reflections, Axes, Orbits, Spheres, Modes, wartościowanie, siłę, świadomość i pary funkcji.

Każdy widok ma dwa poziomy:

- **Overview** — krótki, skanowalny wniosek;
- **Deep dive** — traits, członkostwa, wyprowadzenie i źródła.

Treść musi określać pochodzenie:

- `source` — bezpośrednio z kuratorowanej notatki;
- `derived` — deterministycznie z definicji modelu;
- `synthesis` — autorskie połączenie wymagające jawnego zatwierdzenia.

Szczegóły fixture'u ISTP i kryteria ekranu znajdują się w [type-analysis-wireframe-istp.md](type-analysis-wireframe-istp.md).

## 6. Link to Real Life

Obserwacja zawiera:

- datę i kontekst;
- neutralny opis zachowania;
- osobną interpretację;
- powiązaną funkcję lub inny element modelu;
- ocenę: pasuje, częściowo pasuje, przeczy albo pozostaje niepewna;
- opcjonalne alternatywne wyjaśnienie i pochodzenie połączenia.

Lokalne AI może zaproponować funkcje na podstawie sytuacji, zachowania i bieżącej struktury typu. Sugestia pozostaje niepewna, nie zmienia typu i staje się powiązaniem dopiero po potwierdzeniu użytkowniczki. Ręczny wybór działa bez LM Studio.

Docelowe filtry: funkcja, blok, kontekst, brak przykładów, sprzeczności, ostatnio dodane i wymagające reinterpretacji. Pokrycie przykładami może być widoczne, ale bez gamifikacji.

## 7. Hipotezy, relacje i grupy

### Hipotezy

Docelowo przechowują typ główny, pewność, alternatywy, argumenty za i przeciw, nierozstrzygnięte obserwacje, dalsze pytania i historię zmian. Akasha może proponować sytuacje rozróżniające hipotezy, ale nie zmienia typu bez decyzji użytkowniczki.

### Relacje

Warstwa teoretyczna zawiera nazwę relacji, symetrię lub kierunek, mapowanie ośmiu funkcji i perspektywy A → B oraz B → A. Warstwa empiryczna przechowuje prawdziwy kontekst relacji, to co działa, tarcia i wspólne obserwacje. Wynik nie jest werdyktem „pasują / nie pasują”.

### Grupy

Każda grupa pokazuje nazwę, członkostwo, regułę, znaczenie, źródło i inne zapisane osoby w tej samej kategorii. Pierwszy zakres to Quadra, Club i Temperament; później dochodzą pozostałe kuratorowane podziały.

## 8. Źródła wiedzy

Docelowym źródłem jest wskazany przez użytkowniczkę lokalny folder notatek socjonicznych. Aplikacja nie powinna zależeć od jednej absolutnej ścieżki.

Kanoniczne obszary: `Foundation`, `Functions`, `Types`, `Groups`, `Model`, `Descriptions`, `Contexts` i główne mapy treści. `Drafts`, `_Legacy Main`, `_Sources` oraz `_Archive` są materiałem pomocniczym i nie mogą być cicho przedstawiane jako kanoniczne.

Warstwa wiedzy ma:

- czytać Markdown bez automatycznego nadpisywania;
- rozpoznawać frontmatter, nagłówki, tabele i wikilinki;
- przechowywać źródło, sekcję, wersję i status kanoniczności;
- raportować braki i konflikty;
- odświeżać dane pochodne bez utraty prywatnych obserwacji.

Przenośność zapewni wspólny interfejs:

- `VaultKnowledgeProvider` — żywy folder właścicielki;
- `PackKnowledgeProvider` — wersjonowana paczka bez prywatnych profili.

## 9. Model danych i granice

| Warstwa       | Główne encje                                                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wiedza        | `KnowledgeConcept`, `KnowledgeSource`, `TypeDefinition`, `InformationElement`, `FunctionPosition`, `TraitDefinition`, `BlockDefinition`, `TypeGroupDefinition`, `IntertypeRelationDefinition` |
| Prywatne dane | `Person`, `TypeHypothesis`, `HypothesisRevision`, `FurtherQuestion`, `Observation`, `EvidenceLink`, `PersonConnection`, `RelationshipObservation`, `WorkspaceSettings`                        |
| Dane pochodne | `DerivedTypeProfile`, `DerivedBlockAnalysis`, `DerivedGroupMembership`, `DerivedIntertypeAnalysis`                                                                                            |

Reguły granic:

- komponenty React nie czytają bezpośrednio plików ani bazy;
- reguły socjoniczne należą do silnika domenowego;
- prywatne rekordy odwołują się do stabilnych identyfikatorów pojęć, nie kopiują opisów;
- Tauri, system plików, sieć i baza pozostają poza UI;
- dane pochodne są przeliczane, nie ręcznie duplikowane;
- stan aktywnego widoku pozostaje lokalny, a dane produktowe są utrwalane.

Przed wzrostem liczby encji `localStorage` powinien zostać zastąpiony przez SQLite z wersjonowanymi migracjami oraz formatem eksportu/importu.

## 10. Roadmapa

1. **Domknąć pierwszy loop:** stabilne profile, Type Analysis, evidence, relacja, grupy i zachowanie kontekstu.
2. **Hipotezy:** alternatywne typy, argumenty, pytania i historia zmian.
3. **Wiedza:** parser vaultu, źródła, konflikty i pochodzenie wniosków.
4. **Persistence:** SQLite, migracje, wersjonowany eksport i import.
5. **Pełne relacje i grupy:** macierz typów, kierunki relacji i kolejne podziały.
6. **Przenośność:** paczka wiedzy dla innej osoby bez prywatnych danych.
7. **Rozszerzenia:** porównania wielu profili i grafy dopiero po zebraniu wystarczających danych.

Najbliższy wartościowy milestone to pełna sesja na dwóch profilach: przejście od funkcji do konkretnej obserwacji, zapisanie sprzeczności lub pytania i porównanie dwóch osób bez utraty kontekstu.

## 11. Weryfikacja sukcesu

Reguły domenowe muszą gwarantować osiem unikalnych funkcji, poprawne grupowania bez duplikacji, symetrię lub kierunek relacji oraz zachowanie obserwacji po zmianie hipotezy.

Workflow jest użyteczny, gdy użytkowniczka może:

- zrozumieć strukturę bez otwierania wielu notatek;
- prześledzić skrótowy wniosek do reguły i źródła;
- dodać pasujący lub sprzeczny przykład bez ponownego wybierania kontekstu;
- zmienić hipotezę bez utraty pracy;
- porównać dwie osoby strukturalnie i empirycznie;
- obsłużyć aplikację przy pustym, częściowym i bogatym profilu oraz przy kompaktowej szerokości okna.

Akasha odnosi sukces, jeśli wspiera regularne samodzielne myślenie zamiast automatycznego typowania ludzi.
