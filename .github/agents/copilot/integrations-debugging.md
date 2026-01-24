# Task Guidance: Integrations and Debugging

Use this guidance when proposing new libraries or diagnosing issues.

## Integrations
- Avoid new dependencies unless absolutely required.
- If a library is needed, propose the integration plan first (no implementation until approved).
- Ensure features degrade gracefully and do not block page load.

## Service Worker and Cache
- Be mindful of `sw-template.js` and caching behavior.
- Rebuild the service worker index when validating changes as part of `npm run build`.

## Debugging
- **Console errors**: check for missing data fields, JSON format issues, or invalid tags.
- **Git issues**: confirm line endings, ignore rules, and avoid committing generated artifacts unless required.