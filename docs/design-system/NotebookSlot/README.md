# NotebookSlot

One slot in the player's notebook: empty, waiting for a selected clue, or filled with a saved clue.

- The number of slots equals the case's `clueCount`.
- Filled text comes from the server after a valid token save. The client never holds clue text in advance.
- `cc-slot--waiting` appears only while the player has something selected in the Toolkit.
- Filled slots are draggable onto suspects on the crime board.
