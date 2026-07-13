# Akasha local Windows build

This folder holds the local Windows executable used by the desktop shortcut.

## Current artifact

- File: `Akasha.exe`
- Version: `0.1.0`
- Target: Windows x64, local portable executable
- Build command: `npm run tauri -- build --no-bundle`
- SHA-256: `7299405D60F4549F9CFDD01BB689429971B750D6287FBE630397022DE7E752CD`
- Built: 2026-07-13

The executable embeds the production Vite/Tailwind frontend and does not depend on the development server.

## Desktop shortcut

`%USERPROFILE%\Desktop\Akasha.lnk` points to `app\Akasha.exe`. Replacing the executable at the same path keeps the shortcut valid.

## Local data

Person profiles are stored by the Tauri WebView in the current Windows user profile. They are not embedded in this executable or committed to Git.

## Release status

This is an unsigned local development build. It was launched successfully from the final `app\Akasha.exe` path on the development machine. It has not been verified in Windows Sandbox or on a separate clean machine, so it is not a public distribution-ready release.
