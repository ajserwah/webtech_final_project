# Button

Square-shouldered buttons with a 3px ink outline and a hard offset shadow; yellow means "the thing to do next".

**Variants**
- `cc-btn cc-btn--primary`: the one primary action on a screen. Add `cc-btn--xl` for page-level calls (Pick a case, Start the case).
- `cc-btn`: secondary actions (Get a hint, Open crime board, Sign in).
- Add `cc-btn--on-light` when the button sits on paper or a card (Ama's Back and Next).

**Rules**
- One primary button per screen region. If two things compete, one becomes secondary.
- Name buttons by their outcome in sentence case: "Save to notebook", not "Submit".
- Forward actions end with `→`, back actions start with `←`. No other glyphs or icons.
- Minimum target 44px; never shrink below.
- Use a real `<button>` (or `<a>` for navigation). Disabled uses the `disabled` attribute.

**Markup**: `<button class="cc-btn cc-btn--primary" type="button">Save to notebook →</button>`. Always set `type`, so a button inside a form never submits by accident.
