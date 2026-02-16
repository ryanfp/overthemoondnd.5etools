"use strict";

/**
 * IndexedDB wrapper for caching parsed JSON data and processed entities.
 * Provides a persistent cache layer to reduce parsing overhead across page loads.
 *
 * PROOF OF CONCEPT: Currently enabled for bestiary page only.
 */
globalThis.IndexedDbUtil = class {
	static DB_NAME = "5etools-cache";
	static DB_VERSION = 2; // Incremented for versioning support
	static STORE_JSON = "json-cache";
	static STORE_ENTITIES = "entity-cache";
	static STORE_META = "meta-cache";
	static CACHE_VERSION_KEY = "cache-version";

	static _db = null;
	static _initPromise = null;
	static _isEnabled = true; // Config flag - can be toggled for testing
	static _performanceMetrics = {
		cacheHits: 0,
		cacheMisses: 0,
		totalLoadTime: 0,
		cachedLoadTime: 0,
	};

	/**
	 * Enable or disable IndexedDB caching
	 * @param {boolean} enabled - Whether to enable IndexedDB
	 */
	static setEnabled (enabled) {
		this._isEnabled = enabled;
		// eslint-disable-next-line no-console
		console.log(`IndexedDB caching ${enabled ? "enabled" : "disabled"}`);
	}

	/**
	 * Check if IndexedDB is enabled and supported
	 * @returns {boolean}
	 */
	static isActive () {
		return this._isEnabled && this.isSupported();
	}

	/**
	 * Get performance metrics
	 * @returns {object}
	 */
	static getPerformanceMetrics () {
		return {...this._performanceMetrics};
	}

	/**
	 * Reset performance metrics
	 */
	static resetPerformanceMetrics () {
		this._performanceMetrics = {
			cacheHits: 0,
			cacheMisses: 0,
			totalLoadTime: 0,
			cachedLoadTime: 0,
		};
	}

	/**
	 * Initialize the IndexedDB database
	 * @returns {Promise<IDBDatabase>}
	 */
	static async pInit () {
		if (this._db) return this._db;
		if (this._initPromise) return this._initPromise;

		this._initPromise = new Promise((resolve, reject) => {
			const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				this._db = request.result;
				resolve(this._db);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				// Store for raw JSON data (keyed by URL)
				if (!db.objectStoreNames.contains(this.STORE_JSON)) {
					const jsonStore = db.createObjectStore(this.STORE_JSON, {keyPath: "url"});
					jsonStore.createIndex("timestamp", "timestamp", {unique: false});
					jsonStore.createIndex("revision", "revision", {unique: false});
				}

				// Store for parsed/merged entities (keyed by page:source:hash)
				if (!db.objectStoreNames.contains(this.STORE_ENTITIES)) {
					const entityStore = db.createObjectStore(this.STORE_ENTITIES, {keyPath: "key"});
					entityStore.createIndex("page", "page", {unique: false});
					entityStore.createIndex("timestamp", "timestamp", {unique: false});
				}

				// Store for metadata (cache version, etc.)
				if (!db.objectStoreNames.contains(this.STORE_META)) {
					db.createObjectStore(this.STORE_META, {keyPath: "key"});
				}
			};
		});

		await this._initPromise;

		// Validate cache version on init
		await this._pValidateCacheVersion();

		return this._db;
	}

	/**
	 * Validate cache version and clear if mismatch
	 * @private
	 */
	static async _pValidateCacheVersion () {
		try {
			// Try to get current cache version from service worker manifest
			const expectedVersion = await this._pGetServiceWorkerVersion();
			const storedVersion = await this.pGetMeta(this.CACHE_VERSION_KEY);

			if (expectedVersion && storedVersion !== expectedVersion) {
				// eslint-disable-next-line no-console
				console.log(`Cache version mismatch (stored: ${storedVersion}, expected: ${expectedVersion}). Clearing IndexedDB cache.`);
				await this.pClearAll();
				await this.pSetMeta(this.CACHE_VERSION_KEY, expectedVersion);
			} else if (expectedVersion && !storedVersion) {
				// First time - store version
				await this.pSetMeta(this.CACHE_VERSION_KEY, expectedVersion);
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn("Failed to validate cache version:", e);
		}
	}

	/**
	 * Get version from service worker if available
	 * @private
	 */
	static async _pGetServiceWorkerVersion () {
		// Use a combination of manifest timestamp or hash if available
		// For now, use a simple timestamp-based version
		try {
			if (typeof VERSION_NUMBER !== "undefined") {
				return VERSION_NUMBER;
			}
			return null;
		} catch (e) {
			return null;
		}
	}

	/**
	 * Store JSON data in cache
	 * @param {string} url - URL of the JSON file
	 * @param {*} data - JSON data to cache
	 * @param {string} [revision] - Optional revision hash for cache invalidation
	 * @returns {Promise<void>}
	 */
	static async pSetJson (url, data, revision = null) {
		if (!this.isActive()) return;

		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_JSON], "readwrite");
			const store = tx.objectStore(this.STORE_JSON);

			const entry = {
				url,
				data,
				revision,
				timestamp: Date.now(),
			};

			await new Promise((resolve, reject) => {
				const request = store.put(entry);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		} catch (e) {
			// Silently fail - IndexedDB is an optimization, not critical
			// eslint-disable-next-line no-console
			console.warn(`Failed to cache JSON for ${url}:`, e);
		}
	}

	/**
	 * Retrieve JSON data from cache
	 * @param {string} url - URL of the JSON file
	 * @param {string} [expectedRevision] - Optional revision to validate against
	 * @returns {Promise<*|null>} - Cached data or null if not found/invalid
	 */
	static async pGetJson (url, expectedRevision = null) {
		if (!this.isActive()) return null;

		const startTime = performance.now();
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_JSON], "readonly");
			const store = tx.objectStore(this.STORE_JSON);

			const entry = await new Promise((resolve, reject) => {
				const request = store.get(url);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});

			if (!entry) {
				this._performanceMetrics.cacheMisses++;
				return null;
			}

			// Validate revision if provided
			if (expectedRevision != null && entry.revision !== expectedRevision) {
				// Revision mismatch - delete stale entry
				await this.pDeleteJson(url);
				this._performanceMetrics.cacheMisses++;
				return null;
			}

			this._performanceMetrics.cacheHits++;
			this._performanceMetrics.cachedLoadTime += (performance.now() - startTime);
			return entry.data;
		} catch (e) {
			this._performanceMetrics.cacheMisses++;
			// eslint-disable-next-line no-console
			console.warn(`Failed to retrieve cached JSON for ${url}:`, e);
			return null;
		} finally {
			this._performanceMetrics.totalLoadTime += (performance.now() - startTime);
		}
	}

	/**
	 * Delete JSON data from cache
	 * @param {string} url - URL to delete
	 * @returns {Promise<void>}
	 */
	static async pDeleteJson (url) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_JSON], "readwrite");
			const store = tx.objectStore(this.STORE_JSON);

			await new Promise((resolve, reject) => {
				const request = store.delete(url);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to delete cached JSON for ${url}:`, e);
		}
	}

	/**
	 * Store processed entity in cache
	 * @param {string} page - Page type (e.g., "bestiary", "spells")
	 * @param {string} source - Source identifier
	 * @param {string} hash - Entity hash
	 * @param {*} entity - Processed entity data
	 * @returns {Promise<void>}
	 */
	static async pSetEntity (page, source, hash, entity) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_ENTITIES], "readwrite");
			const store = tx.objectStore(this.STORE_ENTITIES);

			const key = `${page}:${source}:${hash}`.toLowerCase();
			const entry = {
				key,
				page: page.toLowerCase(),
				source: source.toLowerCase(),
				hash: hash.toLowerCase(),
				entity,
				timestamp: Date.now(),
			};

			await new Promise((resolve, reject) => {
				const request = store.put(entry);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to cache entity ${page}:${source}:${hash}:`, e);
		}
	}

	/**
	 * Retrieve processed entity from cache
	 * @param {string} page - Page type
	 * @param {string} source - Source identifier
	 * @param {string} hash - Entity hash
	 * @returns {Promise<*|null>} - Cached entity or null if not found
	 */
	static async pGetEntity (page, source, hash) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_ENTITIES], "readonly");
			const store = tx.objectStore(this.STORE_ENTITIES);

			const key = `${page}:${source}:${hash}`.toLowerCase();
			const entry = await new Promise((resolve, reject) => {
				const request = store.get(key);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});

			return entry ? entry.entity : null;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to retrieve cached entity ${page}:${source}:${hash}:`, e);
			return null;
		}
	}

	/**
	 * Clear all cached data for a specific page
	 * @param {string} page - Page type to clear
	 * @returns {Promise<void>}
	 */
	static async pClearPage (page) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_ENTITIES], "readwrite");
			const store = tx.objectStore(this.STORE_ENTITIES);
			const index = store.index("page");

			const pageClean = page.toLowerCase();
			const keys = await new Promise((resolve, reject) => {
				const request = index.getAllKeys(pageClean);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});

			await Promise.all(keys.map(key => new Promise((resolve, reject) => {
				const request = store.delete(key);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			})));
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to clear page cache for ${page}:`, e);
		}
	}

	/**
	 * Clear all cached data
	 * @returns {Promise<void>}
	 */
	static async pClearAll () {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_JSON, this.STORE_ENTITIES, this.STORE_META], "readwrite");

			await Promise.all([
				new Promise((resolve, reject) => {
					const request = tx.objectStore(this.STORE_JSON).clear();
					request.onsuccess = () => resolve();
					request.onerror = () => reject(request.error);
				}),
				new Promise((resolve, reject) => {
					const request = tx.objectStore(this.STORE_ENTITIES).clear();
					request.onsuccess = () => resolve();
					request.onerror = () => reject(request.error);
				}),
				new Promise((resolve, reject) => {
					const request = tx.objectStore(this.STORE_META).clear();
					request.onsuccess = () => resolve();
					request.onerror = () => reject(request.error);
				}),
			]);

			// eslint-disable-next-line no-console
			console.log("IndexedDB cache cleared");
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn("Failed to clear IndexedDB cache:", e);
		}
	}

	/**
	 * Get cache statistics
	 * @returns {Promise<{jsonCount: number, entityCount: number}>}
	 */
	static async pGetStats () {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_JSON, this.STORE_ENTITIES], "readonly");

			const [jsonCount, entityCount] = await Promise.all([
				new Promise((resolve, reject) => {
					const request = tx.objectStore(this.STORE_JSON).count();
					request.onsuccess = () => resolve(request.result);
					request.onerror = () => reject(request.error);
				}),
				new Promise((resolve, reject) => {
					const request = tx.objectStore(this.STORE_ENTITIES).count();
					request.onsuccess = () => resolve(request.result);
					request.onerror = () => reject(request.error);
				}),
			]);

			return {jsonCount, entityCount};
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn("Failed to get cache stats:", e);
			return {jsonCount: 0, entityCount: 0};
		}
	}

	/**
	 * Store metadata
	 * @param {string} key - Metadata key
	 * @param {*} value - Metadata value
	 * @returns {Promise<void>}
	 */
	static async pSetMeta (key, value) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_META], "readwrite");
			const store = tx.objectStore(this.STORE_META);

			await new Promise((resolve, reject) => {
				const request = store.put({key, value, timestamp: Date.now()});
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to set metadata ${key}:`, e);
		}
	}

	/**
	 * Retrieve metadata
	 * @param {string} key - Metadata key
	 * @returns {Promise<*|null>}
	 */
	static async pGetMeta (key) {
		try {
			const db = await this.pInit();
			const tx = db.transaction([this.STORE_META], "readonly");
			const store = tx.objectStore(this.STORE_META);

			const entry = await new Promise((resolve, reject) => {
				const request = store.get(key);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});

			return entry ? entry.value : null;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn(`Failed to get metadata ${key}:`, e);
			return null;
		}
	}

	/**
	 * Check if IndexedDB is supported
	 * @returns {boolean}
	 */
	static isSupported () {
		return typeof indexedDB !== "undefined";
	}
};
