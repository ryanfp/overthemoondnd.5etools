"use strict";

/**
 * Service worker integration for IndexedDB cache management
 */
(function () {
	if (!("serviceWorker" in navigator)) return;

	// Listen for messages from service worker
	navigator.serviceWorker.addEventListener("message", async (event) => {
		if (event.data.type === "CLEAR_INDEXEDDB") {
			console.log("Received IndexedDB clear request from service worker");
			if (typeof IndexedDbUtil !== "undefined" && IndexedDbUtil.isSupported()) {
				try {
					await IndexedDbUtil.pClearAll();
					console.log("IndexedDB cache cleared successfully");
				} catch (e) {
					console.error("Failed to clear IndexedDB cache:", e);
				}
			}
		}
	});

	// Also expose a global function for manual cache clearing
	globalThis.clearIndexedDbCache = async function () {
		if (typeof IndexedDbUtil === "undefined" || !IndexedDbUtil.isSupported()) {
			console.warn("IndexedDB not supported or not loaded");
			return;
		}

		try {
			await IndexedDbUtil.pClearAll();
			const stats = await IndexedDbUtil.pGetStats();
			console.log("IndexedDB cache cleared. New stats:", stats);
			return true;
		} catch (e) {
			console.error("Failed to clear IndexedDB cache:", e);
			return false;
		}
	};

	// Expose a function to get cache statistics
	globalThis.getIndexedDbCacheStats = async function () {
		if (typeof IndexedDbUtil === "undefined" || !IndexedDbUtil.isSupported()) {
			console.warn("IndexedDB not supported or not loaded");
			return null;
		}

		try {
			return await IndexedDbUtil.pGetStats();
		} catch (e) {
			console.error("Failed to get IndexedDB cache stats:", e);
			return null;
		}
	};
})();
