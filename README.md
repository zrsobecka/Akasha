# Akasha

Akasha is a local-first desktop application for learning socionics through observations of real people. It helps a learner keep theory, observed behavior, and interpretation separate while treating every type assignment as a working hypothesis rather than a verdict.

The project is intended for personal learning and careful reflection. It is not a diagnostic, clinical, hiring, compatibility-scoring, or people-surveillance tool.

## What it can do

- keep local profiles with provisional socionics type hypotheses;
- explore all 16 types through Model A functions, groups, and intertype relations;
- record evidence that fits, partly fits, contradicts, or leaves a hypothesis uncertain;
- compare two local profiles without converting the result into a compatibility score;
- optionally ask a locally running LM Studio model to suggest evidence-to-function links;
- require the user to confirm an AI suggestion before saving it as evidence.

## Privacy and data flow

Profiles, names, relationships, observations, and notes are stored in the Tauri WebView's local storage on the current computer. They are not included in this repository and Akasha has no cloud account, sync service, analytics, or telemetry.

When the optional LM Studio feature is used, the selected model receives the entered situation and observation through LM Studio's server on `127.0.0.1:1234`. Akasha does not intentionally send that content to an internet service. The privacy of a model or extension loaded by LM Studio remains the user's responsibility.

See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md) before entering sensitive information.

## Current limitations

- Data uses WebView local storage; there is no built-in export, backup, sync, encryption, or multi-device support.
- Clearing application or WebView data can permanently remove saved profiles and observations.
- Socionics content is a learning model and may be incomplete or disputed.
- AI output can be wrong and is never accepted automatically.
- Public installers are not currently signed or verified on a clean Windows installation.
- The interface is currently developed and tested primarily on Windows.

## Development setup

Install Node.js, Rust, and the [Tauri 2 prerequisites](https://v2.tauri.app/start/prerequisites/) for your operating system.

```powershell
npm install
npm run tauri dev
```

LM Studio is optional. To use local evidence suggestions, start its local server on port `1234` and load at least one chat model.

## Verification

Run the frontend quality gate:

```powershell
npm run check
```

After Rust, Tauri, or dependency metadata changes, also run:

```powershell
cargo check --manifest-path src-tauri\Cargo.toml
```

For changes involving local storage, native commands, or packaging, verify the real Tauri application rather than relying only on a browser preview.

## Build

```powershell
npm run tauri build
```

Generated executables and installers are local artifacts and are ignored by Git. See [app/README.md](app/README.md) for the Windows build notes.

## Changing the app icon

Put one square transparent PNG (preferably `1024x1024 px`, minimum `256x256 px`)
in `..\new-icons\akasha.png`. From `Desktop Apps`, run:

```powershell
.\tools\Apply-NewIcon.ps1 -App Akasha
```

Use `-Publish` after approving the icon to rebuild the executable and refresh its desktop shortcut.

## Project documentation

- [Architecture and codebase map](ai/project/ARCHITECTURE.md)
- [Data and AI workflow](WORKFLOW-DIAGRAM.md)
- [Product direction](docs/socionics-product-plan.md)
- [ISTP type-analysis reference](docs/type-analysis-wireframe-istp.md)
- [Visual language](docs/visual-language.md)
- [Contributor instructions](AGENTS.md)
- [Privacy](PRIVACY.md)
- [Security](SECURITY.md)

## License

Akasha is available under the [MIT License](LICENCE.md).
