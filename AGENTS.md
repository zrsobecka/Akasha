# Akasha contributor instructions

Akasha is a local-first Tauri desktop application for learning socionics through real people. Keep type assignments visibly provisional: theory, observations, and interpretations are separate layers.

## Project knowledge

- Before changing structure or module boundaries, read `ai/project/ARCHITECTURE.md`.
- Keep product intent in `ai/product/`, feature contracts in `ai/features/`, integrations in `ai/integrations/`, and architecture or migrations in `ai/project/`. Update a focused document instead of adding an overlapping one.
- Treat `src/features/tasks` and `src/features/friends` according to `ai/project/legacy-prototypes.md`; do not migrate, import, or delete them without a separate review and explicit decision.
- Never add real profiles, observations, screenshots, exports, or local databases to Git.

## Verification

- Run `npm run check` after frontend or domain changes.
- Run `cargo check --manifest-path src-tauri\Cargo.toml` after Rust, Tauri, or Cargo changes.
- Verify the real Tauri window when browser storage or native integration matters.
- For releases, run the configured Tauri build and launch the generated artifact to verify its version and embedded icon. The canonical icon source is `docs/brand/akasha-desktop-icon.png`.

## Windows builds

- Keep Cargo output outside synchronized folders when file locking disrupts builds; see `app/README.md`.
- Run Vite and Tauri commands from the repository's real path rather than through a filesystem junction or symlink that changes emitted asset paths.
- Use an explicitly fresh `CARGO_TARGET_DIR` for release or icon builds; cached Windows resources can otherwise embed an old icon.
- Preserve the LF policy in `.gitattributes`.
