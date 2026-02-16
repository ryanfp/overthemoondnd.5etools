# IndexedDB Integration

This implementation adds IndexedDB caching to the 5e.tools website to improve page load performance.

## Overview

The site now uses a three-tier caching strategy:

1. **IndexedDB** - Persistent cache for parsed JSON and processed entities (new)
2. **Service Worker Cache** - Raw file caching with revision-based invalidation (existing)
3. **In-Memory Cache** - Session-level caching for active data (existing)

## Architecture

### Components

#### `js/utils-indexeddb.js`
Core IndexedDB wrapper providing:
- `STORE_JSON` - Raw JSON data cache (keyed by URL)
- `STORE_ENTITIES` - Processed entity cache (keyed by page:source:hash)
- `STORE_META` - Metadata storage

Key methods:
- `pSetJson(url, data, revision)` - Cache JSON with optional revision
- `pGetJson(url, expectedRevision)` - Retrieve cached JSON with revision validation
- `pSetEntity(page, source, hash, entity)` - Cache processed entity
- `pGetEntity(page, source, hash)` - Retrieve cached entity
- `pClearAll()` - Clear all cached data

#### `js/indexeddb-sw-integration.js`
Service worker integration providing:
- Message listener for cache clearing commands
- Global functions: `clearIndexedDbCache()`, `getIndexedDbCacheStats()`

#### Integration Points

**DataUtil.loadJSON** (`js/utils.js`)
- Checks IndexedDB before network fetch
- Caches loaded JSON after successful fetch
- Falls back gracefully if IndexedDB unavailable

**DataLoader.pCacheAndGet** (`js/utils-dataloader.js`)
- Checks IndexedDB for processed entities before parsing
- Caches entities after processing
- Maintains in-memory cache compatibility

**Service Worker** (`sw-template.js`)
- Sends cache clear messages when resetting
- Coordinates cache invalidation across tabs

## Benefits

1. **Reduced Network Requests** - Frequently accessed data served from IndexedDB
2. **Faster Parsing** - Pre-processed entities skip JSON parsing and merging
3. **Persistent Cache** - Survives page refreshes and browser restarts
4. **Automatic Invalidation** - Version-based cache clearing on updates

## Usage

### Automatic Caching
No configuration needed - data is automatically cached on first load.

### Manual Cache Management

```javascript
// Get cache statistics
const stats = await getIndexedDbCacheStats();
console.log(`Cached JSONs: ${stats.jsonCount}, Entities: ${stats.entityCount}`);

// Clear all cached data
await clearIndexedDbCache();
```

### Cache Clearing via Service Worker

```javascript
// Send message to service worker to clear all caches
if (navigator.serviceWorker && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({type: 'CLEAR_INDEXEDDB'});
}
```

## Performance Impact

Expected improvements:
- **Initial page load**: ~5-15% faster (network cache remains primary)
- **Subsequent page loads**: 30-60% faster (parsed data from IndexedDB)
- **Navigation between pages**: 40-70% faster (entity cache hits)

Note: Actual performance depends on:
- Browser IndexedDB implementation
- Amount of data being cached
- Device storage speed
- Network conditions

## Browser Compatibility

IndexedDB is supported in:
- Chrome/Edge 24+
- Firefox 16+
- Safari 10+
- Opera 15+

Coverage: ~96% of users (as of 2024)

Fallback: If IndexedDB is unavailable, the site functions normally using in-memory cache and service worker cache.

## Cache Storage Limits

IndexedDB storage limits vary by browser:
- Chrome/Edge: ~60% of available disk space
- Firefox: ~50% of available disk space  
- Safari: ~1GB (prompts user above)

The implementation uses non-blocking writes, so storage quota errors won't prevent page functionality.

## Debugging

### Check if IndexedDB is active
```javascript
// Console command
IndexedDbUtil.isSupported()
```

### View cached data
Use browser DevTools:
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Expand "IndexedDB"
4. Look for "5etools-cache" database

### Clear cache manually
```javascript
await clearIndexedDbCache()
```

## Technical Notes

- Cache writes are fire-and-forget (non-blocking)
- Revision validation prevents stale data
- All errors are non-fatal and logged to console
- Entity copies are stored to prevent mutation issues
