# CaseCard

A selectable card in the case picker; selecting it re-themes the whole page to that case.

- First tap selects (`aria-pressed="true"`), the stage above fills in, and the page's `data-theme` changes to the case's preset. "Open case file" enters. This works the same on touch screens.
- Locked cases are selectable too: they show their theme and concept, but no title and no open button.
- The card shows the case number, concept and theme name. Titles live on the stage.
