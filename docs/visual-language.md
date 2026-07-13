# Akasha visual language

## Product posture

Akasha is a calm, local-first socionics laboratory. A person remains the human context; the model supports inquiry rather than issuing verdicts. Dense structures should feel inspectable, not clinical or overwhelming.

The visual idea is **bio-circuit minimalism**: precise grid and trace geometry softened by organic reptile cues. Cyberpunk atmosphere comes from depth and selective luminous signals, not glowing every border.

## Principles

1. **Calm before spectacle.** Dark surfaces and space carry the interface; neon marks focus, state, and relationships.
2. **One person, one context.** The selected person and working hypothesis remain visible while analysis changes beneath them.
3. **Structure without certainty.** Theory, evidence, contradictions, and unanswered questions must be visually distinguishable.
4. **Local and private.** On-device persistence is stated plainly without dominating the workspace.
5. **Reptile, not mascot.** Crocodile cues belong in the mark, eye geometry, ridges, and traces rather than cartoon illustration.
6. **Progressive depth.** Overview stays scannable; deep detail opens in place without losing the current structure.

## Tokens

| Role                  | Value                       |
| --------------------- | --------------------------- |
| Canvas                | `#070b0d`                   |
| Sidebar               | `#090e10`                   |
| Surface               | `#0d1417`                   |
| Elevated surface      | `#111b1e`                   |
| Text                  | `#edf7f4`                   |
| Muted text            | `#81918e`                   |
| Border                | `rgba(171, 255, 231, 0.10)` |
| Primary / focus       | `#53f6c4`                   |
| Secondary / analysis  | `#63b8ff`                   |
| Special / synthesis   | `#a68cff`                   |
| Warning / uncertainty | `#f0bf66`                   |
| Error / contradiction | `#ff7285`                   |

Spacing uses `4, 8, 12, 16, 24, 32, 48, 64`. Control, panel, and feature radii are `6, 10, 14px`. Motion uses `120, 180, 250ms` and respects reduced-motion preferences.

## Typography and interaction

Use a restrained sans-serif system stack for reading. Reserve monospace for type codes, function notation, shortcuts, and machine status. Lucide icons are normally `15–20px` and need labels when meaning is not universal.

Use the shared typography tokens from `src/App.css`: micro `10px`, caption `11px`, small `12px`, body `13px`, and strong body `14px`. Do not add interface text below `10px`; increase hierarchy through weight, color, and spacing instead of shrinking labels.

Controls require visible hover, active, focus-visible, and disabled states. Empty evidence should invite one next action without implying that theory is confirmed. Akasha must remain usable at compact desktop widths and by keyboard.
