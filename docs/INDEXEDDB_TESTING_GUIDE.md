# IndexedDB Performance Testing Guide

## Proof of Concept: Bestiary Page

This guide helps you test the IndexedDB caching implementation on the bestiary page.

## Prerequisites

1. Modern browser (Chrome, Firefox, Safari, Edge)
2. DevTools open (F12)
3. Console tab visible

## Testing Procedure

### Test 1: Cold Cache (First Load)

**Objective**: Establish baseline performance without IndexedDB cache

1. Clear all browser data:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Or use Incognito/Private mode

2. Navigate to `bestiary.html`

3. You should see in console:
   ```
   IndexedDB Caching: ENABLED (Proof of Concept)
   Performance testing commands:
     getIndexedDbPerformanceMetrics() - View cache performance
     ...
   ```

4. Note the initial page load time (check Network tab)

5. Check cache status:
   ```javascript
   getIndexedDbPerformanceMetrics()
   ```
   Expected output:
   ```
   {
     cacheHits: 0,
     cacheMisses: X,  // Number of JSON files loaded
     hitRate: "0.00%",
     avgCachedLoadTime: "0.00ms",
     totalLoadTime: "XXX.XXms"
   }
   ```

6. Check what was cached:
   ```javascript
   await getIndexedDbCacheStats()
   ```
   Expected output:
   ```
   {
     jsonCount: X,     // Number of JSON files cached
     entityCount: Y    // Number of entities cached
   }
   ```

### Test 2: Warm Cache (Second Load)

**Objective**: Measure performance improvement with IndexedDB cache

1. **Refresh the page** (F5 or Ctrl+R)

2. Note the page load time

3. Check cache performance:
   ```javascript
   getIndexedDbPerformanceMetrics()
   ```
   Expected output:
   ```
   {
     cacheHits: X,      // Should be > 0
     cacheMisses: Y,    // Should be low
     hitRate: "XX.XX%", // Should be high (>80%)
     avgCachedLoadTime: "X.XXms",  // Average time per cache hit
     totalLoadTime: "XXX.XXms"
   }
   ```

4. Compare metrics:
   - **Hit Rate**: Higher is better (target: >80%)
   - **Avg Cached Load Time**: Should be <5ms
   - **Overall Load Time**: Should be noticeably faster than cold cache

### Test 3: A/B Comparison (Disable IndexedDB)

**Objective**: Compare performance with and without IndexedDB

1. With IndexedDB enabled, refresh and note load time

2. Disable IndexedDB:
   ```javascript
   setIndexedDbEnabled(false)
   ```

3. Clear browser cache (Ctrl+Shift+R or hard refresh)

4. Refresh page and note load time

5. Compare the two load times

6. Re-enable IndexedDB:
   ```javascript
   setIndexedDbEnabled(true)
   ```

### Test 4: Cache Invalidation

**Objective**: Verify cache clears properly

1. Clear cache via UI:
   - Click hamburger menu (☰)
   - Settings → Preload Data → "Reset Preloaded Data"

2. Or via console:
   ```javascript
   await clearIndexedDbCache()
   ```

3. Verify cache was cleared:
   ```javascript
   await getIndexedDbCacheStats()
   ```
   Expected output:
   ```
   {
     jsonCount: 0,
     entityCount: 0
   }
   ```

4. Refresh page to rebuild cache

## Performance Metrics to Record

For documentation purposes, record:

1. **Cold Cache Load Time**: ___ ms (from Network tab)
2. **Warm Cache Load Time**: ___ ms (from Network tab)
3. **Improvement**: ____ % faster
4. **Cache Hit Rate**: ____ %
5. **Avg Cached Load Time**: ____ ms
6. **JSON Files Cached**: ____
7. **Entities Cached**: ____

## Expected Results

Based on typical browser performance:

- **Cold Cache**: Baseline (e.g., 2000ms)
- **Warm Cache**: 30-60% faster (e.g., 800-1400ms)
- **Hit Rate**: >80% on second load
- **Avg Cached Load Time**: <5ms
- **Cache Size**: 
  - JSON files: ~10-20 files
  - Entities: ~1000-3000 creatures

## Debugging

### If IndexedDB doesn't appear to be working:

1. Check if it's enabled:
   ```javascript
   IndexedDbUtil.isActive()  // Should return true
   ```

2. Check browser support:
   ```javascript
   IndexedDbUtil.isSupported()  // Should return true
   ```

3. Check for errors in console (red text)

4. Verify IndexedDB in DevTools:
   - Application tab → IndexedDB → 5etools-cache

### If performance isn't improving:

1. Ensure you're testing on the same browser/device
2. Clear all caches between tests
3. Check Network tab - cached requests should show "(from disk cache)" or similar
4. Try with different network conditions (throttle in DevTools)

## Browser DevTools - IndexedDB Inspection

To manually inspect cached data:

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **IndexedDB** → **5etools-cache**
4. View stores:
   - **json-cache**: Raw JSON files with URLs as keys
   - **entity-cache**: Processed entities with page:source:hash as keys
   - **meta-cache**: Metadata (cache version, etc.)

## Next Steps

After gathering performance data:

1. Document actual improvement percentages
2. Compare against expected results
3. Identify any issues or bottlenecks
4. If successful (>30% improvement), consider expanding to:
   - Spells page
   - Classes page
   - Items page
5. If not successful, investigate why and adjust implementation

## Reporting Results

When reporting results, include:

- Browser and version
- Device specs (CPU, RAM, storage type)
- Network conditions
- All metrics from "Performance Metrics to Record" section
- Any errors or unexpected behavior
- Screenshots of console output
