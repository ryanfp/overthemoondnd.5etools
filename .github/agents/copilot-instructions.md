# Copilot/Agent Instructions (General)

These are **general, low-overhead** guidelines for working in this repo. Task-specific guidance lives in `.github/copilot/`.

## Project summary
This repo is a fork/custom build of 5e.tools. It is a static site with JSON-driven content + JS rendering + SCSS styling.

## High-Level Rules
- **Do not implement changes without approval.** Propose and discuss first; only execute edits once confirmed.
- Follow existing schema and conventions; if in doubt, ask.
- Prefer minimal changes; avoid adding dependencies unless absolutely required.

## Validation Standard
- The primary validation is `npm run build` (it already cleans/validates JSON and rebuilds the site).

## Repo Map (Common Areas)
- `data/`: Official data JSONs.
- `homebrew/`: Local homebrew JSONs for testing.
- `js/`: App logic and renderers.
- `template-head/`: Handlebars HTML templates.
- `scss/` → `css/`: Stylesheets.
- `sw-template.js`, `sw-injector-template.js`: Service worker templates.

## Preferred References
- 5etools schema documentation (see task-specific notes in `.github/copilot/homebrew.md`).
- VS Code schema extension (see task-specific notes in `.github/copilot/homebrew.md`).

## Output Expectations for Agents
- Summarize proposed changes and reference relevant files.
- Ask clarifying questions if requirements are ambiguous.

## Lightweight Approval Workflow
Use this brief checklist to keep reviews fast while ensuring alignment:
- **Proposal**: describe the change at a high level.
- **Files touched**: list expected files/areas.
- **Why**: one sentence on rationale.
- **Validation plan**: usually `npm run build`.
Only implement after confirmation.
