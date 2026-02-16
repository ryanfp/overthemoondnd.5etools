"use strict";

/**
 * Service worker integration for IndexedDB cache management
 * PROOF OF CONCEPT: Currently enabled for bestiary page only.
 */
(function () {
	if (!("serviceWorker" in navigator)) return;

	// Listen for messages from service worker
	navigator.serviceWorker.addEventListener("message", async (event) => {
		if (event.data.type === "CLEAR_INDEXEDDB") {
			// eslint-disable-next-line no-console
			console.log("Received IndexedDB clear request from service worker");
			if (typeof IndexedDbUtil !== "undefined" && IndexedDbUtil.isSupported()) {
				try {
					await IndexedDbUtil.pClearAll();
					// eslint-disable-next-line no-console
					console.log("IndexedDB cache cleared successfully");
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error("Failed to clear IndexedDB cache:", e);
				}
			}
		}
	});

	// Expose a global function for manual cache clearing
	globalThis.clearIndexedDbCache = async function () {
		if (typeof IndexedDbUtil === "undefined" || !IndexedDbUtil.isSupported()) {
			// eslint-disable-next-line no-console
			console.warn("IndexedDB not supported or not loaded");
			return;
		}

		try {
			await IndexedDbUtil.pClearAll();
			await IndexedDbUtil.resetPerformanceMetrics();
			const stats = await IndexedDbUtil.pGetStats();
			// eslint-disable-next-line no-console
			console.log("IndexedDB cache cleared. New stats:", stats);
			return true;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error("Failed to clear IndexedDB cache:", e);
			return false;
		}
	};

	// Expose a function to get cache statistics
	globalThis.getIndexedDbCacheStats = async function () {
		if (typeof IndexedDbUtil === "undefined" || !IndexedDbUtil.isSupported()) {
			// eslint-disable-next-line no-console
			console.warn("IndexedDB not supported or not loaded");
			return null;
		}

		try {
			return await IndexedDbUtil.pGetStats();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error("Failed to get IndexedDB cache stats:", e);
			return null;
		}
	};

	// Expose a function to get performance metrics
	globalThis.getIndexedDbPerformanceMetrics = function () {
		if (typeof IndexedDbUtil === "undefined" || !IndexedDbUtil.isSupported()) {
			// eslint-disable-next-line no-console
			console.warn("IndexedDB not supported or not loaded");
			return null;
		}

		const metrics = IndexedDbUtil.getPerformanceMetrics();
		const hitRate = metrics.cacheHits + metrics.cacheMisses > 0
			? ((metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses)) * 100).toFixed(2)
			: 0;
		const avgCachedTime = metrics.cacheHits > 0
			? (metrics.cachedLoadTime / metrics.cacheHits).toFixed(2)
			: 0;

		return {
			...metrics,
			hitRate: `${hitRate}%`,
			avgCachedLoadTime: `${avgCachedTime}ms`,
			totalLoadTime: `${metrics.totalLoadTime.toFixed(2)}ms`,
		};
	};

	// Expose a function to enable/disable IndexedDB
	globalThis.setIndexedDbEnabled = function (enabled) {
		if (typeof IndexedDbUtil === "undefined") {
			// eslint-disable-next-line no-console
			console.warn("IndexedDB not loaded");
			return;
		}

		IndexedDbUtil.setEnabled(enabled);
	};

	// Print helpful message on bestiary page load
	if (typeof IndexedDbUtil !== "undefined" && IndexedDbUtil.isActive()) {
		// eslint-disable-next-line no-console
		console.log(
			"%cIndexedDB Caching: ENABLED (Proof of Concept)",
			"color: green; font-weight: bold;",
		);
		// eslint-disable-next-line no-console
		console.log(
			"Performance testing commands:\n"
			+ "  getIndexedDbPerformanceMetrics() - View cache performance\n"
			+ "  getIndexedDbCacheStats() - View cache size stats\n"
			+ "  clearIndexedDbCache() - Clear all cached data\n"
			+ "  setIndexedDbEnabled(false) - Disable caching",
		);
	}
})();
