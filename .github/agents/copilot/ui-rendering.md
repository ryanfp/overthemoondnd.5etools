# Task Guidance: HTML Templates, Renderers, and CSS

Use this guidance when editing templates, renderers, or styles.

## Templates and Renderers
- Templates live in `template-head/` and are rendered via `js/` renderers.
- Preserve existing output structure unless explicitly approved.
- Avoid assumptions about optional data; guard missing fields.

## CSS/SCSS
- Prefer SCSS edits in `scss/`, compiled to `css/`.
- Use BEM naming where possible.
- Favor CSS over JS for purely visual adjustments.

## Validation
- Main check: `npm run build`.