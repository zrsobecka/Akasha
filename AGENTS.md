# Akasha project instructions

Akasha is a private, local-first Tauri desktop app for learning socionics through real people. Keep type assignments visibly provisional: theory, observations, and interpretations are separate layers.

## Verify changes

- Run `npm run check` after frontend or domain changes.
- Run `cargo check` from `src-tauri` after Rust or Tauri changes.
- For UI behavior, verify the real Tauri window when browser storage or native integration matters.
- After every user-visible application change, rebuild `app/Akasha.exe`, replace and verify the portable artifact, and ensure `%USERPROFILE%\Desktop\Akasha.lnk` exists and targets that exact executable before reporting the change as complete.
- Whenever rebuilding `app/Akasha.exe` or creating, replacing, or repairing `Akasha.lnk`, use `docs/brand/akasha-desktop-icon.png` as the canonical project icon for both the embedded Tauri icon set and the shortcut.

## Architecture and data

- Keep socionics rules in the domain model, not duplicated across React components.
- Keep private profiles and observations in local application storage; never add real personal data to Git.
- Editing a person's type must preserve the profile ID and observations, but reset confidence to `Working` because the new type is a new hypothesis.
- LM Studio requests go through Tauri commands because direct WebView `fetch` is unreliable with its CORS behavior.
- Unsaved form state must survive ordinary tab changes; hiding a mounted view is preferable when unmounting would discard active work.

## Windows builds

- Dropbox may lock Vite and Rust build artifacts. For release builds, set `CARGO_TARGET_DIR` outside Dropbox as documented in `app/README.md`.
- `C:\Users\zusob\Dropbox\Akasha` is a junction to `C:\Users\zusob\Dropbox\Desktop Apps\Akasha`. Run Vite build and dev commands from the real target path; running through the junction can make Rollup reject `../Desktop Apps/Akasha/index.html` as an emitted asset path.
- After changing Tauri icons, build with a fresh `CARGO_TARGET_DIR`; reusing the previous target can leave the old Windows icon embedded in the `.exe`.
- Preserve the repository LF policy from `.gitattributes`.
