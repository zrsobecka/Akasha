# Akasha local Windows build

This folder holds the local Windows executable used by the desktop shortcut.

## Current artifact

- File: `Akasha.exe`
- Version: `0.1.0`
- Target: Windows x64, local portable executable
- Build command (PowerShell): `$env:CARGO_TARGET_DIR = "$env:TEMP\akasha-tauri-target"; npm run tauri -- build --no-bundle`
- SHA-256: `9033EE08F9DE492533B51B024DF45EB01FCD6D0882564CD8ADA7638F725B83E3`
- Built: 2026-07-13

The executable embeds the production Vite/Tailwind frontend and does not depend on the development server.

The Cargo target stays outside Dropbox because synchronized `target` archives can be locked during Rust compilation on this machine.

## Desktop shortcut

`%USERPROFILE%\Desktop\Akasha.lnk` points to `app\Akasha.exe`. Replacing the executable at the same path keeps the shortcut valid.

## Local data

Person profiles are stored by the Tauri WebView in the current Windows user profile. They are not embedded in this executable or committed to Git.

## Local AI suggestions

- Akasha discovers language models from the LM Studio server on `127.0.0.1:1234`.
- Requests go through the Tauri backend because LM Studio does not answer the WebView's CORS preflight reliably; do not move these calls back to browser `fetch`.
- Start the server with `lms server start` or from LM Studio's Developer tab.
- Only the observation, current type and its eight-function catalog are sent to the local server.
- Model suggestions remain uncertain and are saved as links only after user confirmation.
- Manual function selection remains available when LM Studio is offline.

## Release status

This is an unsigned local development build. It was launched successfully from the final `app\Akasha.exe` path on the development machine. It has not been verified in Windows Sandbox or on a separate clean machine, so it is not a public distribution-ready release.
