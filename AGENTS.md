# Akasha contributor instructions

Akasha is a local-first Tauri desktop application for learning socionics through real people. Keep type assignments visibly provisional: theory, observations, and interpretations are separate layers.

## Verification

- Run `npm run check` after frontend or domain changes.
- Run `cargo check --manifest-path src-tauri\Cargo.toml` after Rust, Tauri, or Cargo metadata changes.
- Verify the real Tauri window when browser storage or native integration matters.
- For release artifacts, run the configured Tauri build, launch the exact generated artifact, and verify its version and embedded icon.
- Use `docs/brand/akasha-desktop-icon.png` as the canonical source for the Tauri icon set and packaged application.

## Architecture and data

- Keep socionics rules in the domain model, not duplicated across React components.
- Use uppercase MBTI-form IDs as canonical type names (`ISTP = TiSe`, `ISTJ = SiTe`). Show four-letter socionics names only as lowercase alternatives (`ISTj`, `ISTp`). Derive temperament, groups, and relations from the canonical function core rather than copying the alias's final letter.
- Keep profiles and observations in local application storage. Never add real personal data, screenshots, exports, or local databases to Git.
- Editing a person's type must preserve the profile ID and observations, but reset confidence to `Working` because the new type is a new hypothesis.
- Route LM Studio requests through Tauri commands because direct WebView requests are unreliable with its CORS behavior.
- For Evidence suggestions, use LM Studio's native `/api/v1/chat` with reasoning disabled and list only models with a loaded instance. Reasoning-capable models can otherwise spend the output budget on hidden reasoning and return no visible message.
- Unsaved form state must survive ordinary tab changes; hiding a mounted view is preferable when unmounting would discard active work.

## Windows builds

- Keep Cargo output outside Dropbox or other synchronized folders when file locking disrupts builds; `app/README.md` shows a portable approach.
- Run Vite and Tauri commands from the repository's real path rather than through a filesystem junction or symlink that changes emitted asset paths.
- After changing Tauri icons, use a fresh `CARGO_TARGET_DIR`; cached Windows resources can otherwise leave an old icon embedded in the executable.
- Preserve the LF policy in `.gitattributes`.
