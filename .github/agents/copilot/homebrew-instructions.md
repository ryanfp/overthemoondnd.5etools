# Task Guidance: Homebrew & Data JSON

Use this guidance when creating or validating **homebrew** or adjusting **data** JSON.

## Primary Sources of Truth
- Use the 5etools **documented schema** (Help/Docs site).
- Use the **VS Code schema extension** for validation and field hints.
- For homebrew, consult the **5etools homebrew repository** conventions.

## Formatting Rules (Summary)
- Match `JSON.stringify` formatting with **tabs** for indentation.
- Follow 5etools punctuation rules (quotes/dashes/measurements/dice).
- Only tag intentional rules references; avoid tagging inside `quote` blocks.

## Validation
- Use `npm run build` as the main verification step.
- If reviewing for typos, propose a spellcheck run before editing.