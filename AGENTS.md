# Akasha contributor instructions

Akasha is a local-first Tauri desktop application for learning socionics through real people. Keep type assignments visibly provisional: theory, observations, and interpretations are separate layers.

## Project knowledge

- Before changing structure or module boundaries, read `ai/project/ARCHITECTURE.md`.
- Put product intent in `ai/product/`, feature contracts in `ai/features/`, integration contracts in `ai/integrations/`, and architecture or migration context in `ai/project/`. Update the focused document instead of creating overlapping notes.
- Treat `src/features/tasks` and `src/features/friends` according to `ai/project/legacy-prototypes.md`; do not migrate, import, or delete them without a separate review and explicit decision.
- Never add real profiles, observations, screenshots, exports, or local databases to Git.

## Verification

- Run `npm run check` after frontend or domain changes.
- Run `cargo check --manifest-path src-tauri\Cargo.toml` after Rust, Tauri, or Cargo metadata changes.
- Verify the real Tauri window when browser storage or native integration matters.
- For release artifacts, run the configured Tauri build, launch the exact generated artifact, and verify its version and embedded icon.
- Use `docs/brand/akasha-desktop-icon.png` as the canonical source for the Tauri icon set and packaged application.

## Windows builds

- Keep Cargo output outside Dropbox or other synchronized folders when file locking disrupts builds; `app/README.md` shows a portable approach.
- Run Vite and Tauri commands from the repository's real path rather than through a filesystem junction or symlink that changes emitted asset paths.
- Use an explicitly fresh `CARGO_TARGET_DIR` for release or icon builds; cached Windows resources can otherwise embed an old icon.
- Preserve the LF policy in `.gitattributes`.
