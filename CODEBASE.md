# Codebase map

Akasha is one desktop application with a React frontend and a small Tauri/Rust native boundary.

## Top-level structure

| Path                      | Responsibility                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `src/`                    | React interface, feature state, domain logic, and browser-side persistence adapters.       |
| `src/features/socionics/` | Type model, profiles, observations, relationships, groups, and LM Studio frontend adapter. |
| `src/features/friends/`   | Local friend-profile feature and its versioned storage format.                             |
| `src/features/tasks/`     | Local task model and versioned storage format.                                             |
| `src-tauri/`              | Tauri configuration, native commands, permissions, Rust dependencies, and platform icons.  |
| `tests/`                  | Node-based domain and storage tests using TypeScript source directly.                      |
| `docs/`                   | Product, interaction, visual-language, and brand references.                               |
| `app/`                    | Documentation and ignored local Windows artifacts.                                         |

## Runtime boundaries

`src/App.tsx` mounts `SocionicsWorkspace`, which owns the main workspace state and composes the feature views. Socionics derivation belongs in `socionicsModel.ts`; React components consume those results instead of reimplementing the rules.

Profiles, observations, friend profiles, task records, and current selections use small versioned adapters around WebView `localStorage`. Invalid stored records fail closed or are filtered out. Storage keys and record versions are compatibility contracts and should not be changed without an explicit migration.

The only native network integration is LM Studio:

1. `src/features/socionics/lmStudio.ts` validates inputs and calls Tauri with `invoke`.
2. `src-tauri/src/lib.rs` sends HTTP requests to LM Studio on `127.0.0.1:1234`.
3. The frontend parses and validates the structured response.
4. The user must confirm a suggestion before it is saved as evidence.

The Tauri capability grants only `core:default`; no filesystem, shell, clipboard, or broad network plugin permission is configured.

## Important contracts

- Canonical type IDs use uppercase MBTI-form names while the domain model owns the socionics mapping.
- Type changes preserve a person's ID and observations but reset confidence to `Working`.
- Theory, observation, interpretation, and AI provenance remain separate fields.
- Private user content stays outside the repository and is never suitable for fixtures or screenshots.
- LM Studio output is untrusted input and must pass the frontend parser before display or storage.

## Verification map

| Change                                       | Minimum verification                                              |
| -------------------------------------------- | ----------------------------------------------------------------- |
| React, TypeScript, styles, or domain logic   | `npm run check`                                                   |
| Rust, Tauri configuration, or Cargo metadata | `cargo check --manifest-path src-tauri\Cargo.toml`                |
| Local storage behavior                       | Automated storage tests plus the real Tauri window                |
| LM Studio integration                        | Parser tests plus a real loaded local model when behavior changes |
| Icons or packaged output                     | Fresh Cargo target, Tauri build, and launch of the exact artifact |
