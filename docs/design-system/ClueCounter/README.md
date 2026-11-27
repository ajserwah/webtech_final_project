# ClueCounter

A pill in the play-screen header showing how many of the case's clues the player has saved.

- One box per clue in the case; found boxes fill yellow.
- The total comes from the case's public data (`clueCount`). Which clues were found comes from the server, never from the client.
- Give it an `aria-label` with the full sentence ("1 of 4 clues saved").
