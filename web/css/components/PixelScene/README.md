# PixelScene

The pixel-art landscape along the bottom of the home page, the case picker and the case file: a themed base plus one layer per case.

**How it's built**
- Drawn on a 240 × 72 grid, scaled up with `shape-rendering: crispEdges` and `preserveAspectRatio="xMidYMax slice"`, so pixels stay square and the scene crops from the sides on narrow screens.
- **Base layer** (this preview): sky bands with dithered edges, stars, moon, far hills, ground strip. Every fill is a `scene-*` token, so it re-colours with the case theme.
- **Case layer**: the setting's landmarks (Case 1's library, clock tower, hostel, palms, lamps). Fixed colours, one SVG per case, stored as a case asset. It fades out when another case is selected.

**Rules**
- Shapes only: no faces bigger than a few pixels, no text in the scene.
- Scenes appear on menu screens (home, picker, case file). The play screen has none: investigating is the quiet part.
- New scenes keep the grid size and the same five base tokens.
