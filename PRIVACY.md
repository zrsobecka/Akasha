# Privacy

Akasha is designed for personal, local-first use. This document describes the current source code, not every possible third-party build or future release.

## Data stored on the device

Akasha can store names, relationships, type hypotheses, observations, interpretations, AI-link provenance, friend-profile notes, tasks, and the current selection. These records are stored in the Tauri WebView's `localStorage` for the current user.

The application currently has no built-in account, cloud database, synchronization, telemetry, analytics, advertising, export, or backup service. It also does not encrypt application records itself. Anyone with sufficient access to the operating-system account or WebView data may be able to read them.

## Optional LM Studio processing

When the user requests an evidence suggestion, Akasha sends the selected type, its function catalog, the situation, and the observation to LM Studio at `http://127.0.0.1:1234`. The request is routed through a Tauri command and is intended to remain on the same device.

Akasha does not control what a model, plugin, or configuration inside LM Studio does. Review that software and the selected model before processing sensitive information.

## User responsibilities

- Obtain appropriate consent before recording identifiable information about another person.
- Avoid entering information that would cause serious harm if exposed.
- Do not commit real profiles, exports, databases, logs, or screenshots to this repository.
- Maintain a separate backup if the data matters; clearing application data can remove it permanently.

## Removing data

Akasha does not yet provide a dedicated full-data deletion or export screen. Application data can be removed by clearing Akasha's WebView/application data through the operating system, which is destructive and should be done only after any needed backup.
