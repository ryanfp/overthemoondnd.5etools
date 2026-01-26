# Site Loading Issues - Debug Summary

## Issues Identified and Fixed

### Issue 1: dice3d.css MIME Type Mismatch Error

**Problem:**
```
The resource from "https://5etools.overthemoondnd.com/css/dice3d.css" was blocked due to MIME type ("text/html") mismatch (X-Content-Type-Options: nosniff).
```

**Root Cause:**
- All HTML files (50+) were trying to load `css/dice3d.css` via `<link rel="stylesheet" href="css/dice3d.css">`
- The file did NOT exist in the `css/` directory
- The dice3d styles were only in `scss/includes/style-dice3d.scss` and were being compiled into `css/main.css`
- When the browser requested `css/dice3d.css`, the server returned a 404 error page (HTML) instead of CSS
- The browser detected the MIME type mismatch and blocked it

**Solution:**
Created a new SCSS entry point file `scss/dice3d.scss` that imports the necessary dependencies:
```scss
@use "vars/vars";
@use "vars/vars-night";
@use "includes/style-dice3d";
```

When the build process runs (`npm run build:css`), this file is now compiled to `css/dice3d.css`, resolving the 404 error.

**Files Changed:**
- Created: `scss/dice3d.scss`
- Generated: `css/dice3d.css` (via build process)

---

### Issue 2: Promise Scope Error in Service Worker Communication

**Problem:**
```
Error: Promised response from onMessage listener went out of scope (background.js.286.286)
```

**Root Cause:**
- The error message references "background.js" but there is no such file in this project
- The actual issue is in the service worker injector (`sw-injector-template.js`)
- Three functions called `wb.messageSW()` which returns a Promise, but did NOT handle the Promise:
  - `swCacheRoutes()` - line 67
  - `swCancelCacheRoutes()` - line 78
  - `swResetAll()` - line 89
- The browser warned about unhandled Promise rejections when the message channel went out of scope

**Solution:**
Added `.catch()` handlers to all `wb.messageSW()` calls to properly handle Promise rejections:

```javascript
wb.messageSW({...}).catch(err => {
    console.warn("Failed to send ... message to service worker:", err);
});
```

This ensures that if the service worker is unavailable or the message fails, the error is caught and logged rather than causing an unhandled Promise rejection.

**Files Changed:**
- Modified: `sw-injector-template.js` (added 3 `.catch()` handlers)
- Regenerated: `sw-injector.js` (via `npm run build:sw`)
- Regenerated: `sw.js` (via `npm run build:sw`)

---

## Build Process

To apply these fixes to a fresh clone:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build CSS files (generates dice3d.css):
   ```bash
   npm run build:css
   ```

3. Build service worker (generates sw-injector.js and sw.js):
   ```bash
   npm run build:sw
   ```

## Testing

The fixes have been applied to the `testing` branch. To verify:

1. Start a local server:
   ```bash
   npm run serve:dev
   ```

2. Open browser to `http://localhost:5050`

3. Open browser DevTools Console - you should no longer see:
   - MIME type mismatch errors for dice3d.css
   - Promise scope errors from service worker

## Notes

- The `homebrew` branch was NOT modified as requested
- All changes were committed to the `testing` branch
- The changes are minimal and surgical - only fixing the specific issues identified
- No changes were made to the HTML files since the solution was to create the missing CSS file
