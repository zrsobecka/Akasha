# Data and AI workflow

Akasha keeps user-entered evidence separate from theory and AI interpretation. The optional local model proposes a link; it never writes evidence by itself.

```mermaid
flowchart LR
    U["User enters a profile or observation"]
    UI["React feature view"]
    D["Socionics domain model"]
    S["Versioned WebView localStorage"]
    A["LM Studio frontend adapter"]
    T["Tauri commands"]
    L["LM Studio on 127.0.0.1:1234"]
    V["Validate structured suggestion"]
    C{"User confirms?"}

    U --> UI
    UI --> D
    D --> UI
    UI --> S
    UI -->|"Optional analysis"| A
    A --> T
    T --> L
    L --> T
    T --> A
    A --> V
    V --> C
    C -->|"Yes"| S
    C -->|"No"| UI
```

## Trust boundaries

- **Repository:** contains application source and synthetic test data only.
- **WebView storage:** contains private profiles, observations, relationships, and notes on the current device.
- **Tauri boundary:** exposes only the two LM Studio commands registered in `src-tauri/src/lib.rs`.
- **Local model boundary:** receives the selected type, function catalog, situation, and observed behavior when the user requests analysis.
- **Human decision:** remains the final gate before an AI suggestion becomes saved evidence.

There is currently no cloud backend, account system, telemetry pipeline, sync engine, export workflow, or automatic backup.
