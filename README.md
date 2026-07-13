# Akasha

Akasha is a private, local-first desktop lab for learning socionics through real people. It derives a working type structure, keeps theory separate from lived evidence, and lets the user confirm or reject local AI suggestions.

## Current scope

- profiles for ISTP, ISTJ, and ENFP working hypotheses;
- eight-function analysis grouped by positions, aspects, and dimensions;
- evidence linked to functions, with manual or locally suggested connections;
- a basic relationship comparison and group overview;
- local persistence in the Tauri WebView.

Private names and observations stay in application storage and are not part of this repository.

## Development

Requirements: Node.js, Rust, and the Tauri Windows prerequisites.

```powershell
npm install
npm run tauri dev
```

Run the complete frontend gate with `npm run check`. For Rust changes, run `cargo check` from `src-tauri`.

LM Studio is optional. When its local server is available at `127.0.0.1:1234`, Akasha discovers installed models and can suggest function connections. The user must confirm a suggestion before it becomes part of saved evidence.

## Documentation

- [Product direction](docs/socionics-product-plan.md)
- [ISTP type-analysis reference](docs/type-analysis-wireframe-istp.md)
- [Visual language](docs/visual-language.md)
- [Local Windows build](app/README.md)
