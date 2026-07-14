# Windows build artifacts

The `app/` directory is reserved for local portable artifacts. Executables are ignored by Git and are not part of the source release.

## Standard Tauri build

From the repository root:

```powershell
npm install
npm run check
cargo check --manifest-path src-tauri\Cargo.toml
npm run tauri build
```

Tauri writes the executable and configured bundles below the Cargo target directory. The production frontend is embedded in the application and does not require the Vite development server.

## Building outside a synchronized folder

Dropbox and similar tools can lock Vite or Rust build artifacts. Use a fresh Cargo target directory outside the synchronized workspace when necessary:

```powershell
$env:CARGO_TARGET_DIR = Join-Path $env:LOCALAPPDATA "Akasha\cargo-target"
npm run tauri build
```

Copy only an intended portable executable into `app/` if a stable local launch path is useful. Do not commit the executable.

## Release status

Current builds are unsigned development artifacts. Before describing one as a public release, verify it on a clean Windows installation, validate the embedded icon and version, document a checksum, and decide how signing and updates will work.

Profiles and observations remain in the current user's Tauri WebView storage. They are not embedded in the executable.
