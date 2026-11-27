# Panel

The container for every block of the game shell: outlined, rounded and sitting on a hard shadow.

**Variants**
- `cc-panel`: dark panel on the ground (notebook, case details).
- `cc-panel--focus`: the one panel the player is working in. Yellow shadow. At most one per screen.
- `cc-panel--card`: light card for voices and evidence (Ama, exhibits, the selected case).
- `cc-panel--hero`: tilted hero card with a 14px yellow shadow. Home and case file only.

**Rules**
- Panel titles end with a period: "Notebook.", "Detective toolkit."
- An eyebrow (`cc-eyebrow`) above or beside the title carries counts and status.
- Never nest a panel in a panel. Use `sunk` areas or a code viewer inside instead.
