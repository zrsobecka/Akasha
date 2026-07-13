# Akasha local Windows build

`app/Akasha.exe` is the portable Windows x64 artifact used by `%USERPROFILE%\Desktop\Akasha.lnk`.

## Current artifact

| Field   | Value                                                              |
| ------- | ------------------------------------------------------------------ |
| Version | `0.1.0`                                                            |
| Built   | 2026-07-13                                                         |
| SHA-256 | `941CF7A0D824A88DC0FF5057B4A1E9F25CEB73E26CD3C755F0D87D0734DCC14B` |

The executable embeds the production frontend and does not require the Vite development server. Profiles and observations remain in the current user's Tauri WebView storage; they are not embedded in the executable.

## Rebuild

Keep Cargo output outside Dropbox because synchronized `target` directories can be locked during compilation:

```powershell
$env:CARGO_TARGET_DIR = "$env:TEMP\akasha-tauri-target"
npm run tauri -- build --no-bundle
```

Copy the resulting executable to `app/Akasha.exe`. Replacing it at the same path preserves the desktop shortcut.

## Release status

This is an unsigned personal development build. It has run successfully from the final path on this machine, but it has not been verified on a clean Windows installation and is not ready for public distribution.
