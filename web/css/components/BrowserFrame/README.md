# BrowserFrame

The fake browser that holds a case's website: page tabs, an address bar, and the site itself below.

**This is the boundary between the two visual layers.**
- Above the address bar is the game: tokens and classes from this system.
- Inside `cc-browser__site` is the case's website, which deliberately ignores this system. CampusGist, a library board and a personal blog should each look like a different site by a different person.
- Case sites never use the game's fonts, colours or classes.

**Behaviour**
- Each tab is one page of the case site. The address bar shows that page's URL; in URL cases the player can edit it.
- The site's HTML is the real HTML the server sent for this player, so the Toolkit and real dev tools see the same thing.
