# Fixtures

Example API responses. The frontend uses them as fake data until each real
endpoint exists (open any page with `?fake`); the backend's tests check that
real responses have exactly the same keys.

- One file per outcome: `area.action.outcome.json`. The success case is `.ok`.
- Every success and every error an endpoint can return gets its own file.
  Errors are `{ "error": { "code", "message" } }`.
- Values are realistic Case 1 data. Scores are placeholders until scoring is set.
- Changing a fixture is a contract change: it needs a review from both the
  frontend and backend owners.

The `area.action` part of each name is set per endpoint in `web/js/lib/api.js`.
