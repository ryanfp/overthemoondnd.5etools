# IndexedDB Integration - Proof of Concept

This implementation adds IndexedDB caching to the 5e.tools bestiary page as a proof of concept to improve page load performance.

## Status: PROOF OF CONCEPT

**Currently enabled for: Bestiary page only**

This is a testing implementation to validate performance improvements before rolling out site-wide.

## Overview

The bestiary page now uses a three-tier caching strategy:

1. **IndexedDB** - Persistent cache for parsed JSON and processed entities (new, POC)
2. **Service Worker Cache** - Raw file caching with revision-based invalidation (existing)
3. **In-Memory Cache** - Session-level caching for active data (existing)

## Architecture

### Components

#### `js/utils-indexeddb.js`
Core IndexedDB wrapper providing:
- `STORE_JSON` - Raw JSON data cache (keyed by URL)
- `STORE_ENTITIES` - Processed entity cache (keyed by page:source:hash)
- `STORE_META` - Metadata storage (version tracking)

Key methods:
- `isActive()` - Check if IndexedDB is enabled and supported
- `setEnabled(boolean)` - Enable/disable caching for testing
- `pSetJson(url, data, revision)` - Cache JSON with optional revision
- `pGetJson(url, expectedRevision)` - Retrieve cached JSON with revision validation
- `pSetEntity(page, source, hash, entity)` - Cache processed entity
- `pGetEntity(page, source, hash)` - Retrieve cached entity
- `pClearAll()` - Clear all cached data
- `getPerformanceMetrics()` - Get cache hit/miss statistics

#### `js/indexeddb-sw-integration.js`
Service worker integration providing:
- Message listener for cache clearing commands
- Global functions for testing and performance measurement

#### Integration Points

**DataUtil.loadJSON** (`js/utils.js`)
- Checks if IndexedDB is active before attempting cache access
- Checks IndexedDB before network fetch
- Caches loaded JSON after successful fetch
- Falls back gracefully if IndexedDB unavailable or disabled

**DataLoader.pCacheAndGet** (`js/utils-dataloader.js`)
- Checks if IndexedDB is active before attempting cache access
- Checks IndexedDB for processed entities before parsing
- Caches entities after processing
- Maintains in-memory cache compatibility

**Service Worker** (`sw-template.js`)
- Sends cache clear messages when resetting
- Coordinates cache invalidation across tabs

## Testing & Performance

### Console Commands

When visiting the bestiary page, you'll see:
```
IndexedDB Caching: ENABLED (Proof of Concept)
```

Available testing commands:

```javascript
// View cache performance metrics
getIndexedDbPerformanceMetrics()
// Returns: {cacheHits, cacheMisses, hitRate, avgCachedLoadTime, totalLoadTime}

// View cache size statistics
getIndexedDbCacheStats()
// Returns: {jsonCount, entityCount}

// Clear all cached data
clearIndexedDbCache()

// Disable caching temporarily (for A/B testing)
setIndexedDbEnabled(false)

// Re-enable caching
setIndexedDbEnabled(true)
```

### Performance Testing Workflow

1. **First Load (Cold Cache)**
   - Open bestiary.html
   - Note: Page loads from network/service worker
   - IndexedDB populated in background

2. **Second Load (Warm Cache)**
   - Refresh page
   - Run `getIndexedDbPerformanceMetrics()`
   - Compare hitRate and avgCachedLoadTime

3. **A/B Comparison**
   - Load page with caching enabled
   - Run `setIndexedDbEnabled(false)`
   - Clear browser cache (Ctrl+Shift+R)
   - Reload and compare load times

4. **Cache Clear**
   - Settings → Preload Data → Reset Preloaded Data
   - Or run `clearIndexedDbCache()` in console

## Versioning

Cache version is automatically managed:
- Version stored in IndexedDB metadata
- Validated against `VERSION_NUMBER` global if available
- Cache auto-clears on version mismatch
- DB_VERSION incremented (v2) for schema changes

## Expected Performance Impact

Initial testing targets:
- **Initial page load**: Baseline measurement
- **Subsequent page loads**: 30-60% faster (parsed data from IndexedDB)
- **Entity lookups**: 40-70% faster (entity cache hits)

Actual performance depends on:
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

Fallback: If IndexedDB is unavailable or disabled, the site functions normally using in-memory cache and service worker cache.

## Cache Storage Limits

IndexedDB storage limits vary by browser:
- Chrome/Edge: ~60% of available disk space
- Firefox: ~50% of available disk space
- Safari: ~1GB (prompts user above)

The implementation uses non-blocking writes, so storage quota errors won't prevent page functionality.

## Next Steps

If proof of concept shows significant performance improvement:

1. Gather performance metrics from bestiary testing
2. Document average improvement percentages
3. Consider expanding to other large pages:
   - Spells page
   - Classes page
   - Items page
4. Eventually roll out site-wide if beneficial

## Debugging

### Check if IndexedDB is active
```javascript
// Console command
IndexedDbUtil.isActive()  // Should return true on bestiary page
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

### Performance metrics
```javascript
// Get current metrics
getIndexedDbPerformanceMetrics()

// Reset metrics (for fresh testing)
IndexedDbUtil.resetPerformanceMetrics()
```

## Technical Notes

- Cache writes are fire-and-forget (non-blocking)
- Revision validation prevents stale data
- All errors are non-fatal and logged to console
- Entity copies are stored to prevent mutation issues
- Config flag allows disabling without code changes
