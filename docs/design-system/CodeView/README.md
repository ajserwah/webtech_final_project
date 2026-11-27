# CodeView

The Toolkit's view of a page's real source, with the line the player selected highlighted in yellow.

- It shows the actual HTML the server sent for this player, not a curated copy. That keeps it honest with hard mode, where players use real dev tools.
- The highlighted line (`cc-code__line--clue`) is the player's selection, not a hint. Never pre-highlight a clue.
- Tag names use `code-tag`; text stays `text`. No other syntax colours.
- Indent with `data-indent="1"` / `"2"` rather than spaces.
