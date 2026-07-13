# Akasha project instructions

Akasha is a private, local-first Tauri desktop app for learning socionics through real people. Keep type assignments visibly provisional: theory, observations, and interpretations are separate layers.

## Verify changes

- Run `npm run check` after frontend or domain changes.
- Run `cargo check` from `src-tauri` after Rust or Tauri changes.
- For UI behavior, verify the real Tauri window when browser storage or native integration matters.

## Architecture and data

- Keep socionics rules in the domain model, not duplicated across React components.
- Keep private profiles and observations in local application storage; never add real personal data to Git.
- LM Studio requests go through Tauri commands because direct WebView `fetch` is unreliable with its CORS behavior.
- Unsaved form state must survive ordinary tab changes; hiding a mounted view is preferable when unmounting would discard active work.

## Windows builds

- Dropbox may lock Vite and Rust build artifacts. For release builds, set `CARGO_TARGET_DIR` outside Dropbox as documented in `app/README.md`.
- Preserve the repository LF policy from `.gitattributes`.
