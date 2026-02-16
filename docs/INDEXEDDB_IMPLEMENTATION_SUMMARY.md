# IndexedDB Integration - Implementation Summary

## Overview

This PR implements IndexedDB caching as a **proof of concept** for the bestiary page to improve page load performance.

## Implementation Status: PROOF OF CONCEPT ✅

**Enabled for: Bestiary page only**

## Key Design Decisions

### 1. Proof of Concept Approach (Per User Feedback)

Instead of full site-wide rollout, implementing POC on bestiary page first to:
- Validate performance improvements
- Test cache behavior in production
- Gather real-world metrics
- Identify any issues before wider deployment

### 2. Cache Flow Architecture

**Order of Operations:**
1. Check if IndexedDB is active (`isActive()` - checks enabled AND supported)
2. If active, check IndexedDB cache
3. If cache hit, return cached data
4. If cache miss, proceed to Service Worker cache → Network
5. After network fetch, store in IndexedDB (fire-and-forget)

**Cache Priority:**
- IndexedDB → Service Worker → Network

This approach ensures:
- IndexedDB complements (not replaces) service worker
- Fast retrieval of parsed data
- Non-blocking cache writes
- Graceful degradation if IndexedDB fails

### 3. Versioning System

**Two-Level Versioning:**

1. **Schema Version** (`DB_VERSION = 2`)
   - Database structure version
   - Increment when changing IndexedDB schema
   - Forces cache rebuild on schema changes

2. **Content Version** (`CACHE_VERSION_KEY`)
   - Tracks data version using `VERSION_NUMBER` global
   - Auto-validates on init
   - Auto-clears cache on version mismatch
   - Prevents stale data issues

### 4. Configuration & Testing

**Enable/Disable Flag:**
```javascript
setIndexedDbEnabled(false)  // Disable for A/B testing
setIndexedDbEnabled(true)   // Re-enable
```

**Performance Metrics:**
```javascript
{
  cacheHits: 150,
  cacheMisses: 10,
  hitRate: "93.75%",
  avgCachedLoadTime: "2.34ms",
  totalLoadTime: "387.50ms"
}
```

**Testing Commands:**
- `getIndexedDbPerformanceMetrics()` - View cache performance
- `getIndexedDbCacheStats()` - View cache size (json/entity counts)
- `clearIndexedDbCache()` - Clear all cached data
- `setIndexedDbEnabled(bool)` - Toggle caching

### 5. Integration with Existing Systems

**Cache Clear UI:**
- Existing "Reset Preloaded Data" button works automatically
- Calls `globalThis.swResetAll()`
- Service worker sends `CLEAR_INDEXEDDB` message
- Integration script handles message and clears cache

**Service Worker Coordination:**
- Service worker reset triggers IndexedDB clear
- Coordinated cache invalidation across all storage layers
- No manual intervention required

## Technical Implementation

### Core Components

**js/utils-indexeddb.js** (~400 lines)
- IndexedDB wrapper with three object stores
- Versioning and validation logic
- Performance metrics tracking
- Configuration management

**js/indexeddb-sw-integration.js** (~120 lines)
- Service worker message listener
- Global testing functions
- Console helper messages
- Performance metric calculations

**Integration Points:**
- `js/utils.js` - DataUtil.loadJSON (JSON caching)
- `js/utils-dataloader.js` - DataLoader.pCacheAndGet (entity caching)
- Service worker already integrated (previous commit)

### Data Storage

**JSON Cache Store:**
- Key: URL
- Value: {url, data, revision, timestamp}
- Purpose: Cache raw JSON files

**Entity Cache Store:**
- Key: "page:source:hash"
- Value: {key, page, source, hash, entity, timestamp}
- Purpose: Cache processed/merged entities

**Metadata Store:**
- Key: "cache-version"
- Value: VERSION_NUMBER
- Purpose: Track cache version for invalidation

## Performance Expectations

Based on analysis of cache architecture:

**Cold Cache (First Load):**
- Baseline load time
- IndexedDB populated in background
- No performance impact (non-blocking writes)

**Warm Cache (Subsequent Loads):**
- **Target: 30-60% faster** than cold cache
- JSON parsing skipped for cached files
- Entity resolution skipped for cached entities
- Hit rate target: >80%

**Factors Affecting Performance:**
- Browser IndexedDB implementation
- Device storage speed (SSD vs HDD)
- Amount of data cached
- Network conditions (less important with cache)

## Testing Strategy

**Phase 1: Manual Testing (Current)**
1. Test on bestiary page using testing guide
2. Measure cold vs warm cache performance
3. A/B test with caching enabled/disabled
4. Record actual improvement percentages

**Phase 2: Validation**
1. If improvement >30%: SUCCESS - proceed to Phase 3
2. If improvement 15-30%: MARGINAL - evaluate cost/benefit
3. If improvement <15%: REVISIT - investigate and adjust

**Phase 3: Expansion (If Successful)**
1. Add to spells page
2. Add to classes page
3. Add to items page
4. Measure each page independently
5. Eventually roll out site-wide if beneficial

## Files Changed

### Added Files (4)
- `js/utils-indexeddb.js` - Core IndexedDB wrapper
- `js/indexeddb-sw-integration.js` - SW integration and API
- `docs/INDEXEDDB_INTEGRATION.md` - POC documentation
- `docs/INDEXEDDB_TESTING_GUIDE.md` - Manual testing guide

### Modified Files (4)
- `bestiary.html` - Added IndexedDB scripts
- `js/utils.js` - Added IndexedDB check in DataUtil.loadJSON
- `js/utils-dataloader.js` - Added IndexedDB check in pCacheAndGet
- `sw-template.js` - Added CLEAR_INDEXEDDB message (previous commit)

### Modified Files (49 other HTML files)
- Removed IndexedDB scripts (keeping POC isolated to bestiary)

## Security

✅ **CodeQL Analysis: No vulnerabilities found**

- No SQL injection vectors (IndexedDB is NoSQL)
- No XSS vulnerabilities (data is not rendered until sanitized)
- No CSRF issues (local storage only)
- Graceful error handling (no crashes)
- Non-blocking writes (no DOS risk)

## Browser Compatibility

**Supported Browsers:**
- Chrome/Edge 24+
- Firefox 16+
- Safari 10+
- Opera 15+

**Coverage:** ~96% of users

**Fallback:** If unavailable, site works normally with existing caches

## Next Actions

1. **Immediate**: Test bestiary page using testing guide
2. **Document**: Record performance metrics
3. **Decide**: Based on metrics, proceed with:
   - Expand to other pages (if >30% improvement)
   - Adjust implementation (if <30% improvement)
   - Roll back (if problematic)

## Notes for Future Development

1. **DB_VERSION**: Increment when changing IndexedDB schema
2. **Testing Functions**: Use for performance validation before expanding
3. **Performance Metrics**: Key indicator of success
4. **Versioning**: Auto-clears cache on version mismatch
5. **Configuration**: Can disable without code changes

## Success Criteria

POC is considered successful if:
- ✅ No errors or crashes
- ✅ Cache hit rate >80% on warm cache
- ✅ Avg cached load time <5ms
- ✅ Overall page load improvement >30%
- ✅ No user complaints or issues

If all criteria met, expand to:
1. Spells page
2. Classes page
3. Items page
4. Eventually site-wide

## References

- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
