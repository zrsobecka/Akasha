# Architecture

Akasha is one local-first desktop application: a React frontend owns the learning workflows, while a small Tauri/Rust boundary provides native integration. Theory, observations, interpretations, and AI provenance remain separate layers.

## Canonical structure

This is the intended ownership map. Conceptual directories need not exist until they have an owner or content.

```text
Akasha/
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/                 # entry point and shell
│       ├── features/            # people, type analysis, observations, relationships
│       ├── domain/              # person, observation, socionics
│       ├── infrastructure/
│       │   ├── persistence/local-storage/
│       │   └── integrations/lm-studio/
│       ├── shared/ui/
│       ├── assets/
│       └── styles/
│
├── src-tauri/
│   └── src/
│       └── infrastructure/integrations/
├── ai/                          # project knowledge by owner
└── app/                         # packaged artifacts and release notes
```

React code belongs in `frontend/src`, static assets in `frontend/public`; Vite uses `frontend` as its root and Tauri consumes `frontend/dist`. Do not move active files back to root `src/` or `public/`; root `src/features/tasks` and `src/features/friends` are excluded legacy prototypes.

## Boundaries and dependencies

| Layer             | Owns                                                        | Dependency rule                                                                                                   |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `app/`            | application entry point and shell composition               | May compose features; contains no product rules or persistence.                                                   |
| `features/`       | user workflows and feature-specific UI/state                | May use domain concepts and infrastructure adapters. Must not call browser storage, Tauri, or LM Studio directly. |
| `domain/`         | person, observation, and socionics concepts and derivations | Must remain independent of React, browser APIs, and Tauri.                                                        |
| `infrastructure/` | local persistence, LM Studio, and desktop-runtime adapters  | Implements platform access and may translate domain data at the boundary.                                         |
| `shared/ui/`      | reusable presentation primitives with no product ownership  | Must not become a miscellaneous home for feature logic.                                                           |

Storage keys and record versions are compatibility contracts; invalid records fail closed or are filtered out. Profiles and observations stay in local application storage.

## Feature ownership

The former `features/socionics` responsibilities are divided as follows:

| Responsibility                        | Owner                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Profiles and person selection         | `features/people`                                                                 |
| `TypeAnalysisView` and derived groups | `features/type-analysis`                                                          |
| `RealLifeView` and saved evidence     | `features/observations`                                                           |
| `RelationshipView`                    | `features/relationships`                                                          |
| `socionicsModel.ts`                   | `domain/socionics`                                                                |
| `personStorage.ts`                    | people persistence repository in `infrastructure/persistence/local-storage`       |
| `observationStorage.ts`               | observations persistence repository in `infrastructure/persistence/local-storage` |
| LM Studio frontend adapter            | `infrastructure/integrations/lm-studio`                                           |
| LM Studio native adapter              | `src-tauri/src/infrastructure/integrations`                                       |

Document feature behavior in `ai/features/`, domain rules in `ai/product/SOCIONICS-MODEL.md`, and integration details in `ai/integrations/`.

## Runtime boundaries

`frontend/src/main.tsx` mounts `app/App.tsx`; `AppShell` composes `PeopleWorkspace`, which coordinates person-centered views. Local repositories adapt versioned WebView `localStorage` records. The optional AI path is:

1. the observations feature calls the frontend LM Studio adapter;
2. the adapter invokes one of the commands registered in `src-tauri/src/lib.rs`;
3. the Rust adapter talks to LM Studio on `127.0.0.1:1234`;
4. the frontend validates the returned suggestion;
5. the user decides whether to save it as evidence.

See [the data and AI workflow](../../WORKFLOW-DIAGRAM.md) for trust boundaries.

## Known structural debt

`RealLifeView` currently persists the selected LM Studio model through `window.localStorage` directly. Move that access behind an infrastructure adapter when this flow is next changed; do not copy the exception into other features.

Native `features/evidence-suggestions` and frontend `desktop-runtime.ts` are target boundaries, not current files. Add them only when orchestration justifies them.
