# Case Closed

An interactive detective game that teaches web development concepts through solving mysteries.

Before any task, read the [engineering handbook](https://claude.ai/artifact/WSLHDGkZgkBFpGuFoHiqw6) and the [design system](https://claude.ai/artifact/RscJaASvre9LwzzUoYLb3h), and give both to your AI tool along with the files it will touch.

## Running the project

```bash
npm install
npm run dev
```

- Game origin: http://localhost:3000 (pages, CSS, JS and later the `/api`)
- Sites origin: http://localhost:3001 (case websites, shown in an iframe)

## Fake data

Open any page with `?fake` and `web/js/lib/api.js` reads example responses from `fixtures/` instead of the server, so the frontend can be built before the endpoints exist. Name an outcome to see it: `/play.html?fake=clues.save.notEvidence`. See `fixtures/README.md`.

## Layout

| Folder | What's in it | Owner |
| --- | --- | --- |
| `server/` | Express app for both origins, API, database, case sites | Backend |
| `fixtures/` | Example API responses (the API contract) | Backend, frontend reviews |
| `web/pages/` | One HTML page per screen, served from the root (`/play.html`) | Frontend |
| `web/css/` | `tokens.css` and `components.css` copied from the design system (never edited here), plus page CSS | Frontend |
| `web/js/lib/` | `api.js`, `events.js`, `dom.js`: shared helpers | Lead |
| `web/js/pieces/` | One module per piece, each exporting `mount` | Frontend, Features |
| `cases/` | Case packages | Story & Case Designer |
| `reporter/` | Script injected into case pages | Lead |
| `docs/design-system/` | Component notes and previews from the design system, for reference | Lead |

Branch per task (`area/what`), small pull requests, one review from the folder's owner. `main` is always playable.
