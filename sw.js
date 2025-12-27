(() => {
  // node_modules/workbox-core/_version.js
  try {
    self["workbox:core:7.0.0"] && _();
  } catch (e) {
  }

  // node_modules/workbox-core/models/messages/messages.js
  var messages = {
    "invalid-value": ({ paramName, validValueDescription, value }) => {
      if (!paramName || !validValueDescription) {
        throw new Error(`Unexpected input to 'invalid-value' error.`);
      }
      return `The '${paramName}' parameter was given a value with an unexpected value. ${validValueDescription} Received a value of ${JSON.stringify(value)}.`;
    },
    "not-an-array": ({ moduleName, className, funcName, paramName }) => {
      if (!moduleName || !className || !funcName || !paramName) {
        throw new Error(`Unexpected input to 'not-an-array' error.`);
      }
      return `The parameter '${paramName}' passed into '${moduleName}.${className}.${funcName}()' must be an array.`;
    },
    "incorrect-type": ({ expectedType, paramName, moduleName, className, funcName }) => {
      if (!expectedType || !paramName || !moduleName || !funcName) {
        throw new Error(`Unexpected input to 'incorrect-type' error.`);
      }
      const classNameStr = className ? `${className}.` : "";
      return `The parameter '${paramName}' passed into '${moduleName}.${classNameStr}${funcName}()' must be of type ${expectedType}.`;
    },
    "incorrect-class": ({ expectedClassName, paramName, moduleName, className, funcName, isReturnValueProblem }) => {
      if (!expectedClassName || !moduleName || !funcName) {
        throw new Error(`Unexpected input to 'incorrect-class' error.`);
      }
      const classNameStr = className ? `${className}.` : "";
      if (isReturnValueProblem) {
        return `The return value from '${moduleName}.${classNameStr}${funcName}()' must be an instance of class ${expectedClassName}.`;
      }
      return `The parameter '${paramName}' passed into '${moduleName}.${classNameStr}${funcName}()' must be an instance of class ${expectedClassName}.`;
    },
    "missing-a-method": ({ expectedMethod, paramName, moduleName, className, funcName }) => {
      if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
        throw new Error(`Unexpected input to 'missing-a-method' error.`);
      }
      return `${moduleName}.${className}.${funcName}() expected the '${paramName}' parameter to expose a '${expectedMethod}' method.`;
    },
    "add-to-cache-list-unexpected-type": ({ entry }) => {
      return `An unexpected entry was passed to 'workbox-precaching.PrecacheController.addToCacheList()' The entry '${JSON.stringify(entry)}' isn't supported. You must supply an array of strings with one or more characters, objects with a url property or Request objects.`;
    },
    "add-to-cache-list-conflicting-entries": ({ firstEntry, secondEntry }) => {
      if (!firstEntry || !secondEntry) {
        throw new Error(`Unexpected input to 'add-to-cache-list-duplicate-entries' error.`);
      }
      return `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${firstEntry} but different revision details. Workbox is unable to cache and version the asset correctly. Please remove one of the entries.`;
    },
    "plugin-error-request-will-fetch": ({ thrownErrorMessage }) => {
      if (!thrownErrorMessage) {
        throw new Error(`Unexpected input to 'plugin-error-request-will-fetch', error.`);
      }
      return `An error was thrown by a plugins 'requestWillFetch()' method. The thrown error message was: '${thrownErrorMessage}'.`;
    },
    "invalid-cache-name": ({ cacheNameId, value }) => {
      if (!cacheNameId) {
        throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
      }
      return `You must provide a name containing at least one character for setCacheDetails({${cacheNameId}: '...'}). Received a value of '${JSON.stringify(value)}'`;
    },
    "unregister-route-but-not-found-with-method": ({ method }) => {
      if (!method) {
        throw new Error(`Unexpected input to 'unregister-route-but-not-found-with-method' error.`);
      }
      return `The route you're trying to unregister was not  previously registered for the method type '${method}'.`;
    },
    "unregister-route-route-not-registered": () => {
      return `The route you're trying to unregister was not previously registered.`;
    },
    "queue-replay-failed": ({ name }) => {
      return `Replaying the background sync queue '${name}' failed.`;
    },
    "duplicate-queue-name": ({ name }) => {
      return `The Queue name '${name}' is already being used. All instances of backgroundSync.Queue must be given unique names.`;
    },
    "expired-test-without-max-age": ({ methodName, paramName }) => {
      return `The '${methodName}()' method can only be used when the '${paramName}' is used in the constructor.`;
    },
    "unsupported-route-type": ({ moduleName, className, funcName, paramName }) => {
      return `The supplied '${paramName}' parameter was an unsupported type. Please check the docs for ${moduleName}.${className}.${funcName} for valid input types.`;
    },
    "not-array-of-class": ({ value, expectedClass, moduleName, className, funcName, paramName }) => {
      return `The supplied '${paramName}' parameter must be an array of '${expectedClass}' objects. Received '${JSON.stringify(value)},'. Please check the call to ${moduleName}.${className}.${funcName}() to fix the issue.`;
    },
    "max-entries-or-age-required": ({ moduleName, className, funcName }) => {
      return `You must define either config.maxEntries or config.maxAgeSecondsin ${moduleName}.${className}.${funcName}`;
    },
    "statuses-or-headers-required": ({ moduleName, className, funcName }) => {
      return `You must define either config.statuses or config.headersin ${moduleName}.${className}.${funcName}`;
    },
    "invalid-string": ({ moduleName, funcName, paramName }) => {
      if (!paramName || !moduleName || !funcName) {
        throw new Error(`Unexpected input to 'invalid-string' error.`);
      }
      return `When using strings, the '${paramName}' parameter must start with 'http' (for cross-origin matches) or '/' (for same-origin matches). Please see the docs for ${moduleName}.${funcName}() for more info.`;
    },
    "channel-name-required": () => {
      return `You must provide a channelName to construct a BroadcastCacheUpdate instance.`;
    },
    "invalid-responses-are-same-args": () => {
      return `The arguments passed into responsesAreSame() appear to be invalid. Please ensure valid Responses are used.`;
    },
    "expire-custom-caches-only": () => {
      return `You must provide a 'cacheName' property when using the expiration plugin with a runtime caching strategy.`;
    },
    "unit-must-be-bytes": ({ normalizedRangeHeader }) => {
      if (!normalizedRangeHeader) {
        throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
      }
      return `The 'unit' portion of the Range header must be set to 'bytes'. The Range header provided was "${normalizedRangeHeader}"`;
    },
    "single-range-only": ({ normalizedRangeHeader }) => {
      if (!normalizedRangeHeader) {
        throw new Error(`Unexpected input to 'single-range-only' error.`);
      }
      return `Multiple ranges are not supported. Please use a  single start value, and optional end value. The Range header provided was "${normalizedRangeHeader}"`;
    },
    "invalid-range-values": ({ normalizedRangeHeader }) => {
      if (!normalizedRangeHeader) {
        throw new Error(`Unexpected input to 'invalid-range-values' error.`);
      }
      return `The Range header is missing both start and end values. At least one of those values is needed. The Range header provided was "${normalizedRangeHeader}"`;
    },
    "no-range-header": () => {
      return `No Range header was found in the Request provided.`;
    },
    "range-not-satisfiable": ({ size, start, end }) => {
      return `The start (${start}) and end (${end}) values in the Range are not satisfiable by the cached response, which is ${size} bytes.`;
    },
    "attempt-to-cache-non-get-request": ({ url, method }) => {
      return `Unable to cache '${url}' because it is a '${method}' request and only 'GET' requests can be cached.`;
    },
    "cache-put-with-no-response": ({ url }) => {
      return `There was an attempt to cache '${url}' but the response was not defined.`;
    },
    "no-response": ({ url, error }) => {
      let message = `The strategy could not generate a response for '${url}'.`;
      if (error) {
        message += ` The underlying error is ${error}.`;
      }
      return message;
    },
    "bad-precaching-response": ({ url, status }) => {
      return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
    },
    "non-precached-url": ({ url }) => {
      return `createHandlerBoundToURL('${url}') was called, but that URL is not precached. Please pass in a URL that is precached instead.`;
    },
    "add-to-cache-list-conflicting-integrities": ({ url }) => {
      return `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${url} with different integrity values. Please remove one of them.`;
    },
    "missing-precache-entry": ({ cacheName, url }) => {
      return `Unable to find a precached response in ${cacheName} for ${url}.`;
    },
    "cross-origin-copy-response": ({ origin }) => {
      return `workbox-core.copyResponse() can only be used with same-origin responses. It was passed a response with origin ${origin}.`;
    },
    "opaque-streams-source": ({ type }) => {
      const message = `One of the workbox-streams sources resulted in an '${type}' response.`;
      if (type === "opaqueredirect") {
        return `${message} Please do not use a navigation request that results in a redirect as a source.`;
      }
      return `${message} Please ensure your sources are CORS-enabled.`;
    }
  };

  // node_modules/workbox-core/models/messages/messageGenerator.js
  var generatorFunction = (code, details = {}) => {
    const message = messages[code];
    if (!message) {
      throw new Error(`Unable to find message for code '${code}'.`);
    }
    return message(details);
  };
  var messageGenerator = false ? fallback : generatorFunction;

  // node_modules/workbox-core/_private/WorkboxError.js
  var WorkboxError = class extends Error {
    /**
     *
     * @param {string} errorCode The error code that
     * identifies this particular error.
     * @param {Object=} details Any relevant arguments
     * that will help developers identify issues should
     * be added as a key on the context object.
     */
    constructor(errorCode, details) {
      const message = messageGenerator(errorCode, details);
      super(message);
      this.name = errorCode;
      this.details = details;
    }
  };

  // node_modules/workbox-core/_private/assert.js
  var isArray = (value, details) => {
    if (!Array.isArray(value)) {
      throw new WorkboxError("not-an-array", details);
    }
  };
  var hasMethod = (object, expectedMethod, details) => {
    const type = typeof object[expectedMethod];
    if (type !== "function") {
      details["expectedMethod"] = expectedMethod;
      throw new WorkboxError("missing-a-method", details);
    }
  };
  var isType = (object, expectedType, details) => {
    if (typeof object !== expectedType) {
      details["expectedType"] = expectedType;
      throw new WorkboxError("incorrect-type", details);
    }
  };
  var isInstance = (object, expectedClass, details) => {
    if (!(object instanceof expectedClass)) {
      details["expectedClassName"] = expectedClass.name;
      throw new WorkboxError("incorrect-class", details);
    }
  };
  var isOneOf = (value, validValues, details) => {
    if (!validValues.includes(value)) {
      details["validValueDescription"] = `Valid values are ${JSON.stringify(validValues)}.`;
      throw new WorkboxError("invalid-value", details);
    }
  };
  var isArrayOfClass = (value, expectedClass, details) => {
    const error = new WorkboxError("not-array-of-class", details);
    if (!Array.isArray(value)) {
      throw error;
    }
    for (const item of value) {
      if (!(item instanceof expectedClass)) {
        throw error;
      }
    }
  };
  var finalAssertExports = false ? null : {
    hasMethod,
    isArray,
    isInstance,
    isOneOf,
    isType,
    isArrayOfClass
  };

  // node_modules/workbox-core/_private/cacheNames.js
  var _cacheNameDetails = {
    googleAnalytics: "googleAnalytics",
    precache: "precache-v2",
    prefix: "workbox",
    runtime: "runtime",
    suffix: typeof registration !== "undefined" ? registration.scope : ""
  };
  var _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter((value) => value && value.length > 0).join("-");
  };
  var eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
      fn(key);
    }
  };
  var cacheNames = {
    updateDetails: (details) => {
      eachCacheNameDetail((key) => {
        if (typeof details[key] === "string") {
          _cacheNameDetails[key] = details[key];
        }
      });
    },
    getGoogleAnalyticsName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
      return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
      return _cacheNameDetails.suffix;
    }
  };

  // node_modules/workbox-core/_private/logger.js
  var logger = false ? null : (() => {
    if (!("__WB_DISABLE_DEV_LOGS" in globalThis)) {
      self.__WB_DISABLE_DEV_LOGS = false;
    }
    let inGroup = false;
    const methodToColorMap = {
      debug: `#7f8c8d`,
      log: `#2ecc71`,
      warn: `#f39c12`,
      error: `#c0392b`,
      groupCollapsed: `#3498db`,
      groupEnd: null
      // No colored prefix on groupEnd
    };
    const print = function(method, args) {
      if (self.__WB_DISABLE_DEV_LOGS) {
        return;
      }
      if (method === "groupCollapsed") {
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          console[method](...args);
          return;
        }
      }
      const styles = [
        `background: ${methodToColorMap[method]}`,
        `border-radius: 0.5em`,
        `color: white`,
        `font-weight: bold`,
        `padding: 2px 0.5em`
      ];
      const logPrefix = inGroup ? [] : ["%cworkbox", styles.join(";")];
      console[method](...logPrefix, ...args);
      if (method === "groupCollapsed") {
        inGroup = true;
      }
      if (method === "groupEnd") {
        inGroup = false;
      }
    };
    const api = {};
    const loggerMethods = Object.keys(methodToColorMap);
    for (const key of loggerMethods) {
      const method = key;
      api[method] = (...args) => {
        print(method, args);
      };
    }
    return api;
  })();

  // node_modules/workbox-core/_private/waitUntil.js
  function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
  }

  // node_modules/workbox-precaching/_version.js
  try {
    self["workbox:precaching:7.0.0"] && _();
  } catch (e) {
  }

  // node_modules/workbox-precaching/utils/createCacheKey.js
  var REVISION_SEARCH_PARAM = "__WB_REVISION__";
  function createCacheKey(entry) {
    if (!entry) {
      throw new WorkboxError("add-to-cache-list-unexpected-type", { entry });
    }
    if (typeof entry === "string") {
      const urlObject = new URL(entry, location.href);
      return {
        cacheKey: urlObject.href,
        url: urlObject.href
      };
    }
    const { revision, url } = entry;
    if (!url) {
      throw new WorkboxError("add-to-cache-list-unexpected-type", { entry });
    }
    if (!revision) {
      const urlObject = new URL(url, location.href);
      return {
        cacheKey: urlObject.href,
        url: urlObject.href
      };
    }
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
      cacheKey: cacheKeyURL.href,
      url: originalURL.href
    };
  }

  // node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js
  var PrecacheInstallReportPlugin = class {
    constructor() {
      this.updatedURLs = [];
      this.notUpdatedURLs = [];
      this.handlerWillStart = async ({ request, state }) => {
        if (state) {
          state.originalRequest = request;
        }
      };
      this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse }) => {
        if (event.type === "install") {
          if (state && state.originalRequest && state.originalRequest instanceof Request) {
            const url = state.originalRequest.url;
            if (cachedResponse) {
              this.notUpdatedURLs.push(url);
            } else {
              this.updatedURLs.push(url);
            }
          }
        }
        return cachedResponse;
      };
    }
  };

  // node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js
  var PrecacheCacheKeyPlugin = class {
    constructor({ precacheController: precacheController2 }) {
      this.cacheKeyWillBeUsed = async ({ request, params }) => {
        const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) || this._precacheController.getCacheKeyForURL(request.url);
        return cacheKey ? new Request(cacheKey, { headers: request.headers }) : request;
      };
      this._precacheController = precacheController2;
    }
  };

  // node_modules/workbox-precaching/utils/printCleanupDetails.js
  var logGroup = (groupTitle, deletedURLs) => {
    logger.groupCollapsed(groupTitle);
    for (const url of deletedURLs) {
      logger.log(url);
    }
    logger.groupEnd();
  };
  function printCleanupDetails(deletedURLs) {
    const deletionCount = deletedURLs.length;
    if (deletionCount > 0) {
      logger.groupCollapsed(`During precaching cleanup, ${deletionCount} cached request${deletionCount === 1 ? " was" : "s were"} deleted.`);
      logGroup("Deleted Cache Requests", deletedURLs);
      logger.groupEnd();
    }
  }

  // node_modules/workbox-precaching/utils/printInstallDetails.js
  function _nestedGroup(groupTitle, urls) {
    if (urls.length === 0) {
      return;
    }
    logger.groupCollapsed(groupTitle);
    for (const url of urls) {
      logger.log(url);
    }
    logger.groupEnd();
  }
  function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
    const precachedCount = urlsToPrecache.length;
    const alreadyPrecachedCount = urlsAlreadyPrecached.length;
    if (precachedCount || alreadyPrecachedCount) {
      let message = `Precaching ${precachedCount} file${precachedCount === 1 ? "" : "s"}.`;
      if (alreadyPrecachedCount > 0) {
        message += ` ${alreadyPrecachedCount} file${alreadyPrecachedCount === 1 ? " is" : "s are"} already cached.`;
      }
      logger.groupCollapsed(message);
      _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
      _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
      logger.groupEnd();
    }
  }

  // node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js
  var supportStatus;
  function canConstructResponseFromBodyStream() {
    if (supportStatus === void 0) {
      const testResponse = new Response("");
      if ("body" in testResponse) {
        try {
          new Response(testResponse.body);
          supportStatus = true;
        } catch (error) {
          supportStatus = false;
        }
      }
      supportStatus = false;
    }
    return supportStatus;
  }

  // node_modules/workbox-core/copyResponse.js
  async function copyResponse(response, modifier) {
    let origin = null;
    if (response.url) {
      const responseURL = new URL(response.url);
      origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
      throw new WorkboxError("cross-origin-copy-response", { origin });
    }
    const clonedResponse = response.clone();
    const responseInit = {
      headers: new Headers(clonedResponse.headers),
      status: clonedResponse.status,
      statusText: clonedResponse.statusText
    };
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    const body = canConstructResponseFromBodyStream() ? clonedResponse.body : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
  }

  // node_modules/workbox-core/_private/getFriendlyURL.js
  var getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    return urlObj.href.replace(new RegExp(`^${location.origin}`), "");
  };

  // node_modules/workbox-core/_private/cacheMatchIgnoreParams.js
  function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
      strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
  }
  async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    if (request.url === strippedRequestURL) {
      return cache.match(request, matchOptions);
    }
    const keysOptions = Object.assign(Object.assign({}, matchOptions), { ignoreSearch: true });
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
      const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
      if (strippedRequestURL === strippedCacheKeyURL) {
        return cache.match(cacheKey, matchOptions);
      }
    }
    return;
  }

  // node_modules/workbox-core/_private/Deferred.js
  var Deferred = class {
    /**
     * Creates a promise and exposes its resolve and reject functions as methods.
     */
    constructor() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  };

  // node_modules/workbox-core/models/quotaErrorCallbacks.js
  var quotaErrorCallbacks = /* @__PURE__ */ new Set();

  // node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js
  async function executeQuotaErrorCallbacks() {
    if (true) {
      logger.log(`About to run ${quotaErrorCallbacks.size} callbacks to clean up caches.`);
    }
    for (const callback of quotaErrorCallbacks) {
      await callback();
      if (true) {
        logger.log(callback, "is complete.");
      }
    }
    if (true) {
      logger.log("Finished running callbacks.");
    }
  }

  // node_modules/workbox-core/_private/timeout.js
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // node_modules/workbox-strategies/_version.js
  try {
    self["workbox:strategies:7.0.0"] && _();
  } catch (e) {
  }

  // node_modules/workbox-strategies/StrategyHandler.js
  function toRequest(input) {
    return typeof input === "string" ? new Request(input) : input;
  }
  var StrategyHandler = class {
    /**
     * Creates a new instance associated with the passed strategy and event
     * that's handling the request.
     *
     * The constructor also initializes the state that will be passed to each of
     * the plugins handling this request.
     *
     * @param {workbox-strategies.Strategy} strategy
     * @param {Object} options
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params] The return value from the
     *     {@link workbox-routing~matchCallback} (if applicable).
     */
    constructor(strategy, options) {
      this._cacheKeys = {};
      if (true) {
        finalAssertExports.isInstance(options.event, ExtendableEvent, {
          moduleName: "workbox-strategies",
          className: "StrategyHandler",
          funcName: "constructor",
          paramName: "options.event"
        });
      }
      Object.assign(this, options);
      this.event = options.event;
      this._strategy = strategy;
      this._handlerDeferred = new Deferred();
      this._extendLifetimePromises = [];
      this._plugins = [...strategy.plugins];
      this._pluginStateMap = /* @__PURE__ */ new Map();
      for (const plugin of this._plugins) {
        this._pluginStateMap.set(plugin, {});
      }
      this.event.waitUntil(this._handlerDeferred.promise);
    }
    /**
     * Fetches a given request (and invokes any applicable plugin callback
     * methods) using the `fetchOptions` (for non-navigation requests) and
     * `plugins` defined on the `Strategy` object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - `requestWillFetch()`
     * - `fetchDidSucceed()`
     * - `fetchDidFail()`
     *
     * @param {Request|string} input The URL or request to fetch.
     * @return {Promise<Response>}
     */
    async fetch(input) {
      const { event } = this;
      let request = toRequest(input);
      if (request.mode === "navigate" && event instanceof FetchEvent && event.preloadResponse) {
        const possiblePreloadResponse = await event.preloadResponse;
        if (possiblePreloadResponse) {
          if (true) {
            logger.log(`Using a preloaded navigation response for '${getFriendlyURL(request.url)}'`);
          }
          return possiblePreloadResponse;
        }
      }
      const originalRequest = this.hasCallback("fetchDidFail") ? request.clone() : null;
      try {
        for (const cb of this.iterateCallbacks("requestWillFetch")) {
          request = await cb({ request: request.clone(), event });
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new WorkboxError("plugin-error-request-will-fetch", {
            thrownErrorMessage: err.message
          });
        }
      }
      const pluginFilteredRequest = request.clone();
      try {
        let fetchResponse;
        fetchResponse = await fetch(request, request.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
        if (true) {
          logger.debug(`Network request for '${getFriendlyURL(request.url)}' returned a response with status '${fetchResponse.status}'.`);
        }
        for (const callback of this.iterateCallbacks("fetchDidSucceed")) {
          fetchResponse = await callback({
            event,
            request: pluginFilteredRequest,
            response: fetchResponse
          });
        }
        return fetchResponse;
      } catch (error) {
        if (true) {
          logger.log(`Network request for '${getFriendlyURL(request.url)}' threw an error.`, error);
        }
        if (originalRequest) {
          await this.runCallbacks("fetchDidFail", {
            error,
            event,
            originalRequest: originalRequest.clone(),
            request: pluginFilteredRequest.clone()
          });
        }
        throw error;
      }
    }
    /**
     * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
     * the response generated by `this.fetch()`.
     *
     * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
     * so you do not have to manually call `waitUntil()` on the event.
     *
     * @param {Request|string} input The request or URL to fetch and cache.
     * @return {Promise<Response>}
     */
    async fetchAndCachePut(input) {
      const response = await this.fetch(input);
      const responseClone = response.clone();
      void this.waitUntil(this.cachePut(input, responseClone));
      return response;
    }
    /**
     * Matches a request from the cache (and invokes any applicable plugin
     * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
     * defined on the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cachedResponseWillByUsed()
     *
     * @param {Request|string} key The Request or URL to use as the cache key.
     * @return {Promise<Response|undefined>} A matching response, if found.
     */
    async cacheMatch(key) {
      const request = toRequest(key);
      let cachedResponse;
      const { cacheName, matchOptions } = this._strategy;
      const effectiveRequest = await this.getCacheKey(request, "read");
      const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), { cacheName });
      cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
      if (true) {
        if (cachedResponse) {
          logger.debug(`Found a cached response in '${cacheName}'.`);
        } else {
          logger.debug(`No cached response found in '${cacheName}'.`);
        }
      }
      for (const callback of this.iterateCallbacks("cachedResponseWillBeUsed")) {
        cachedResponse = await callback({
          cacheName,
          matchOptions,
          cachedResponse,
          request: effectiveRequest,
          event: this.event
        }) || void 0;
      }
      return cachedResponse;
    }
    /**
     * Puts a request/response pair in the cache (and invokes any applicable
     * plugin callback methods) using the `cacheName` and `plugins` defined on
     * the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cacheWillUpdate()
     * - cacheDidUpdate()
     *
     * @param {Request|string} key The request or URL to use as the cache key.
     * @param {Response} response The response to cache.
     * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
     * not be cached, and `true` otherwise.
     */
    async cachePut(key, response) {
      const request = toRequest(key);
      await timeout(0);
      const effectiveRequest = await this.getCacheKey(request, "write");
      if (true) {
        if (effectiveRequest.method && effectiveRequest.method !== "GET") {
          throw new WorkboxError("attempt-to-cache-non-get-request", {
            url: getFriendlyURL(effectiveRequest.url),
            method: effectiveRequest.method
          });
        }
        const vary = response.headers.get("Vary");
        if (vary) {
          logger.debug(`The response for ${getFriendlyURL(effectiveRequest.url)} has a 'Vary: ${vary}' header. Consider setting the {ignoreVary: true} option on your strategy to ensure cache matching and deletion works as expected.`);
        }
      }
      if (!response) {
        if (true) {
          logger.error(`Cannot cache non-existent response for '${getFriendlyURL(effectiveRequest.url)}'.`);
        }
        throw new WorkboxError("cache-put-with-no-response", {
          url: getFriendlyURL(effectiveRequest.url)
        });
      }
      const responseToCache = await this._ensureResponseSafeToCache(response);
      if (!responseToCache) {
        if (true) {
          logger.debug(`Response '${getFriendlyURL(effectiveRequest.url)}' will not be cached.`, responseToCache);
        }
        return false;
      }
      const { cacheName, matchOptions } = this._strategy;
      const cache = await self.caches.open(cacheName);
      const hasCacheUpdateCallback = this.hasCallback("cacheDidUpdate");
      const oldResponse = hasCacheUpdateCallback ? await cacheMatchIgnoreParams(
        // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
        // feature. Consider into ways to only add this behavior if using
        // precaching.
        cache,
        effectiveRequest.clone(),
        ["__WB_REVISION__"],
        matchOptions
      ) : null;
      if (true) {
        logger.debug(`Updating the '${cacheName}' cache with a new Response for ${getFriendlyURL(effectiveRequest.url)}.`);
      }
      try {
        await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "QuotaExceededError") {
            await executeQuotaErrorCallbacks();
          }
          throw error;
        }
      }
      for (const callback of this.iterateCallbacks("cacheDidUpdate")) {
        await callback({
          cacheName,
          oldResponse,
          newResponse: responseToCache.clone(),
          request: effectiveRequest,
          event: this.event
        });
      }
      return true;
    }
    /**
     * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
     * executes any of those callbacks found in sequence. The final `Request`
     * object returned by the last plugin is treated as the cache key for cache
     * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
     * been registered, the passed request is returned unmodified
     *
     * @param {Request} request
     * @param {string} mode
     * @return {Promise<Request>}
     */
    async getCacheKey(request, mode) {
      const key = `${request.url} | ${mode}`;
      if (!this._cacheKeys[key]) {
        let effectiveRequest = request;
        for (const callback of this.iterateCallbacks("cacheKeyWillBeUsed")) {
          effectiveRequest = toRequest(await callback({
            mode,
            request: effectiveRequest,
            event: this.event,
            // params has a type any can't change right now.
            params: this.params
            // eslint-disable-line
          }));
        }
        this._cacheKeys[key] = effectiveRequest;
      }
      return this._cacheKeys[key];
    }
    /**
     * Returns true if the strategy has at least one plugin with the given
     * callback.
     *
     * @param {string} name The name of the callback to check for.
     * @return {boolean}
     */
    hasCallback(name) {
      for (const plugin of this._strategy.plugins) {
        if (name in plugin) {
          return true;
        }
      }
      return false;
    }
    /**
     * Runs all plugin callbacks matching the given name, in order, passing the
     * given param object (merged ith the current plugin state) as the only
     * argument.
     *
     * Note: since this method runs all plugins, it's not suitable for cases
     * where the return value of a callback needs to be applied prior to calling
     * the next callback. See
     * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
     * below for how to handle that case.
     *
     * @param {string} name The name of the callback to run within each plugin.
     * @param {Object} param The object to pass as the first (and only) param
     *     when executing each callback. This object will be merged with the
     *     current plugin state prior to callback execution.
     */
    async runCallbacks(name, param) {
      for (const callback of this.iterateCallbacks(name)) {
        await callback(param);
      }
    }
    /**
     * Accepts a callback and returns an iterable of matching plugin callbacks,
     * where each callback is wrapped with the current handler state (i.e. when
     * you call each callback, whatever object parameter you pass it will
     * be merged with the plugin's current state).
     *
     * @param {string} name The name fo the callback to run
     * @return {Array<Function>}
     */
    *iterateCallbacks(name) {
      for (const plugin of this._strategy.plugins) {
        if (typeof plugin[name] === "function") {
          const state = this._pluginStateMap.get(plugin);
          const statefulCallback = (param) => {
            const statefulParam = Object.assign(Object.assign({}, param), { state });
            return plugin[name](statefulParam);
          };
          yield statefulCallback;
        }
      }
    }
    /**
     * Adds a promise to the
     * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
     * of the event event associated with the request being handled (usually a
     * `FetchEvent`).
     *
     * Note: you can await
     * {@link workbox-strategies.StrategyHandler~doneWaiting}
     * to know when all added promises have settled.
     *
     * @param {Promise} promise A promise to add to the extend lifetime promises
     *     of the event that triggered the request.
     */
    waitUntil(promise) {
      this._extendLifetimePromises.push(promise);
      return promise;
    }
    /**
     * Returns a promise that resolves once all promises passed to
     * {@link workbox-strategies.StrategyHandler~waitUntil}
     * have settled.
     *
     * Note: any work done after `doneWaiting()` settles should be manually
     * passed to an event's `waitUntil()` method (not this handler's
     * `waitUntil()` method), otherwise the service worker thread my be killed
     * prior to your work completing.
     */
    async doneWaiting() {
      let promise;
      while (promise = this._extendLifetimePromises.shift()) {
        await promise;
      }
    }
    /**
     * Stops running the strategy and immediately resolves any pending
     * `waitUntil()` promises.
     */
    destroy() {
      this._handlerDeferred.resolve(null);
    }
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Request} options.request
     * @param {Response} options.response
     * @return {Promise<Response|undefined>}
     *
     * @private
     */
    async _ensureResponseSafeToCache(response) {
      let responseToCache = response;
      let pluginsUsed = false;
      for (const callback of this.iterateCallbacks("cacheWillUpdate")) {
        responseToCache = await callback({
          request: this.request,
          response: responseToCache,
          event: this.event
        }) || void 0;
        pluginsUsed = true;
        if (!responseToCache) {
          break;
        }
      }
      if (!pluginsUsed) {
        if (responseToCache && responseToCache.status !== 200) {
          responseToCache = void 0;
        }
        if (true) {
          if (responseToCache) {
            if (responseToCache.status !== 200) {
              if (responseToCache.status === 0) {
                logger.warn(`The response for '${this.request.url}' is an opaque response. The caching strategy that you're using will not cache opaque responses by default.`);
              } else {
                logger.debug(`The response for '${this.request.url}' returned a status code of '${response.status}' and won't be cached as a result.`);
              }
            }
          }
        }
      }
      return responseToCache;
    }
  };

  // node_modules/workbox-strategies/Strategy.js
  var Strategy = class {
    /**
     * Creates a new instance of the strategy and sets all documented option
     * properties as public instance properties.
     *
     * Note: if a custom strategy class extends the base Strategy class and does
     * not need more than these properties, it does not need to define its own
     * constructor.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     */
    constructor(options = {}) {
      this.cacheName = cacheNames.getRuntimeName(options.cacheName);
      this.plugins = options.plugins || [];
      this.fetchOptions = options.fetchOptions;
      this.matchOptions = options.matchOptions;
    }
    /**
     * Perform a request strategy and returns a `Promise` that will resolve with
     * a `Response`, invoking all relevant plugin callbacks.
     *
     * When a strategy instance is registered with a Workbox
     * {@link workbox-routing.Route}, this method is automatically
     * called when the route matches.
     *
     * Alternatively, this method can be used in a standalone `FetchEvent`
     * listener by passing it to `event.respondWith()`.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     */
    handle(options) {
      const [responseDone] = this.handleAll(options);
      return responseDone;
    }
    /**
     * Similar to {@link workbox-strategies.Strategy~handle}, but
     * instead of just returning a `Promise` that resolves to a `Response` it
     * it will return an tuple of `[response, done]` promises, where the former
     * (`response`) is equivalent to what `handle()` returns, and the latter is a
     * Promise that will resolve once any promises that were added to
     * `event.waitUntil()` as part of performing the strategy have completed.
     *
     * You can await the `done` promise to ensure any extra work performed by
     * the strategy (usually caching responses) completes successfully.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     * @return {Array<Promise>} A tuple of [response, done]
     *     promises that can be used to determine when the response resolves as
     *     well as when the handler has completed all its work.
     */
    handleAll(options) {
      if (options instanceof FetchEvent) {
        options = {
          event: options,
          request: options.request
        };
      }
      const event = options.event;
      const request = typeof options.request === "string" ? new Request(options.request) : options.request;
      const params = "params" in options ? options.params : void 0;
      const handler = new StrategyHandler(this, { event, request, params });
      const responseDone = this._getResponse(handler, request, event);
      const handlerDone = this._awaitComplete(responseDone, handler, request, event);
      return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
      await handler.runCallbacks("handlerWillStart", { event, request });
      let response = void 0;
      try {
        response = await this._handle(request, handler);
        if (!response || response.type === "error") {
          throw new WorkboxError("no-response", { url: request.url });
        }
      } catch (error) {
        if (error instanceof Error) {
          for (const callback of handler.iterateCallbacks("handlerDidError")) {
            response = await callback({ error, event, request });
            if (response) {
              break;
            }
          }
        }
        if (!response) {
          throw error;
        } else if (true) {
          logger.log(`While responding to '${getFriendlyURL(request.url)}', an ${error instanceof Error ? error.toString() : ""} error occurred. Using a fallback response provided by a handlerDidError plugin.`);
        }
      }
      for (const callback of handler.iterateCallbacks("handlerWillRespond")) {
        response = await callback({ event, request, response });
      }
      return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
      let response;
      let error;
      try {
        response = await responseDone;
      } catch (error2) {
      }
      try {
        await handler.runCallbacks("handlerDidRespond", {
          event,
          request,
          response
        });
        await handler.doneWaiting();
      } catch (waitUntilError) {
        if (waitUntilError instanceof Error) {
          error = waitUntilError;
        }
      }
      await handler.runCallbacks("handlerDidComplete", {
        event,
        request,
        response,
        error
      });
      handler.destroy();
      if (error) {
        throw error;
      }
    }
  };

  // node_modules/workbox-precaching/PrecacheStrategy.js
  var PrecacheStrategy = class _PrecacheStrategy extends Strategy {
    /**
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * of all fetch() requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor(options = {}) {
      options.cacheName = cacheNames.getPrecacheName(options.cacheName);
      super(options);
      this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
      this.plugins.push(_PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
      const response = await handler.cacheMatch(request);
      if (response) {
        return response;
      }
      if (handler.event && handler.event.type === "install") {
        return await this._handleInstall(request, handler);
      }
      return await this._handleFetch(request, handler);
    }
    async _handleFetch(request, handler) {
      let response;
      const params = handler.params || {};
      if (this._fallbackToNetwork) {
        if (true) {
          logger.warn(`The precached response for ${getFriendlyURL(request.url)} in ${this.cacheName} was not found. Falling back to the network.`);
        }
        const integrityInManifest = params.integrity;
        const integrityInRequest = request.integrity;
        const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
        response = await handler.fetch(new Request(request, {
          integrity: request.mode !== "no-cors" ? integrityInRequest || integrityInManifest : void 0
        }));
        if (integrityInManifest && noIntegrityConflict && request.mode !== "no-cors") {
          this._useDefaultCacheabilityPluginIfNeeded();
          const wasCached = await handler.cachePut(request, response.clone());
          if (true) {
            if (wasCached) {
              logger.log(`A response for ${getFriendlyURL(request.url)} was used to "repair" the precache.`);
            }
          }
        }
      } else {
        throw new WorkboxError("missing-precache-entry", {
          cacheName: this.cacheName,
          url: request.url
        });
      }
      if (true) {
        const cacheKey = params.cacheKey || await handler.getCacheKey(request, "read");
        logger.groupCollapsed(`Precaching is responding to: ` + getFriendlyURL(request.url));
        logger.log(`Serving the precached url: ${getFriendlyURL(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
        logger.groupCollapsed(`View request details here.`);
        logger.log(request);
        logger.groupEnd();
        logger.groupCollapsed(`View response details here.`);
        logger.log(response);
        logger.groupEnd();
        logger.groupEnd();
      }
      return response;
    }
    async _handleInstall(request, handler) {
      this._useDefaultCacheabilityPluginIfNeeded();
      const response = await handler.fetch(request);
      const wasCached = await handler.cachePut(request, response.clone());
      if (!wasCached) {
        throw new WorkboxError("bad-precaching-response", {
          url: request.url,
          status: response.status
        });
      }
      return response;
    }
    /**
     * This method is complex, as there a number of things to account for:
     *
     * The `plugins` array can be set at construction, and/or it might be added to
     * to at any time before the strategy is used.
     *
     * At the time the strategy is used (i.e. during an `install` event), there
     * needs to be at least one plugin that implements `cacheWillUpdate` in the
     * array, other than `copyRedirectedCacheableResponsesPlugin`.
     *
     * - If this method is called and there are no suitable `cacheWillUpdate`
     * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
     *
     * - If this method is called and there is exactly one `cacheWillUpdate`, then
     * we don't have to do anything (this might be a previously added
     * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
     *
     * - If this method is called and there is more than one `cacheWillUpdate`,
     * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
     * we need to remove it. (This situation is unlikely, but it could happen if
     * the strategy is used multiple times, the first without a `cacheWillUpdate`,
     * and then later on after manually adding a custom `cacheWillUpdate`.)
     *
     * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
     *
     * @private
     */
    _useDefaultCacheabilityPluginIfNeeded() {
      let defaultPluginIndex = null;
      let cacheWillUpdatePluginCount = 0;
      for (const [index, plugin] of this.plugins.entries()) {
        if (plugin === _PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
          continue;
        }
        if (plugin === _PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
          defaultPluginIndex = index;
        }
        if (plugin.cacheWillUpdate) {
          cacheWillUpdatePluginCount++;
        }
      }
      if (cacheWillUpdatePluginCount === 0) {
        this.plugins.push(_PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
      } else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
        this.plugins.splice(defaultPluginIndex, 1);
      }
    }
  };
  PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
      if (!response || response.status >= 400) {
        return null;
      }
      return response;
    }
  };
  PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
      return response.redirected ? await copyResponse(response) : response;
    }
  };

  // node_modules/workbox-precaching/PrecacheController.js
  var PrecacheController = class {
    /**
     * Create a new PrecacheController.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] The cache to use for precaching.
     * @param {string} [options.plugins] Plugins to use when precaching as well
     * as responding to fetch events for precached assets.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor({ cacheName, plugins = [], fallbackToNetwork = true } = {}) {
      this._urlsToCacheKeys = /* @__PURE__ */ new Map();
      this._urlsToCacheModes = /* @__PURE__ */ new Map();
      this._cacheKeysToIntegrities = /* @__PURE__ */ new Map();
      this._strategy = new PrecacheStrategy({
        cacheName: cacheNames.getPrecacheName(cacheName),
        plugins: [
          ...plugins,
          new PrecacheCacheKeyPlugin({ precacheController: this })
        ],
        fallbackToNetwork
      });
      this.install = this.install.bind(this);
      this.activate = this.activate.bind(this);
    }
    /**
     * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
     * used to cache assets and respond to fetch events.
     */
    get strategy() {
      return this._strategy;
    }
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * {@link workbox-core.cacheNames|"precache cache"} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     */
    precache(entries) {
      this.addToCacheList(entries);
      if (!this._installAndActiveListenersAdded) {
        self.addEventListener("install", this.install);
        self.addEventListener("activate", this.activate);
        this._installAndActiveListenersAdded = true;
      }
    }
    /**
     * This method will add items to the precache list, removing duplicates
     * and ensuring the information is valid.
     *
     * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
     *     Array of entries to precache.
     */
    addToCacheList(entries) {
      if (true) {
        finalAssertExports.isArray(entries, {
          moduleName: "workbox-precaching",
          className: "PrecacheController",
          funcName: "addToCacheList",
          paramName: "entries"
        });
      }
      const urlsToWarnAbout = [];
      for (const entry of entries) {
        if (typeof entry === "string") {
          urlsToWarnAbout.push(entry);
        } else if (entry && entry.revision === void 0) {
          urlsToWarnAbout.push(entry.url);
        }
        const { cacheKey, url } = createCacheKey(entry);
        const cacheMode = typeof entry !== "string" && entry.revision ? "reload" : "default";
        if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
          throw new WorkboxError("add-to-cache-list-conflicting-entries", {
            firstEntry: this._urlsToCacheKeys.get(url),
            secondEntry: cacheKey
          });
        }
        if (typeof entry !== "string" && entry.integrity) {
          if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
            throw new WorkboxError("add-to-cache-list-conflicting-integrities", {
              url
            });
          }
          this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
        }
        this._urlsToCacheKeys.set(url, cacheKey);
        this._urlsToCacheModes.set(url, cacheMode);
        if (urlsToWarnAbout.length > 0) {
          const warningMessage = `Workbox is precaching URLs without revision info: ${urlsToWarnAbout.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
          if (false) {
            console.warn(warningMessage);
          } else {
            logger.warn(warningMessage);
          }
        }
      }
    }
    /**
     * Precaches new and updated assets. Call this method from the service worker
     * install event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.InstallResult>}
     */
    install(event) {
      return waitUntil(event, async () => {
        const installReportPlugin = new PrecacheInstallReportPlugin();
        this.strategy.plugins.push(installReportPlugin);
        for (const [url, cacheKey] of this._urlsToCacheKeys) {
          const integrity = this._cacheKeysToIntegrities.get(cacheKey);
          const cacheMode = this._urlsToCacheModes.get(url);
          const request = new Request(url, {
            integrity,
            cache: cacheMode,
            credentials: "same-origin"
          });
          await Promise.all(this.strategy.handleAll({
            params: { cacheKey },
            request,
            event
          }));
        }
        const { updatedURLs, notUpdatedURLs } = installReportPlugin;
        if (true) {
          printInstallDetails(updatedURLs, notUpdatedURLs);
        }
        return { updatedURLs, notUpdatedURLs };
      });
    }
    /**
     * Deletes assets that are no longer present in the current precache manifest.
     * Call this method from the service worker activate event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.CleanupResult>}
     */
    activate(event) {
      return waitUntil(event, async () => {
        const cache = await self.caches.open(this.strategy.cacheName);
        const currentlyCachedRequests = await cache.keys();
        const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
        const deletedURLs = [];
        for (const request of currentlyCachedRequests) {
          if (!expectedCacheKeys.has(request.url)) {
            await cache.delete(request);
            deletedURLs.push(request.url);
          }
        }
        if (true) {
          printCleanupDetails(deletedURLs);
        }
        return { deletedURLs };
      });
    }
    /**
     * Returns a mapping of a precached URL to the corresponding cache key, taking
     * into account the revision information for the URL.
     *
     * @return {Map<string, string>} A URL to cache key mapping.
     */
    getURLsToCacheKeys() {
      return this._urlsToCacheKeys;
    }
    /**
     * Returns a list of all the URLs that have been precached by the current
     * service worker.
     *
     * @return {Array<string>} The precached URLs.
     */
    getCachedURLs() {
      return [...this._urlsToCacheKeys.keys()];
    }
    /**
     * Returns the cache key used for storing a given URL. If that URL is
     * unversioned, like `/index.html', then the cache key will be the original
     * URL with a search parameter appended to it.
     *
     * @param {string} url A URL whose cache key you want to look up.
     * @return {string} The versioned URL that corresponds to a cache key
     * for the original URL, or undefined if that URL isn't precached.
     */
    getCacheKeyForURL(url) {
      const urlObject = new URL(url, location.href);
      return this._urlsToCacheKeys.get(urlObject.href);
    }
    /**
     * @param {string} url A cache key whose SRI you want to look up.
     * @return {string} The subresource integrity associated with the cache key,
     * or undefined if it's not set.
     */
    getIntegrityForCacheKey(cacheKey) {
      return this._cacheKeysToIntegrities.get(cacheKey);
    }
    /**
     * This acts as a drop-in replacement for
     * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
     * with the following differences:
     *
     * - It knows what the name of the precache is, and only checks in that cache.
     * - It allows you to pass in an "original" URL without versioning parameters,
     * and it will automatically look up the correct cache key for the currently
     * active revision of that URL.
     *
     * E.g., `matchPrecache('index.html')` will find the correct precached
     * response for the currently active service worker, even if the actual cache
     * key is `'/index.html?__WB_REVISION__=1234abcd'`.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     */
    async matchPrecache(request) {
      const url = request instanceof Request ? request.url : request;
      const cacheKey = this.getCacheKeyForURL(url);
      if (cacheKey) {
        const cache = await self.caches.open(this.strategy.cacheName);
        return cache.match(cacheKey);
      }
      return void 0;
    }
    /**
     * Returns a function that looks up `url` in the precache (taking into
     * account revision information), and returns the corresponding `Response`.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @return {workbox-routing~handlerCallback}
     */
    createHandlerBoundToURL(url) {
      const cacheKey = this.getCacheKeyForURL(url);
      if (!cacheKey) {
        throw new WorkboxError("non-precached-url", { url });
      }
      return (options) => {
        options.request = new Request(url);
        options.params = Object.assign({ cacheKey }, options.params);
        return this.strategy.handle(options);
      };
    }
  };

  // node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js
  var precacheController;
  var getOrCreatePrecacheController = () => {
    if (!precacheController) {
      precacheController = new PrecacheController();
    }
    return precacheController;
  };

  // node_modules/workbox-routing/_version.js
  try {
    self["workbox:routing:7.0.0"] && _();
  } catch (e) {
  }

  // node_modules/workbox-routing/utils/constants.js
  var defaultMethod = "GET";
  var validMethods = [
    "DELETE",
    "GET",
    "HEAD",
    "PATCH",
    "POST",
    "PUT"
  ];

  // node_modules/workbox-routing/utils/normalizeHandler.js
  var normalizeHandler = (handler) => {
    if (handler && typeof handler === "object") {
      if (true) {
        finalAssertExports.hasMethod(handler, "handle", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "handler"
        });
      }
      return handler;
    } else {
      if (true) {
        finalAssertExports.isType(handler, "function", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "handler"
        });
      }
      return { handle: handler };
    }
  };

  // node_modules/workbox-routing/Route.js
  var Route = class {
    /**
     * Constructor for Route class.
     *
     * @param {workbox-routing~matchCallback} match
     * A callback function that determines whether the route matches a given
     * `fetch` event by returning a non-falsy value.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(match, handler, method = defaultMethod) {
      if (true) {
        finalAssertExports.isType(match, "function", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "match"
        });
        if (method) {
          finalAssertExports.isOneOf(method, validMethods, { paramName: "method" });
        }
      }
      this.handler = normalizeHandler(handler);
      this.match = match;
      this.method = method;
    }
    /**
     *
     * @param {workbox-routing-handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response
     */
    setCatchHandler(handler) {
      this.catchHandler = normalizeHandler(handler);
    }
  };

  // node_modules/workbox-routing/RegExpRoute.js
  var RegExpRoute = class extends Route {
    /**
     * If the regular expression contains
     * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
     * the captured values will be passed to the
     * {@link workbox-routing~handlerCallback} `params`
     * argument.
     *
     * @param {RegExp} regExp The regular expression to match against URLs.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(regExp, handler, method) {
      if (true) {
        finalAssertExports.isInstance(regExp, RegExp, {
          moduleName: "workbox-routing",
          className: "RegExpRoute",
          funcName: "constructor",
          paramName: "pattern"
        });
      }
      const match = ({ url }) => {
        const result = regExp.exec(url.href);
        if (!result) {
          return;
        }
        if (url.origin !== location.origin && result.index !== 0) {
          if (true) {
            logger.debug(`The regular expression '${regExp.toString()}' only partially matched against the cross-origin URL '${url.toString()}'. RegExpRoute's will only handle cross-origin requests if they match the entire URL.`);
          }
          return;
        }
        return result.slice(1);
      };
      super(match, handler, method);
    }
  };

  // node_modules/workbox-routing/Router.js
  var Router = class {
    /**
     * Initializes a new Router.
     */
    constructor() {
      this._routes = /* @__PURE__ */ new Map();
      this._defaultHandlerMap = /* @__PURE__ */ new Map();
    }
    /**
     * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
     * method name ('GET', etc.) to an array of all the corresponding `Route`
     * instances that are registered.
     */
    get routes() {
      return this._routes;
    }
    /**
     * Adds a fetch event listener to respond to events when a route matches
     * the event's request.
     */
    addFetchListener() {
      self.addEventListener("fetch", (event) => {
        const { request } = event;
        const responsePromise = this.handleRequest({ request, event });
        if (responsePromise) {
          event.respondWith(responsePromise);
        }
      });
    }
    /**
     * Adds a message event listener for URLs to cache from the window.
     * This is useful to cache resources loaded on the page prior to when the
     * service worker started controlling it.
     *
     * The format of the message data sent from the window should be as follows.
     * Where the `urlsToCache` array may consist of URL strings or an array of
     * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
     *
     * ```
     * {
     *   type: 'CACHE_URLS',
     *   payload: {
     *     urlsToCache: [
     *       './script1.js',
     *       './script2.js',
     *       ['./script3.js', {mode: 'no-cors'}],
     *     ],
     *   },
     * }
     * ```
     */
    addCacheListener() {
      self.addEventListener("message", (event) => {
        if (event.data && event.data.type === "CACHE_URLS") {
          const { payload } = event.data;
          if (true) {
            logger.debug(`Caching URLs from the window`, payload.urlsToCache);
          }
          const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
            if (typeof entry === "string") {
              entry = [entry];
            }
            const request = new Request(...entry);
            return this.handleRequest({ request, event });
          }));
          event.waitUntil(requestPromises);
          if (event.ports && event.ports[0]) {
            void requestPromises.then(() => event.ports[0].postMessage(true));
          }
        }
      });
    }
    /**
     * Apply the routing rules to a FetchEvent object to get a Response from an
     * appropriate Route's handler.
     *
     * @param {Object} options
     * @param {Request} options.request The request to handle.
     * @param {ExtendableEvent} options.event The event that triggered the
     *     request.
     * @return {Promise<Response>|undefined} A promise is returned if a
     *     registered route can handle the request. If there is no matching
     *     route and there's no `defaultHandler`, `undefined` is returned.
     */
    handleRequest({ request, event }) {
      if (true) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "handleRequest",
          paramName: "options.request"
        });
      }
      const url = new URL(request.url, location.href);
      if (!url.protocol.startsWith("http")) {
        if (true) {
          logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
        }
        return;
      }
      const sameOrigin = url.origin === location.origin;
      const { params, route } = this.findMatchingRoute({
        event,
        request,
        sameOrigin,
        url
      });
      let handler = route && route.handler;
      const debugMessages = [];
      if (true) {
        if (handler) {
          debugMessages.push([`Found a route to handle this request:`, route]);
          if (params) {
            debugMessages.push([
              `Passing the following params to the route's handler:`,
              params
            ]);
          }
        }
      }
      const method = request.method;
      if (!handler && this._defaultHandlerMap.has(method)) {
        if (true) {
          debugMessages.push(`Failed to find a matching route. Falling back to the default handler for ${method}.`);
        }
        handler = this._defaultHandlerMap.get(method);
      }
      if (!handler) {
        if (true) {
          logger.debug(`No route found for: ${getFriendlyURL(url)}`);
        }
        return;
      }
      if (true) {
        logger.groupCollapsed(`Router is responding to: ${getFriendlyURL(url)}`);
        debugMessages.forEach((msg) => {
          if (Array.isArray(msg)) {
            logger.log(...msg);
          } else {
            logger.log(msg);
          }
        });
        logger.groupEnd();
      }
      let responsePromise;
      try {
        responsePromise = handler.handle({ url, request, event, params });
      } catch (err) {
        responsePromise = Promise.reject(err);
      }
      const catchHandler = route && route.catchHandler;
      if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
        responsePromise = responsePromise.catch(async (err) => {
          if (catchHandler) {
            if (true) {
              logger.groupCollapsed(`Error thrown when responding to:  ${getFriendlyURL(url)}. Falling back to route's Catch Handler.`);
              logger.error(`Error thrown by:`, route);
              logger.error(err);
              logger.groupEnd();
            }
            try {
              return await catchHandler.handle({ url, request, event, params });
            } catch (catchErr) {
              if (catchErr instanceof Error) {
                err = catchErr;
              }
            }
          }
          if (this._catchHandler) {
            if (true) {
              logger.groupCollapsed(`Error thrown when responding to:  ${getFriendlyURL(url)}. Falling back to global Catch Handler.`);
              logger.error(`Error thrown by:`, route);
              logger.error(err);
              logger.groupEnd();
            }
            return this._catchHandler.handle({ url, request, event });
          }
          throw err;
        });
      }
      return responsePromise;
    }
    /**
     * Checks a request and URL (and optionally an event) against the list of
     * registered routes, and if there's a match, returns the corresponding
     * route along with any params generated by the match.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {boolean} options.sameOrigin The result of comparing `url.origin`
     *     against the current origin.
     * @param {Request} options.request The request to match.
     * @param {Event} options.event The corresponding event.
     * @return {Object} An object with `route` and `params` properties.
     *     They are populated if a matching route was found or `undefined`
     *     otherwise.
     */
    findMatchingRoute({ url, sameOrigin, request, event }) {
      const routes = this._routes.get(request.method) || [];
      for (const route of routes) {
        let params;
        const matchResult = route.match({ url, sameOrigin, request, event });
        if (matchResult) {
          if (true) {
            if (matchResult instanceof Promise) {
              logger.warn(`While routing ${getFriendlyURL(url)}, an async matchCallback function was used. Please convert the following route to use a synchronous matchCallback function:`, route);
            }
          }
          params = matchResult;
          if (Array.isArray(params) && params.length === 0) {
            params = void 0;
          } else if (matchResult.constructor === Object && // eslint-disable-line
          Object.keys(matchResult).length === 0) {
            params = void 0;
          } else if (typeof matchResult === "boolean") {
            params = void 0;
          }
          return { route, params };
        }
      }
      return {};
    }
    /**
     * Define a default `handler` that's called when no routes explicitly
     * match the incoming request.
     *
     * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
     *
     * Without a default handler, unmatched requests will go against the
     * network as if there were no service worker present.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to associate with this
     * default handler. Each method has its own default.
     */
    setDefaultHandler(handler, method = defaultMethod) {
      this._defaultHandlerMap.set(method, normalizeHandler(handler));
    }
    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     */
    setCatchHandler(handler) {
      this._catchHandler = normalizeHandler(handler);
    }
    /**
     * Registers a route with the router.
     *
     * @param {workbox-routing.Route} route The route to register.
     */
    registerRoute(route) {
      if (true) {
        finalAssertExports.isType(route, "object", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.hasMethod(route, "match", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.isType(route.handler, "object", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.hasMethod(route.handler, "handle", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.handler"
        });
        finalAssertExports.isType(route.method, "string", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.method"
        });
      }
      if (!this._routes.has(route.method)) {
        this._routes.set(route.method, []);
      }
      this._routes.get(route.method).push(route);
    }
    /**
     * Unregisters a route with the router.
     *
     * @param {workbox-routing.Route} route The route to unregister.
     */
    unregisterRoute(route) {
      if (!this._routes.has(route.method)) {
        throw new WorkboxError("unregister-route-but-not-found-with-method", {
          method: route.method
        });
      }
      const routeIndex = this._routes.get(route.method).indexOf(route);
      if (routeIndex > -1) {
        this._routes.get(route.method).splice(routeIndex, 1);
      } else {
        throw new WorkboxError("unregister-route-route-not-registered");
      }
    }
  };

  // node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js
  var defaultRouter;
  var getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
      defaultRouter = new Router();
      defaultRouter.addFetchListener();
      defaultRouter.addCacheListener();
    }
    return defaultRouter;
  };

  // node_modules/workbox-routing/registerRoute.js
  function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === "string") {
      const captureUrl = new URL(capture, location.href);
      if (true) {
        if (!(capture.startsWith("/") || capture.startsWith("http"))) {
          throw new WorkboxError("invalid-string", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture"
          });
        }
        const valueToCheck = capture.startsWith("http") ? captureUrl.pathname : capture;
        const wildcards = "[*:?+]";
        if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
          logger.debug(`The '$capture' parameter contains an Express-style wildcard character (${wildcards}). Strings are now always interpreted as exact matches; use a RegExp for partial or wildcard matches.`);
        }
      }
      const matchCallback = ({ url }) => {
        if (true) {
          if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
            logger.debug(`${capture} only partially matches the cross-origin URL ${url.toString()}. This route will only handle cross-origin requests if they match the entire URL.`);
          }
        }
        return url.href === captureUrl.href;
      };
      route = new Route(matchCallback, handler, method);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute(capture, handler, method);
    } else if (typeof capture === "function") {
      route = new Route(capture, handler, method);
    } else if (capture instanceof Route) {
      route = capture;
    } else {
      throw new WorkboxError("unsupported-route-type", {
        moduleName: "workbox-routing",
        funcName: "registerRoute",
        paramName: "capture"
      });
    }
    const defaultRouter2 = getOrCreateDefaultRouter();
    defaultRouter2.registerRoute(route);
    return route;
  }

  // node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js
  function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    for (const paramName of [...urlObject.searchParams.keys()]) {
      if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
        urlObject.searchParams.delete(paramName);
      }
    }
    return urlObject;
  }

  // node_modules/workbox-precaching/utils/generateURLVariations.js
  function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = "index.html", cleanURLs = true, urlManipulation } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = "";
    yield urlObject.href;
    const urlWithoutIgnoredParams = removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith("/")) {
      const directoryURL = new URL(urlWithoutIgnoredParams.href);
      directoryURL.pathname += directoryIndex;
      yield directoryURL.href;
    }
    if (cleanURLs) {
      const cleanURL = new URL(urlWithoutIgnoredParams.href);
      cleanURL.pathname += ".html";
      yield cleanURL.href;
    }
    if (urlManipulation) {
      const additionalURLs = urlManipulation({ url: urlObject });
      for (const urlToAttempt of additionalURLs) {
        yield urlToAttempt.href;
      }
    }
  }

  // node_modules/workbox-precaching/PrecacheRoute.js
  var PrecacheRoute = class extends Route {
    /**
     * @param {PrecacheController} precacheController A `PrecacheController`
     * instance used to both match requests and respond to fetch events.
     * @param {Object} [options] Options to control how requests are matched
     * against the list of precached URLs.
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */
    constructor(precacheController2, options) {
      const match = ({ request }) => {
        const urlsToCacheKeys = precacheController2.getURLsToCacheKeys();
        for (const possibleURL of generateURLVariations(request.url, options)) {
          const cacheKey = urlsToCacheKeys.get(possibleURL);
          if (cacheKey) {
            const integrity = precacheController2.getIntegrityForCacheKey(cacheKey);
            return { cacheKey, integrity };
          }
        }
        if (true) {
          logger.debug(`Precaching did not find a match for ` + getFriendlyURL(request.url));
        }
        return;
      };
      super(match, precacheController2.strategy);
    }
  };

  // node_modules/workbox-precaching/addRoute.js
  function addRoute(options) {
    const precacheController2 = getOrCreatePrecacheController();
    const precacheRoute = new PrecacheRoute(precacheController2, options);
    registerRoute(precacheRoute);
  }

  // node_modules/workbox-precaching/precache.js
  function precache(entries) {
    const precacheController2 = getOrCreatePrecacheController();
    precacheController2.precache(entries);
  }

  // node_modules/workbox-precaching/precacheAndRoute.js
  function precacheAndRoute(entries, options) {
    precache(entries);
    addRoute(options);
  }

  // node_modules/workbox-strategies/utils/messages.js
  var messages2 = {
    strategyStart: (strategyName, request) => `Using ${strategyName} to respond to '${getFriendlyURL(request.url)}'`,
    printFinalResponse: (response) => {
      if (response) {
        logger.groupCollapsed(`View the final response here.`);
        logger.log(response || "[No response returned]");
        logger.groupEnd();
      }
    }
  };

  // node_modules/workbox-strategies/CacheFirst.js
  var CacheFirst = class extends Strategy {
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
      const logs = [];
      if (true) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-strategies",
          className: this.constructor.name,
          funcName: "makeRequest",
          paramName: "request"
        });
      }
      let response = await handler.cacheMatch(request);
      let error = void 0;
      if (!response) {
        if (true) {
          logs.push(`No response found in the '${this.cacheName}' cache. Will respond with a network request.`);
        }
        try {
          response = await handler.fetchAndCachePut(request);
        } catch (err) {
          if (err instanceof Error) {
            error = err;
          }
        }
        if (true) {
          if (response) {
            logs.push(`Got response from network.`);
          } else {
            logs.push(`Unable to get a response from the network.`);
          }
        }
      } else {
        if (true) {
          logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
        }
      }
      if (true) {
        logger.groupCollapsed(messages2.strategyStart(this.constructor.name, request));
        for (const log of logs) {
          logger.log(log);
        }
        messages2.printFinalResponse(response);
        logger.groupEnd();
      }
      if (!response) {
        throw new WorkboxError("no-response", { url: request.url, error });
      }
      return response;
    }
  };

  // node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.js
  var cacheOkAndOpaquePlugin = {
    /**
     * Returns a valid response (to allow caching) if the status is 200 (OK) or
     * 0 (opaque).
     *
     * @param {Object} options
     * @param {Response} options.response
     * @return {Response|null}
     *
     * @private
     */
    cacheWillUpdate: async ({ response }) => {
      if (response.status === 200 || response.status === 0) {
        return response;
      }
      return null;
    }
  };

  // node_modules/workbox-strategies/NetworkFirst.js
  var NetworkFirst = class extends Strategy {
    /**
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     * @param {number} [options.networkTimeoutSeconds] If set, any network requests
     * that fail to respond within the timeout will fallback to the cache.
     *
     * This option can be used to combat
     * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
     * scenarios.
     */
    constructor(options = {}) {
      super(options);
      if (!this.plugins.some((p) => "cacheWillUpdate" in p)) {
        this.plugins.unshift(cacheOkAndOpaquePlugin);
      }
      this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;
      if (true) {
        if (this._networkTimeoutSeconds) {
          finalAssertExports.isType(this._networkTimeoutSeconds, "number", {
            moduleName: "workbox-strategies",
            className: this.constructor.name,
            funcName: "constructor",
            paramName: "networkTimeoutSeconds"
          });
        }
      }
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
      const logs = [];
      if (true) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-strategies",
          className: this.constructor.name,
          funcName: "handle",
          paramName: "makeRequest"
        });
      }
      const promises = [];
      let timeoutId;
      if (this._networkTimeoutSeconds) {
        const { id, promise } = this._getTimeoutPromise({ request, logs, handler });
        timeoutId = id;
        promises.push(promise);
      }
      const networkPromise = this._getNetworkPromise({
        timeoutId,
        request,
        logs,
        handler
      });
      promises.push(networkPromise);
      const response = await handler.waitUntil((async () => {
        return await handler.waitUntil(Promise.race(promises)) || // If Promise.race() resolved with null, it might be due to a network
        // timeout + a cache miss. If that were to happen, we'd rather wait until
        // the networkPromise resolves instead of returning null.
        // Note that it's fine to await an already-resolved promise, so we don't
        // have to check to see if it's still "in flight".
        await networkPromise;
      })());
      if (true) {
        logger.groupCollapsed(messages2.strategyStart(this.constructor.name, request));
        for (const log of logs) {
          logger.log(log);
        }
        messages2.printFinalResponse(response);
        logger.groupEnd();
      }
      if (!response) {
        throw new WorkboxError("no-response", { url: request.url });
      }
      return response;
    }
    /**
     * @param {Object} options
     * @param {Request} options.request
     * @param {Array} options.logs A reference to the logs array
     * @param {Event} options.event
     * @return {Promise<Response>}
     *
     * @private
     */
    _getTimeoutPromise({ request, logs, handler }) {
      let timeoutId;
      const timeoutPromise = new Promise((resolve) => {
        const onNetworkTimeout = async () => {
          if (true) {
            logs.push(`Timing out the network response at ${this._networkTimeoutSeconds} seconds.`);
          }
          resolve(await handler.cacheMatch(request));
        };
        timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1e3);
      });
      return {
        promise: timeoutPromise,
        id: timeoutId
      };
    }
    /**
     * @param {Object} options
     * @param {number|undefined} options.timeoutId
     * @param {Request} options.request
     * @param {Array} options.logs A reference to the logs Array.
     * @param {Event} options.event
     * @return {Promise<Response>}
     *
     * @private
     */
    async _getNetworkPromise({ timeoutId, request, logs, handler }) {
      let error;
      let response;
      try {
        response = await handler.fetchAndCachePut(request);
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          error = fetchError;
        }
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (true) {
        if (response) {
          logs.push(`Got response from network.`);
        } else {
          logs.push(`Unable to get a response from the network. Will respond with a cached response.`);
        }
      }
      if (error || !response) {
        response = await handler.cacheMatch(request);
        if (true) {
          if (response) {
            logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
          } else {
            logs.push(`No response found in the '${this.cacheName}' cache.`);
          }
        }
      }
      return response;
    }
  };

  // node_modules/workbox-core/_private/dontWaitFor.js
  function dontWaitFor(promise) {
    void promise.then(() => {
    });
  }

  // node_modules/idb/build/wrap-idb-value.js
  var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var cursorRequestMap = /* @__PURE__ */ new WeakMap();
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    promise.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // node_modules/idb/build/index.js
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
      });
    }
    if (blocked) {
      request.addEventListener("blocked", (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event.newVersion,
        event
      ));
    }
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking) {
        db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
      }
    }).catch(() => {
    });
    return openPromise;
  }
  function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
      request.addEventListener("blocked", (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event
      ));
    }
    return wrap(request).then(() => void 0);
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));

  // node_modules/workbox-expiration/_version.js
  try {
    self["workbox:expiration:7.0.0"] && _();
  } catch (e) {
  }

  // node_modules/workbox-expiration/models/CacheTimestampsModel.js
  var DB_NAME = "workbox-expiration";
  var CACHE_OBJECT_STORE = "cache-entries";
  var normalizeURL = (unNormalizedUrl) => {
    const url = new URL(unNormalizedUrl, location.href);
    url.hash = "";
    return url.href;
  };
  var CacheTimestampsModel = class {
    /**
     *
     * @param {string} cacheName
     *
     * @private
     */
    constructor(cacheName) {
      this._db = null;
      this._cacheName = cacheName;
    }
    /**
     * Performs an upgrade of indexedDB.
     *
     * @param {IDBPDatabase<CacheDbSchema>} db
     *
     * @private
     */
    _upgradeDb(db) {
      const objStore = db.createObjectStore(CACHE_OBJECT_STORE, { keyPath: "id" });
      objStore.createIndex("cacheName", "cacheName", { unique: false });
      objStore.createIndex("timestamp", "timestamp", { unique: false });
    }
    /**
     * Performs an upgrade of indexedDB and deletes deprecated DBs.
     *
     * @param {IDBPDatabase<CacheDbSchema>} db
     *
     * @private
     */
    _upgradeDbAndDeleteOldDbs(db) {
      this._upgradeDb(db);
      if (this._cacheName) {
        void deleteDB(this._cacheName);
      }
    }
    /**
     * @param {string} url
     * @param {number} timestamp
     *
     * @private
     */
    async setTimestamp(url, timestamp) {
      url = normalizeURL(url);
      const entry = {
        url,
        timestamp,
        cacheName: this._cacheName,
        // Creating an ID from the URL and cache name won't be necessary once
        // Edge switches to Chromium and all browsers we support work with
        // array keyPaths.
        id: this._getId(url)
      };
      const db = await this.getDb();
      const tx = db.transaction(CACHE_OBJECT_STORE, "readwrite", {
        durability: "relaxed"
      });
      await tx.store.put(entry);
      await tx.done;
    }
    /**
     * Returns the timestamp stored for a given URL.
     *
     * @param {string} url
     * @return {number | undefined}
     *
     * @private
     */
    async getTimestamp(url) {
      const db = await this.getDb();
      const entry = await db.get(CACHE_OBJECT_STORE, this._getId(url));
      return entry === null || entry === void 0 ? void 0 : entry.timestamp;
    }
    /**
     * Iterates through all the entries in the object store (from newest to
     * oldest) and removes entries once either `maxCount` is reached or the
     * entry's timestamp is less than `minTimestamp`.
     *
     * @param {number} minTimestamp
     * @param {number} maxCount
     * @return {Array<string>}
     *
     * @private
     */
    async expireEntries(minTimestamp, maxCount) {
      const db = await this.getDb();
      let cursor = await db.transaction(CACHE_OBJECT_STORE).store.index("timestamp").openCursor(null, "prev");
      const entriesToDelete = [];
      let entriesNotDeletedCount = 0;
      while (cursor) {
        const result = cursor.value;
        if (result.cacheName === this._cacheName) {
          if (minTimestamp && result.timestamp < minTimestamp || maxCount && entriesNotDeletedCount >= maxCount) {
            entriesToDelete.push(cursor.value);
          } else {
            entriesNotDeletedCount++;
          }
        }
        cursor = await cursor.continue();
      }
      const urlsDeleted = [];
      for (const entry of entriesToDelete) {
        await db.delete(CACHE_OBJECT_STORE, entry.id);
        urlsDeleted.push(entry.url);
      }
      return urlsDeleted;
    }
    /**
     * Takes a URL and returns an ID that will be unique in the object store.
     *
     * @param {string} url
     * @return {string}
     *
     * @private
     */
    _getId(url) {
      return this._cacheName + "|" + normalizeURL(url);
    }
    /**
     * Returns an open connection to the database.
     *
     * @private
     */
    async getDb() {
      if (!this._db) {
        this._db = await openDB(DB_NAME, 1, {
          upgrade: this._upgradeDbAndDeleteOldDbs.bind(this)
        });
      }
      return this._db;
    }
  };

  // node_modules/workbox-expiration/CacheExpiration.js
  var CacheExpiration = class {
    /**
     * To construct a new CacheExpiration instance you must provide at least
     * one of the `config` properties.
     *
     * @param {string} cacheName Name of the cache to apply restrictions to.
     * @param {Object} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
     * that will be used when calling `delete()` on the cache.
     */
    constructor(cacheName, config = {}) {
      this._isRunning = false;
      this._rerunRequested = false;
      if (true) {
        finalAssertExports.isType(cacheName, "string", {
          moduleName: "workbox-expiration",
          className: "CacheExpiration",
          funcName: "constructor",
          paramName: "cacheName"
        });
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError("max-entries-or-age-required", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor"
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxEntries"
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds"
          });
        }
      }
      this._maxEntries = config.maxEntries;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._matchOptions = config.matchOptions;
      this._cacheName = cacheName;
      this._timestampModel = new CacheTimestampsModel(cacheName);
    }
    /**
     * Expires entries for the given cache and given criteria.
     */
    async expireEntries() {
      if (this._isRunning) {
        this._rerunRequested = true;
        return;
      }
      this._isRunning = true;
      const minTimestamp = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1e3 : 0;
      const urlsExpired = await this._timestampModel.expireEntries(minTimestamp, this._maxEntries);
      const cache = await self.caches.open(this._cacheName);
      for (const url of urlsExpired) {
        await cache.delete(url, this._matchOptions);
      }
      if (true) {
        if (urlsExpired.length > 0) {
          logger.groupCollapsed(`Expired ${urlsExpired.length} ${urlsExpired.length === 1 ? "entry" : "entries"} and removed ${urlsExpired.length === 1 ? "it" : "them"} from the '${this._cacheName}' cache.`);
          logger.log(`Expired the following ${urlsExpired.length === 1 ? "URL" : "URLs"}:`);
          urlsExpired.forEach((url) => logger.log(`    ${url}`));
          logger.groupEnd();
        } else {
          logger.debug(`Cache expiration ran and found no entries to remove.`);
        }
      }
      this._isRunning = false;
      if (this._rerunRequested) {
        this._rerunRequested = false;
        dontWaitFor(this.expireEntries());
      }
    }
    /**
     * Update the timestamp for the given URL. This ensures the when
     * removing entries based on maximum entries, most recently used
     * is accurate or when expiring, the timestamp is up-to-date.
     *
     * @param {string} url
     */
    async updateTimestamp(url) {
      if (true) {
        finalAssertExports.isType(url, "string", {
          moduleName: "workbox-expiration",
          className: "CacheExpiration",
          funcName: "updateTimestamp",
          paramName: "url"
        });
      }
      await this._timestampModel.setTimestamp(url, Date.now());
    }
    /**
     * Can be used to check if a URL has expired or not before it's used.
     *
     * This requires a look up from IndexedDB, so can be slow.
     *
     * Note: This method will not remove the cached entry, call
     * `expireEntries()` to remove indexedDB and Cache entries.
     *
     * @param {string} url
     * @return {boolean}
     */
    async isURLExpired(url) {
      if (!this._maxAgeSeconds) {
        if (true) {
          throw new WorkboxError(`expired-test-without-max-age`, {
            methodName: "isURLExpired",
            paramName: "maxAgeSeconds"
          });
        }
        return false;
      } else {
        const timestamp = await this._timestampModel.getTimestamp(url);
        const expireOlderThan = Date.now() - this._maxAgeSeconds * 1e3;
        return timestamp !== void 0 ? timestamp < expireOlderThan : true;
      }
    }
    /**
     * Removes the IndexedDB object store used to keep track of cache expiration
     * metadata.
     */
    async delete() {
      this._rerunRequested = false;
      await this._timestampModel.expireEntries(Infinity);
    }
  };

  // node_modules/workbox-core/registerQuotaErrorCallback.js
  function registerQuotaErrorCallback(callback) {
    if (true) {
      finalAssertExports.isType(callback, "function", {
        moduleName: "workbox-core",
        funcName: "register",
        paramName: "callback"
      });
    }
    quotaErrorCallbacks.add(callback);
    if (true) {
      logger.log("Registered a callback to respond to quota errors.", callback);
    }
  }

  // node_modules/workbox-expiration/ExpirationPlugin.js
  var ExpirationPlugin = class {
    /**
     * @param {ExpirationPluginOptions} config
     * @param {number} [config.maxEntries] The maximum number of entries to cache.
     * Entries used the least will be removed as the maximum is reached.
     * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
     * it's treated as stale and removed.
     * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
     * that will be used when calling `delete()` on the cache.
     * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
     * automatic deletion if the available storage quota has been exceeded.
     */
    constructor(config = {}) {
      this.cachedResponseWillBeUsed = async ({ event, request, cacheName, cachedResponse }) => {
        if (!cachedResponse) {
          return null;
        }
        const isFresh = this._isResponseDateFresh(cachedResponse);
        const cacheExpiration = this._getCacheExpiration(cacheName);
        dontWaitFor(cacheExpiration.expireEntries());
        const updateTimestampDone = cacheExpiration.updateTimestamp(request.url);
        if (event) {
          try {
            event.waitUntil(updateTimestampDone);
          } catch (error) {
            if (true) {
              if ("request" in event) {
                logger.warn(`Unable to ensure service worker stays alive when updating cache entry for '${getFriendlyURL(event.request.url)}'.`);
              }
            }
          }
        }
        return isFresh ? cachedResponse : null;
      };
      this.cacheDidUpdate = async ({ cacheName, request }) => {
        if (true) {
          finalAssertExports.isType(cacheName, "string", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "cacheDidUpdate",
            paramName: "cacheName"
          });
          finalAssertExports.isInstance(request, Request, {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "cacheDidUpdate",
            paramName: "request"
          });
        }
        const cacheExpiration = this._getCacheExpiration(cacheName);
        await cacheExpiration.updateTimestamp(request.url);
        await cacheExpiration.expireEntries();
      };
      if (true) {
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError("max-entries-or-age-required", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor"
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxEntries"
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds"
          });
        }
      }
      this._config = config;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._cacheExpirations = /* @__PURE__ */ new Map();
      if (config.purgeOnQuotaError) {
        registerQuotaErrorCallback(() => this.deleteCacheAndMetadata());
      }
    }
    /**
     * A simple helper method to return a CacheExpiration instance for a given
     * cache name.
     *
     * @param {string} cacheName
     * @return {CacheExpiration}
     *
     * @private
     */
    _getCacheExpiration(cacheName) {
      if (cacheName === cacheNames.getRuntimeName()) {
        throw new WorkboxError("expire-custom-caches-only");
      }
      let cacheExpiration = this._cacheExpirations.get(cacheName);
      if (!cacheExpiration) {
        cacheExpiration = new CacheExpiration(cacheName, this._config);
        this._cacheExpirations.set(cacheName, cacheExpiration);
      }
      return cacheExpiration;
    }
    /**
     * @param {Response} cachedResponse
     * @return {boolean}
     *
     * @private
     */
    _isResponseDateFresh(cachedResponse) {
      if (!this._maxAgeSeconds) {
        return true;
      }
      const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);
      if (dateHeaderTimestamp === null) {
        return true;
      }
      const now = Date.now();
      return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1e3;
    }
    /**
     * This method will extract the data header and parse it into a useful
     * value.
     *
     * @param {Response} cachedResponse
     * @return {number|null}
     *
     * @private
     */
    _getDateHeaderTimestamp(cachedResponse) {
      if (!cachedResponse.headers.has("date")) {
        return null;
      }
      const dateHeader = cachedResponse.headers.get("date");
      const parsedDate = new Date(dateHeader);
      const headerTime = parsedDate.getTime();
      if (isNaN(headerTime)) {
        return null;
      }
      return headerTime;
    }
    /**
     * This is a helper method that performs two operations:
     *
     * - Deletes *all* the underlying Cache instances associated with this plugin
     * instance, by calling caches.delete() on your behalf.
     * - Deletes the metadata from IndexedDB used to keep track of expiration
     * details for each Cache instance.
     *
     * When using cache expiration, calling this method is preferable to calling
     * `caches.delete()` directly, since this will ensure that the IndexedDB
     * metadata is also cleanly removed and open IndexedDB instances are deleted.
     *
     * Note that if you're *not* using cache expiration for a given cache, calling
     * `caches.delete()` and passing in the cache's name should be sufficient.
     * There is no Workbox-specific method needed for cleanup in that case.
     */
    async deleteCacheAndMetadata() {
      for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
        await self.caches.delete(cacheName);
        await cacheExpiration.delete();
      }
      this._cacheExpirations = /* @__PURE__ */ new Map();
    }
  };

  // sw.js
  function waitUntil2(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
  }
  var offlineAlert = async (url) => {
    console.log(`Fetch failure. We are offline, and cannot access URL "${url}"`);
    const clients = await self.clients.matchAll({ type: "window" });
    let payload = "generic";
    if (/\.(?:png|gif|webm|jpg|webp|jpeg|svg)$/m.test(url))
      payload = "image";
    else if (/\.json$/m.test(url))
      payload = "json";
    for (const client of clients) {
      client.postMessage({ type: "FETCH_ERROR", payload });
    }
  };
  var resetAll = async () => {
    const cacheNames2 = await caches.keys();
    for (const cacheName of cacheNames2) {
      await caches.delete(cacheName);
      const cacheExpiration = new CacheExpiration(cacheName, { maxEntries: 1 });
      await cacheExpiration.delete();
      console.log(`deleted cache "${cacheName}"`);
    }
    await self.registration.unregister();
    const clients = await self.clients.matchAll();
    clients.forEach((client) => client.navigate(client.url));
  };
  addEventListener("message", (event) => {
    switch (event.data.type) {
      case "RESET": {
        console.log("Resetting...");
        event.waitUntil(resetAll());
        break;
      }
    }
  });
  precacheAndRoute([{ "revision": "14d814eee30c5192af3c917bfb2c07cf", "url": "js/actions.js" }, { "revision": "3d17d9a4c1bc2a3774cd74048b4a7c03", "url": "js/adventure.js" }, { "revision": "2e31a7ec827aa69a72f72f4cf408de27", "url": "js/adventures.js" }, { "revision": "1b3ea166ced3cbd301965393906a5bb0", "url": "js/backgrounds.js" }, { "revision": "0173eefcacd0675a07c16963738412d3", "url": "js/bastions.js" }, { "revision": "ac37ae6b5eaacff1f4ce13b6e54f1105", "url": "js/bestiary.js" }, { "revision": "6c9e199941124592f999b93b9e01cf38", "url": "js/bestiary/bestiary-encounterbuilder-cache.js" }, { "revision": "b0a888d9981b67d56bedc01133c4067b", "url": "js/bestiary/bestiary-encounterbuilder-component.js" }, { "revision": "789b17159c7bb5e310e5f577f76bd59c", "url": "js/bestiary/bestiary-encounterbuilder-sublistplugin.js" }, { "revision": "fce9288f573aed035b9db7c1a943d5c6", "url": "js/bestiary/bestiary-encounterbuilder-ui.js" }, { "revision": "cb6e5731545448aacaca3d9e3140378e", "url": "js/blocklist-ui.js" }, { "revision": "69d6a96dcac478f66ae4734e253777f5", "url": "js/blocklist.js" }, { "revision": "4c5652cc2e3f785c236ce7d390a96561", "url": "js/book.js" }, { "revision": "2d559ce83ed5d566cb03021a07100ec6", "url": "js/books.js" }, { "revision": "d1a78e50c0820a2986dc02d94572e21b", "url": "js/bookslist.js" }, { "revision": "bef46ac32a6abae801fc9266c8262248", "url": "js/bookutils.js" }, { "revision": "4a42a6fc51e0f3eda2a90fac2c0c6992", "url": "js/browsercheck.js" }, { "revision": "917e670bd9f4922a836df845b7bc0f99", "url": "js/changelog.js" }, { "revision": "fdcd351b421551de0527a156965f64f9", "url": "js/charcreationoptions.js" }, { "revision": "7a258ef72ec428584a4634320e2e064e", "url": "js/classes.js" }, { "revision": "1b9e0fe6914b53479a77078395cde13a", "url": "js/conditionsdiseases.js" }, { "revision": "d686701012a4aa20d3508c3d7b748ed9", "url": "js/consts.js" }, { "revision": "c6df1adf0c8f9301230e1753ff3ab948", "url": "js/converter.js" }, { "revision": "05cb5b2d0918ef045f92ba0c7414c95c", "url": "js/converter/converter-background.js" }, { "revision": "d80d599cb0ce5beb4978571bc5dd068a", "url": "js/converter/converter-base.js" }, { "revision": "20987b4238396c1e1671a947ddcedc52", "url": "js/converter/converter-creature.js" }, { "revision": "e99bf5f0b46a8b80b315456c0769ce83", "url": "js/converter/converter-feat.js" }, { "revision": "b89ca19fd484446e5b848abd355362bb", "url": "js/converter/converter-feature.js" }, { "revision": "059e6691ed003cb4a7a4ca194c63cba4", "url": "js/converter/converter-item.js" }, { "revision": "48e03acce616def968ab9a3395d6efda", "url": "js/converter/converter-race.js" }, { "revision": "f7baa70a867986abe5bba6e878f66726", "url": "js/converter/converter-spell.js" }, { "revision": "b14bea83a8405589dc8a58d73278a6c6", "url": "js/converter/converter-table.js" }, { "revision": "0d4074198fb7f445f15be91a6c3eef4d", "url": "js/converter/converter-ui-background.js" }, { "revision": "0a822a1c398904e70e3ae55968b4e4cd", "url": "js/converter/converter-ui-base.js" }, { "revision": "fce913f50e00f1df2e19a32b04648fbe", "url": "js/converter/converter-ui-creature.js" }, { "revision": "f661450710805a3a2b6af930a397f9b3", "url": "js/converter/converter-ui-entries.js" }, { "revision": "28e8fb8034573d2df2229ded144a99cf", "url": "js/converter/converter-ui-feat.js" }, { "revision": "8ce565184749955b9e4c78f823328a1a", "url": "js/converter/converter-ui-item.js" }, { "revision": "1367453e0e1d12be54f60cb791e5d548", "url": "js/converter/converter-ui-race.js" }, { "revision": "e2bfecc93057083bcc33f0efdba1c1a9", "url": "js/converter/converter-ui-spell.js" }, { "revision": "7c727da8a7cc6df0b425378be594923a", "url": "js/converter/converter-ui-table.js" }, { "revision": "663b9e36fbdc8c61dee791da6b57c32b", "url": "js/converter/converter-ui-utils.js" }, { "revision": "18fdf837c7d92588bea75f895d9955c5", "url": "js/converter/converter-ui.js" }, { "revision": "57bd2a2a1f7da137eaf28578f5e22a6a", "url": "js/converter/converterutils-background.js" }, { "revision": "50d8af99195c0ac69b4ef3fcbf3f69f0", "url": "js/converter/converterutils-const.js" }, { "revision": "e16c6cabe78274f009cb14d06fca679a", "url": "js/converter/converterutils-creature.js" }, { "revision": "8b68f96900cf29ee4745c01398bbdfbc", "url": "js/converter/converterutils-entries.js" }, { "revision": "ec8f0a4527f1e929bf7b683a72bd6767", "url": "js/converter/converterutils-entrycoalesce.js" }, { "revision": "4ba8a12644d9c67f8809938ec9a8afc6", "url": "js/converter/converterutils-item.js" }, { "revision": "3d80be19a8b899650bdc2a4ba41f8182", "url": "js/converter/converterutils-markdown.js" }, { "revision": "f4e48332aa14ddbba73c844e267ccdcb", "url": "js/converter/converterutils-models.js" }, { "revision": "836674349017447acdd5a44daa5301d6", "url": "js/converter/converterutils-race.js" }, { "revision": "5f4d8f907d6784e579960b91ffb5eb80", "url": "js/converter/converterutils-spell-sources.js" }, { "revision": "8436a585c511952918d5be9f40466203", "url": "js/converter/converterutils-spell.js" }, { "revision": "90dfbbb6820610f4294316655b3bd4d2", "url": "js/converter/converterutils-taggerbase.js" }, { "revision": "435ca520dc7fbccc1317ad5647ec6ec6", "url": "js/converter/converterutils-tags.js" }, { "revision": "08137f8648c64494193b996a5421ac1c", "url": "js/converter/converterutils-utils-alignment.js" }, { "revision": "1af7ba70c85788ab39bc81910587c8cf", "url": "js/converter/converterutils-utils-blocklist.js" }, { "revision": "b552f0053a6e3a57e85dcc4d25187e8d", "url": "js/converter/converterutils-utils.js" }, { "revision": "4a31851e762b99728b071933173cbea2", "url": "js/crcalculator.js" }, { "revision": "82d924fd93e4829d33a45d5c69709fca", "url": "js/cultsboons.js" }, { "revision": "444c64ff10802459586b866128597714", "url": "js/decks.js" }, { "revision": "ec9d51d7ec66683cde5b980f8cd5df17", "url": "js/deities.js" }, { "revision": "5a14ef9e10f199c11d2ef062866af8fc", "url": "js/dmscreen.js" }, { "revision": "c01ef09700db0303eccf1d341931a597", "url": "js/dmscreen/dmscreen-consts.js" }, { "revision": "42b82ea124d4841c223ddc0870c0b2f5", "url": "js/dmscreen/dmscreen-counter.js" }, { "revision": "6fd37976587d1fd1b5200a4c23729dc6", "url": "js/dmscreen/dmscreen-initiativetrackercreatureviewer.js" }, { "revision": "0253081fdf420b7085338a1cf81aff78", "url": "js/dmscreen/dmscreen-mapper.js" }, { "revision": "296a6a44ff2a08e4c65a787ce7010e99", "url": "js/dmscreen/dmscreen-moneyconverter.js" }, { "revision": "a0220ce0a0e104a5cc271d9e1c23e89a", "url": "js/dmscreen/dmscreen-panels.js" }, { "revision": "97acf0f61e3f38a17ba76f3b48142312", "url": "js/dmscreen/dmscreen-playerinitiativetracker.js" }, { "revision": "4f0c6043ee62d7dd5aadc22691a76c2f", "url": "js/dmscreen/dmscreen-timetracker.js" }, { "revision": "79b1e5e50984c57beb4c244b9baae1be", "url": "js/dmscreen/dmscreen-util.js" }, { "revision": "bbf1fe6753df82d6b52159a4c69128c6", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-condition.js" }, { "revision": "122cd7ada8e4fd1072b2ef5e2cbb7cf5", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-conditionadd.js" }, { "revision": "3175752f7c47e8e0cb6afb877cd69c00", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-conditioncustom.js" }, { "revision": "e99d03dae4f0e7f7b6b2203309245d6d", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-consts.js" }, { "revision": "b433a2222661c616fa0d68d5b076f938", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-defaultparty.js" }, { "revision": "3318294a1266032e32fcfbe606ca6bff", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-encounterconverter.js" }, { "revision": "9dc85ee91f2a4139039b4802329edb6b", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-importsettings.js" }, { "revision": "3807e3943df79b462c6b6798381f2839", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-monsteradd.js" }, { "revision": "8d92aa770cd3a3983c99c48a9ab34921", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-networking.js" }, { "revision": "736fa7c798e0275c2bcaa839a9300cb2", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-roller.js" }, { "revision": "87e6176e5a0123b3701eb6895295b814", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-rowsactive.js" }, { "revision": "a61f15f90a8526a24eb5a8fae11cb605", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-rowsbase.js" }, { "revision": "29f7f28421ccd95825d76122679a7a8c", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-rowsdefaultparty.js" }, { "revision": "431c1eabef1d52b9182139ea32e5267f", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-rowstatebuilder.js" }, { "revision": "c796307020076532f72b9f5cb1eb3e2f", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-serial.js" }, { "revision": "8b5374d2b5aaf82d99f0aafa7c3cc8e1", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-settings.js" }, { "revision": "cfcce77b2e7bf4ec51e6b6c1fbdf2e4e", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-sort.js" }, { "revision": "02b4dc5567b2f30e5c89fd6327a6858c", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-statcolumns.js" }, { "revision": "96569e5eadce7294f1a5134ebc371f47", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-ui.js" }, { "revision": "af68560d9b3077c0f0ee97dd5d9d1e9f", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker-util.js" }, { "revision": "bf8cf99800e25d69d477b4d5dad8772b", "url": "js/dmscreen/initiativetracker/dmscreen-initiativetracker.js" }, { "revision": "3febf08c63a05bfd29910ffce880be14", "url": "js/encounterbuilder/encounterbuilder-adjuster.js" }, { "revision": "ecba4dadc9872c4cdf7f3b7e86afa606", "url": "js/encounterbuilder/encounterbuilder-cache.js" }, { "revision": "1df5add55a97c9867b430cf4cf393a51", "url": "js/encounterbuilder/encounterbuilder-colsextraadvanced.js" }, { "revision": "b9db663868b3077a2a9a2620d0431886", "url": "js/encounterbuilder/encounterbuilder-component.js" }, { "revision": "76b36d12a13b3aef88bf30db03d3aa07", "url": "js/encounterbuilder/encounterbuilder-consts.js" }, { "revision": "2914ce3a4da14d2d4429f04e322c7a45", "url": "js/encounterbuilder/encounterbuilder-helpers.js" }, { "revision": "608751cb914e4ed37712466ab3b7f253", "url": "js/encounterbuilder/encounterbuilder-models.js" }, { "revision": "3e0c890cec74caef14f25422873c8b0f", "url": "js/encounterbuilder/encounterbuilder-playersadvanced.js" }, { "revision": "8a9cb4c7b6c32f31c17e2902806131d3", "url": "js/encounterbuilder/encounterbuilder-playerssimple.js" }, { "revision": "ece481852fead6df7445a917553ee2c1", "url": "js/encounterbuilder/encounterbuilder-randomizer.js" }, { "revision": "2fe895fc6c18b583858c83ea0aa9c88c", "url": "js/encounterbuilder/encounterbuilder-ui-help.js" }, { "revision": "58ba3d6d8977bb28735ec581325da33a", "url": "js/encounterbuilder/encounterbuilder-ui-ttk.js" }, { "revision": "db9fa5b242635f109e49cbec8dae25d9", "url": "js/encounterbuilder/encounterbuilder-ui.js" }, { "revision": "5995919af4dd0c93a5781a3fbe4091ff", "url": "js/encountergen.js" }, { "revision": "1066e08795a655e19e000cf2e0369fe0", "url": "js/feats.js" }, { "revision": "b18c85bec218370a939d22c9d30ca325", "url": "js/filter-actions.js" }, { "revision": "49ad436f643e2d6de7024d347e17b1aa", "url": "js/filter-backgrounds.js" }, { "revision": "c42d558820dbc82ca49e7184cc6ae95b", "url": "js/filter-bastions.js" }, { "revision": "fef31c1084143785d2fc3f5788e18de4", "url": "js/filter-bestiary.js" }, { "revision": "602b4d728752539b7666fb2487a40959", "url": "js/filter-charcreationoptions.js" }, { "revision": "39d9218f97c1811b5dc9455816068ee5", "url": "js/filter-classes-raw.js" }, { "revision": "8fd152de849945158f18007beb60dae9", "url": "js/filter-classes.js" }, { "revision": "8a55deca799ae8222316056b5656ac3c", "url": "js/filter-common.js" }, { "revision": "5748b0c678d68433b39c45ba7627f0a3", "url": "js/filter-conditionsdiseases.js" }, { "revision": "738848b12a0be77146f7c3b44e7b0960", "url": "js/filter-cultsboons.js" }, { "revision": "c00dba6567a07c05972c5655e6339ad9", "url": "js/filter-decks.js" }, { "revision": "0252d1c2d6b1eda38a70072883a6c30e", "url": "js/filter-deities.js" }, { "revision": "80cdeca8aac105d928c63b16ab6c270b", "url": "js/filter-feats.js" }, { "revision": "64c73d8dd570e6cce95485c9dd558a42", "url": "js/filter-items.js" }, { "revision": "52c69568ebfc247086dec14cc87e2756", "url": "js/filter-languages.js" }, { "revision": "f91e5f5f71aa3adc2b3686be9b6ad4a6", "url": "js/filter-objects.js" }, { "revision": "6da45d038a982e96d4b67352fc4ae99c", "url": "js/filter-optionalfeatures.js" }, { "revision": "f427c0847e1b7aa85e94542166923ce7", "url": "js/filter-psionics.js" }, { "revision": "afdc452c94a704452fa708b77982e444", "url": "js/filter-races.js" }, { "revision": "f456c104edab1f28f9fe4473f2863486", "url": "js/filter-recipes.js" }, { "revision": "2de94c6401684c20a8df18466f0f92af", "url": "js/filter-rewards.js" }, { "revision": "ec3b320956814e881d40ab29b9a8bb80", "url": "js/filter-spells.js" }, { "revision": "232dca8b9fda30204d5ae4ac8aeb7af4", "url": "js/filter-tables.js" }, { "revision": "84c0d3c731eacf01e94f75dc80b011ae", "url": "js/filter-trapshazards.js" }, { "revision": "34bc44ca0242bce9ec5bee8f3866d912", "url": "js/filter-variantrules.js" }, { "revision": "543bdb2a62c55561515336488afa4fbd", "url": "js/filter-vehicles.js" }, { "revision": "99c5640d8c8d55f696911eb10cd4e008", "url": "js/filter.js" }, { "revision": "26c6194649fa75d95d197c505322f94a", "url": "js/filter/filter-box.js" }, { "revision": "7fabad1f2094728d0352da3b6f017ab6", "url": "js/filter/filter-constants.js" }, { "revision": "6482e5610c08d062c895dcd9de6fa0cb", "url": "js/filter/filter-item.js" }, { "revision": "899e1ef62e876c1cf09725febb834296", "url": "js/filter/filter-modal-filter-base.js" }, { "revision": "da8509ec1ffe83ea49666d8b56ebbba8", "url": "js/filter/filter-page-filter-base.js" }, { "revision": "d7a5ebf0d269714b3a70876570ce91da", "url": "js/filter/filter-registry.js" }, { "revision": "d7025bb57eb7babd515ea04b4c508ef1", "url": "js/filter/filter-utils.js" }, { "revision": "7a07b8b6d26ca659f7fdae890765c7b4", "url": "js/filter/filter/filter-filter-ability-score.js" }, { "revision": "71bd34fb4b33ec9052c2d3d26b060062", "url": "js/filter/filter/filter-filter-base.js" }, { "revision": "a1f547780731e0cecef02e96a6b12d7e", "url": "js/filter/filter/filter-filter-generic.js" }, { "revision": "e64cb0af7b38c05c8cc2f222b663be3b", "url": "js/filter/filter/filter-filter-multi.js" }, { "revision": "1044c059437a95d4d0a943042d2adc8a", "url": "js/filter/filter/filter-filter-options.js" }, { "revision": "56cfed530ee9e5f89572fed2ac1db8ad", "url": "js/filter/filter/filter-filter-range.js" }, { "revision": "48e5d321d394a61505e5b7dd22ec3e06", "url": "js/filter/filter/filter-filter-searchable.js" }, { "revision": "70bfce5bd6f81fd242f8cf2103a32c0b", "url": "js/filter/filter/filter-filter-source.js" }, { "revision": "ea3bc29e18769d09b9ab1ba2f625f588", "url": "js/filter/snapshot/filter-snapshot-manager.js" }, { "revision": "7169cbde50086acd40b777a49b9bfd23", "url": "js/filter/snapshot/filter-snapshot-ui-collection-base.js" }, { "revision": "cb47f39778c2c7fee067a989f709b35e", "url": "js/filter/snapshot/filter-snapshot-ui-collection-decks.js" }, { "revision": "74187337e7681e4e9569c00d5405f097", "url": "js/filter/snapshot/filter-snapshot-ui-collection-snapshots.js" }, { "revision": "68d9cc0e98e0ff0e1d8c12cab81d601a", "url": "js/filter/snapshot/filter-snapshot-ui-tab-decks.js" }, { "revision": "e673698602ae965eb9a91c3a10788ee2", "url": "js/filter/snapshot/filter-snapshot-ui-tab-snapshots.js" }, { "revision": "29d9e253d67a12f1d95768ca8aa1421c", "url": "js/filter/snapshot/filter-snapshot-ui-tab-utils.js" }, { "revision": "c1c2bf822f01f50876b4c241d01a1230", "url": "js/filter/snapshot/filter-snapshot-ui.js" }, { "revision": "a531e9eb9c9481ef8e3130e5a75fb43c", "url": "js/foundry/foundry-consts.js" }, { "revision": "76e922bd3ab75205423b63ce8935814f", "url": "js/foundry/foundry-maps.js" }, { "revision": "4c913d8e1c537205dbe2d41961eb7136", "url": "js/foundry/foundry-migrate-data.js" }, { "revision": "2c7413cafc185adbada58919c2cc8762", "url": "js/foundry/foundry-utils.js" }, { "revision": "09bc188802c9ca5fa34f63e7b68ee34e", "url": "js/generate-tables-data/generate-tables-data-models.js" }, { "revision": "f73787f90062e256f25fc833ea27dc0b", "url": "js/generate-tables-data/generate-tables-data-utils.js" }, { "revision": "52d4c8bdd89ed1d10f00752b520a1b13", "url": "js/hist.js" }, { "revision": "296c8d39b769ea62dd269e2801fb85f9", "url": "js/index.js" }, { "revision": "f278c81f2a6ec28f3541e37565f13fbe", "url": "js/initiativetracker/initiativetracker-player.js" }, { "revision": "87ec64d92dc2c3bb5a1fb18f62722d16", "url": "js/initiativetracker/initiativetracker-utils.js" }, { "revision": "a87e899c10b5cd558f6c89e93b2f14cd", "url": "js/inittrackerplayerview.js" }, { "revision": "4460d4b640d65f319d712a2756e07bc0", "url": "js/items.js" }, { "revision": "51db33d27782366c314cbc95e4db24f0", "url": "js/langdemo.js" }, { "revision": "f8bdefdc00a60cf274b992181249e3ed", "url": "js/languages.js" }, { "revision": "c88902d77f61b5d3393e1317d2fb84da", "url": "js/lifegen.js" }, { "revision": "4bc87ee5951591027379d752ba2ea9c4", "url": "js/list2.js" }, { "revision": "56a4a4f28a4531dec5ef97db33447250", "url": "js/listpage.js" }, { "revision": "f6f9ebdea193a38622fdbd273ca3379b", "url": "js/lootgen.js" }, { "revision": "d72704305b4c53e74d68f075f3a27726", "url": "js/lootgen/lootgen-const.js" }, { "revision": "0c66faf8cfc6b67998de15500373dfd0", "url": "js/lootgen/lootgen-datamanager.js" }, { "revision": "4557cdba85d0b97e0fd16d358747485a", "url": "js/lootgen/lootgen-filter-gemsartobjects.js" }, { "revision": "0677de5032185cd35f0fa2b1525324a6", "url": "js/lootgen/lootgen-generator-base.js" }, { "revision": "4efda9275eb77165ea8d4d8db2452bea", "url": "js/lootgen/lootgen-generator-dragonhoard.js" }, { "revision": "efa5d8196bad69e50928b69b2612b859", "url": "js/lootgen/lootgen-generator-findtreasure.js" }, { "revision": "2e4fd1a25910847392a9707d4be7d68c", "url": "js/lootgen/lootgen-generator-gemsartobjects.js" }, { "revision": "86233b5533fdcbfa2bf0e21662975e84", "url": "js/lootgen/lootgen-generator-loottables.js" }, { "revision": "80bab4c398a4e6fe2aef85d6c3940db7", "url": "js/lootgen/lootgen-generator-partyloot.js" }, { "revision": "4ce8489572dfc528857191805ecae239", "url": "js/lootgen/lootgen-magicitem.js" }, { "revision": "bfe92f324cd22ac06c61a46452b41fb0", "url": "js/lootgen/lootgen-output.js" }, { "revision": "d9d6a562b5612b633a55c8de3351f015", "url": "js/lootgen/lootgen-outputmanager.js" }, { "revision": "f26d2816303f0eafa3bfb660c900dd56", "url": "js/lootgen/lootgen-render.js" }, { "revision": "a3710290d61d09d04aa727e0f6c8f17c", "url": "js/lootgen/lootgen-state.js" }, { "revision": "543d16342fcd37f86b73328c99d1ca07", "url": "js/lootgen/lootgen-ui.js" }, { "revision": "9647a0a0e3442a2754b4f21d59c94297", "url": "js/lootgen/lootgen-utils.js" }, { "revision": "1fb11f9eac06286ffb03922da5b4401c", "url": "js/makebrew.js" }, { "revision": "ddb054eda8d8b01401d6a55a33470eab", "url": "js/makebrew/makebrew-builder-base.js" }, { "revision": "13770e2c584695cd38984d14bf99c7bc", "url": "js/makebrew/makebrew-builderui.js" }, { "revision": "5c035f8dd774bb8e7ec2d2ae661292fa", "url": "js/makebrew/makebrew-creature.js" }, { "revision": "ba92bfc05c2aa657853e55d0f30e6bd6", "url": "js/makebrew/makebrew-legendarygroup.js" }, { "revision": "acf5ec3f03abf310ea6e051699862035", "url": "js/makebrew/makebrew-spell.js" }, { "revision": "afd5e5a0964915efc5a87b1411fe2295", "url": "js/makecards.js" }, { "revision": "6d5b83e48112d483e978705b9c80caba", "url": "js/managebrew.js" }, { "revision": "eb90b618e78913a0d4330dd386b57a97", "url": "js/manageexternal/manageexternal-utils.js" }, { "revision": "18e16daa2c22ec5c4b8cbb4eba097a1a", "url": "js/manageprerelease.js" }, { "revision": "83c2a4dd4dd96768310fd0110a24927c", "url": "js/maps-util.js" }, { "revision": "4620138863cf546b3f0350564737a615", "url": "js/maps.js" }, { "revision": "bcd03091340d5990dc3e8e3066dae412", "url": "js/multisource.js" }, { "revision": "593135c18113cee6a2d3cd66dd18d83d", "url": "js/names.js" }, { "revision": "dd9bcd39d80ba17c838237d4522920fa", "url": "js/navigation.js" }, { "revision": "b11aa4a1410d2d75dfe81eb73f556472", "url": "js/objects.js" }, { "revision": "61cdbbe866966cb23278325bd921e5b6", "url": "js/omnidexer.js" }, { "revision": "a6c238857495866db32fcb50dfd18edb", "url": "js/omnisearch.js" }, { "revision": "0cc56fa90f547d546097ef397bc0a694", "url": "js/omnisearch/omnisearch-backing.js" }, { "revision": "5e66a2929e4e079f250eaea79375d48a", "url": "js/omnisearch/omnisearch-consts.js" }, { "revision": "2211ce87be939f8ea9f40f04eec5c30d", "url": "js/omnisearch/omnisearch-models.js" }, { "revision": "3384d670f88eb48a34a2be61103e8573", "url": "js/omnisearch/omnisearch-state.js" }, { "revision": "9f695d7432ab57db9decfdb962cab028", "url": "js/omnisearch/omnisearch-utils-ui.js" }, { "revision": "b7ef6901acb49f0fc0bad86a6cf8bdd5", "url": "js/optionalfeatures.js" }, { "revision": "7eebc29e39a19658890239ea8603e479", "url": "js/parser.js" }, { "revision": "257e50dc543e0c7fa01889dc5a21b550", "url": "js/plutonium.js" }, { "revision": "a1a519f7c3523886e14481d9a5b7fae1", "url": "js/privacy-policy.js" }, { "revision": "ffb4bbec19dff7552830b17475d57fc8", "url": "js/psionics.js" }, { "revision": "a10a9e3cf9ec35171a82fca884e47f02", "url": "js/quickreference.js" }, { "revision": "331de69c5df275cbfa486014671ba9c4", "url": "js/races.js" }, { "revision": "84d55fe6eaca2f85a51e7486798c8403", "url": "js/recipes.js" }, { "revision": "bbd43a10e7030ca655e7e64a055481d7", "url": "js/render-actions.js" }, { "revision": "197f9f99d9de8c274e1c87b17fa45eb1", "url": "js/render-backgrounds.js" }, { "revision": "ec812831203c5b0f12c7ac0b11704ae7", "url": "js/render-bastions.js" }, { "revision": "f6f7a3253368ebbde697d1865e78a629", "url": "js/render-bestiary.js" }, { "revision": "c414509b06ed049b04141a506602953f", "url": "js/render-card.js" }, { "revision": "da47f8da6f665442294e0088ad2d6b5b", "url": "js/render-charcreationoptions.js" }, { "revision": "89a3592a21c1ed33c2c86f9e8f616a1c", "url": "js/render-class.js" }, { "revision": "436f340a244709583d2e4abe1e692af8", "url": "js/render-conditionsdiseases.js" }, { "revision": "44c39075705ca9c62a9d755eb7a3d7b4", "url": "js/render-cultsboons.js" }, { "revision": "17dab82481db451e147dc9af7eed889c", "url": "js/render-decks.js" }, { "revision": "6e446d8923a3d55c84540795df04043e", "url": "js/render-deities.js" }, { "revision": "f8219c8d6fddc7d315319f3260a46b8f", "url": "js/render-dice.js" }, { "revision": "1f827bddc90e6b7ce80b5bc4a2b617f2", "url": "js/render-feats.js" }, { "revision": "506d610cd7f0bf52bcbb08c06532ff5d", "url": "js/render-icon.js" }, { "revision": "97de3dce63ba06842d009161de2c592d", "url": "js/render-items.js" }, { "revision": "d1272ad404fc4da07ef80db72ce8eb6f", "url": "js/render-languages.js" }, { "revision": "43f80edbd307ab6c3133e5bca84968c7", "url": "js/render-map.js" }, { "revision": "0b374058d33f13763a344955bf0e0420", "url": "js/render-markdown.js" }, { "revision": "8627c794c2cbf39b0826166f60bc22f0", "url": "js/render-objects.js" }, { "revision": "0cbe96e7cfc905201477be058ad8d9b8", "url": "js/render-optionalfeatures.js" }, { "revision": "ca0a95e51e3c88645bea81bd088bf07d", "url": "js/render-page-base.js" }, { "revision": "7e5450e26501d654157fbf12c02f102c", "url": "js/render-psionics.js" }, { "revision": "d22743c3a2dc0646854e123c2c58bb19", "url": "js/render-races.js" }, { "revision": "349b48a972a8f3787083b5569d5819f6", "url": "js/render-recipes.js" }, { "revision": "3b994f61a2f0d9a1f7cf77735fe452c8", "url": "js/render-rewards.js" }, { "revision": "f920d804f40e369b58af60f8139e8b98", "url": "js/render-spells.js" }, { "revision": "613ec37475532c182cb9226e622d672f", "url": "js/render-tables.js" }, { "revision": "5b86557bb8cbcad0e5ff223055bff5df", "url": "js/render-trapshazards.js" }, { "revision": "840ffe01a83a4bb03641d0addeff08fe", "url": "js/render-variantrules.js" }, { "revision": "e7a93b274d5a7bc658ee7b0c3eb51071", "url": "js/render-vehicles.js" }, { "revision": "ece1936042c32f266492f1ef477b02fa", "url": "js/render.js" }, { "revision": "a6eed9f9d716bf8d6ea86153ce758563", "url": "js/renderdemo.js" }, { "revision": "86b97be3a4d43b5cf402e069bf2043e9", "url": "js/rewards.js" }, { "revision": "f25446cb17b1c10beabd3fbb42cc7ade", "url": "js/rolang.js" }, { "revision": "262aca51728c05a7f35b327ac692115e", "url": "js/scalecreature/scalecreature-consts.js" }, { "revision": "65b231427a4dafb5c911b9fa2cda2601", "url": "js/scalecreature/scalecreature-damage-expression.js" }, { "revision": "c4057757c87f979e53220c7fab774f8c", "url": "js/scalecreature/scalecreature-scaler-cr.js" }, { "revision": "f86e703327b4c4a0304f6a1db5f0bbb6", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-armorclass.js" }, { "revision": "2d59e6f059699880575cf5408d0bc368", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-base.js" }, { "revision": "bb438f932230cd3cd3323db5075a85cb", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-dpr.js" }, { "revision": "c8f135d9abca87ac6d35287401d8805a", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-hitsave.js" }, { "revision": "5102384b9e731c5bec2e059659f1ff1a", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-hp.js" }, { "revision": "e50c1973e3681e5b67a7aeb2c170b0cb", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-state.js" }, { "revision": "92fa2a4ca32a9bccbd6faa9abdef75bf", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-utils-attack.js" }, { "revision": "8e6ae0c6cbe8951ad9f4af6d346340e6", "url": "js/scalecreature/scalecreature-scaler-cr/scalecreature-scaler-cr-utils.js" }, { "revision": "87545eb83fd3a36cf1bf552e7164eef0", "url": "js/scalecreature/scalecreature-scaler-summon-base.js" }, { "revision": "2966975c0216dc56923d414da754f831", "url": "js/scalecreature/scalecreature-scaler-summon-class.js" }, { "revision": "ffcb8218d4122870d64d9ee179fdb56f", "url": "js/scalecreature/scalecreature-scaler-summon-spell.js" }, { "revision": "c4f6bf8d28b1ec368c6dea3c071cbe7d", "url": "js/scalecreature/scalecreature-utils.js" }, { "revision": "46641e616f94aee3fd2f45e9f43a4a8b", "url": "js/search.js" }, { "revision": "521a5b8959048bb7a7ecc11e34190e64", "url": "js/seo-loader.js" }, { "revision": "d75ba3324752db0fe67454722baa569c", "url": "js/shim-esmodules.js" }, { "revision": "0179244719ac038eb2b59563133173f4", "url": "js/spells.js" }, { "revision": "7bc73cd985bd7d60da4598ebbc229fe0", "url": "js/statgen.js" }, { "revision": "dd04519f1a2b6b6801f10faf2377a43e", "url": "js/statgen/statgen-ui-comp-asi.js" }, { "revision": "13784e20575056aa5d11eddb26faf943", "url": "js/statgen/statgen-ui-comp-levelone-background.js" }, { "revision": "28e8c02ae47e4a9a7759a55df079b36a", "url": "js/statgen/statgen-ui-comp-levelone-entitybase.js" }, { "revision": "4377611cb21994d01c354db48bea7aa3", "url": "js/statgen/statgen-ui-comp-levelone-race.js" }, { "revision": "78a3117172c24e44d08a35d0e0c8a451", "url": "js/statgen/statgen-ui-comp-pbrules.js" }, { "revision": "874e5ef7aaf7acef5d241865908904ff", "url": "js/statgen/statgen-ui-consts.js" }, { "revision": "11748d3379e4c0af139af76dbd2e4492", "url": "js/statgen/statgen-ui.js" }, { "revision": "7b1c7880134c1d379029bd2e632d6262", "url": "js/statgen/statgen-util-additionalfeats.js" }, { "revision": "b79c1fecace9911f2186072627049fab", "url": "js/styleswitch.js" }, { "revision": "9c86df3d248e178f80082bb9742c2cfb", "url": "js/tablepage.js" }, { "revision": "9c478a007510e950a3fe4662e679d370", "url": "js/tables.js" }, { "revision": "02980b91b226b5d7f2e7ad07c83a5bb7", "url": "js/trapshazards.js" }, { "revision": "1c18adaf1ec69c4d31f93b9523376a5a", "url": "js/utils-blocklist/utils-blocklist.js" }, { "revision": "d4076e476fa82250c142226fc592cfb8", "url": "js/utils-brew.js" }, { "revision": "f45ff8b21cda279bc41b7891c5d4a9d7", "url": "js/utils-brew/utils-brew-base.js" }, { "revision": "45d0e739efa75840735e7e643876dd2f", "url": "js/utils-brew/utils-brew-constants.js" }, { "revision": "63e5f769414a8fd02a15b1d6e08e80e9", "url": "js/utils-brew/utils-brew-content-migrator.js" }, { "revision": "a135d0c60258eef2220a8900284fbf3b", "url": "js/utils-brew/utils-brew-helpers.js" }, { "revision": "2c94fe8b04dc2a2a5e5c250eae4bc3c2", "url": "js/utils-brew/utils-brew-impl-brew.js" }, { "revision": "801955a7d88dcea63a84b4cacdc040b4", "url": "js/utils-brew/utils-brew-impl-prerelease.js" }, { "revision": "33cdf9d80ea29c476a0f1af4549be5c6", "url": "js/utils-brew/utils-brew-models.js" }, { "revision": "77834e5c89d398d1ccef17fd24de4254", "url": "js/utils-brew/utils-brew-ui-get.js" }, { "revision": "9e647b69370874e8e0384e08f60d4b2a", "url": "js/utils-brew/utils-brew-ui-manage-editable-contents.js" }, { "revision": "b01a5e7ce9c31cc93996454edc0ac4e8", "url": "js/utils-brew/utils-brew-ui-manage.js" }, { "revision": "e772eb4dec240665837e4835ed823d43", "url": "js/utils-changelog.js" }, { "revision": "cda40ba5ae7fbd24dfcc30ac3c5e98f3", "url": "js/utils-config.js" }, { "revision": "70719c52285b5e3fe7f73559a28518cc", "url": "js/utils-config/util-config-helpers.js" }, { "revision": "09dc619cd0f50a869af9d05b2efd4dba", "url": "js/utils-config/util-config-settings-group.js" }, { "revision": "f16e000214f23af3c651a1b0cb02117b", "url": "js/utils-config/utils-config-config.js" }, { "revision": "d831f20c569f430f91bcb0de48f07303", "url": "js/utils-config/utils-config-registry.js" }, { "revision": "630853169cca6cb0e1dd9220b674b050", "url": "js/utils-config/utils-config-setting-base.js" }, { "revision": "fded53c776fa8c8285d209c3c542f5dd", "url": "js/utils-config/utils-config-ui.js" }, { "revision": "b66279a603acdc7fd0feb0c3ff892564", "url": "js/utils-dataloader.js" }, { "revision": "ae66fc74e8d694c33cb11b764f6536f0", "url": "js/utils-font.js" }, { "revision": "4a7391d2fc506eea0820717215205be0", "url": "js/utils-generate.js" }, { "revision": "ae2ccf1e20cd2998cefa1e424f4347cc", "url": "js/utils-list-bestiary.js" }, { "revision": "540a14130a4aa56417652399f0def1d0", "url": "js/utils-list.js" }, { "revision": "7812aa31a67291014028e91b613dc0a0", "url": "js/utils-omnisearch.js" }, { "revision": "b786b38cda3002c7de70abd35c006a59", "url": "js/utils-p2p.js" }, { "revision": "09e32dd127f424951204c3056f845c6f", "url": "js/utils-proporder.js" }, { "revision": "5d0a837bfd9caf4bacfab7773083e36d", "url": "js/utils-proporder/utils-proporder-config-shared.js" }, { "revision": "d4712815e633f3443f1ba55dae3a98ca", "url": "js/utils-proporder/utils-proporder-config.js" }, { "revision": "3832c0015642f24f6c06652f78d9f202", "url": "js/utils-proporder/utils-proporder-models.js" }, { "revision": "2be7d1d56ad9ceeb62a384cdd7d54005", "url": "js/utils-proporder/utils-proporder-sort.js" }, { "revision": "e9bde8994a8b42c946fd7ea6db0a31c9", "url": "js/utils-tableview.js" }, { "revision": "4eea34a4fe2790b0e00a83f30450e2c7", "url": "js/utils-ui.js" }, { "revision": "fcc7b66c7882211afe0cef7b98b9d22b", "url": "js/utils.js" }, { "revision": "a581aa98567fc85b75e4df829b060e4d", "url": "js/utils/utils-additionalspells.js" }, { "revision": "b1c98008b2e05cd67db18f124567ff9b", "url": "js/utils/utils-entity-background.js" }, { "revision": "da639b375bceaaaf87bf085138c094ac", "url": "js/utils/utils-entity-creature.js" }, { "revision": "81349b5e991c8880d4ddc3a6708b7bef", "url": "js/utils/utils-entity-race.js" }, { "revision": "479dc5d594dbf781c53b5c028db6439e", "url": "js/utils/utils-startingequipment.js" }, { "revision": "d63905d9e183766ffde724259422b45f", "url": "js/utils/utils-weaponproficiencies.js" }, { "revision": "4596f8393c2f27874ba1d28f0194e6b4", "url": "js/variantrules.js" }, { "revision": "bedf29c921ec48073d119a27ff735330", "url": "js/vehicles.js" }, { "revision": "989694a521f21861caa4c63b0d5294e1", "url": "lib/ace.js" }, { "revision": "19a0b0b2fec7a63b85d8e32061fd441e", "url": "lib/bootstrap-typeahead.js" }, { "revision": "bd697d59012b8b3f12cb511883a0dd41", "url": "lib/dom-to-image-more.min.js" }, { "revision": "bdc2dbed628a3bb7a62d58b999dd7123", "url": "lib/elasticlunr.js" }, { "revision": "45b80f460bddf237db68b44c35b7c335", "url": "lib/ext-searchbox.js" }, { "revision": "220afd743d9e9643852e31a135a9f3ae", "url": "lib/jquery.js" }, { "revision": "67b68a5a86082dd366091650f95919be", "url": "lib/jquery.panzoom.js" }, { "revision": "6de1bf1f7f98328eba5295e0e8a00110", "url": "lib/localforage.js" }, { "revision": "cffdefcc7477466752a3433488c43036", "url": "lib/lzma.js" }, { "revision": "237e833a74a6352472f27a478d90139b", "url": "lib/mode-html.js" }, { "revision": "5a7b7fe57af491381c2c5b29ca463568", "url": "lib/mode-json.js" }, { "revision": "d90fdd75caec8a462a4bbbe2fd8e46fc", "url": "lib/mode-markdown.js" }, { "revision": "7136ca01554518d6d03a377b33513e79", "url": "lib/peerjs.js" }, { "revision": "b9c07a2002a98992a76d7c1667e48938", "url": "lib/polylabel.js" }, { "revision": "c392e04d05a5f69d1bdcf76f72ff25fe", "url": "lib/theme-tomorrow_night.js" }, { "revision": "d3cac21d4fc1f49ff7fe4385a976242e", "url": "lib/theme-tomorrow.js" }, { "revision": "24e81b69f0ac46447a541980e8b42fab", "url": "lib/tinyqueue.js" }, { "revision": "f984378675041f3bf49bac6b7743e2a4", "url": "css/bestiary.css" }, { "revision": "934a4b97d9fb0d2df49992e24da5927c", "url": "css/bootstrap.css" }, { "revision": "4be4bab71291172dce3c0949ede20e5a", "url": "css/changelog.css" }, { "revision": "ab054925218fa47bab185bca81dd25bd", "url": "css/classes.css" }, { "revision": "5a080f61068d6867b0773b2426a848bc", "url": "css/converter.css" }, { "revision": "cbd95680734a51e3167770ca334304a9", "url": "css/crcalculator.css" }, { "revision": "47193b313d4648d40c691056548322bf", "url": "css/decks.css" }, { "revision": "d9fbc90816c9b8ddae345e065cf8413f", "url": "css/dmscreen.css" }, { "revision": "2e54b4352d8951fb49e3883e19528afc", "url": "css/encounterbuilder-bundle.css" }, { "revision": "cf4bf9b431a9f62414c51038bf49e4f6", "url": "css/fontawesome.css" }, { "revision": "515738971f2f7c15e4b8938c4ff590e4", "url": "css/index.css" }, { "revision": "8f8dad071ef65950f876c2edc89506ec", "url": "css/inittrackerplayerview.css" }, { "revision": "33427c3244259efcbe053e979cae5a93", "url": "css/items.css" }, { "revision": "8ac8d45be5893d525cd414767973e20e", "url": "css/langdemo.css" }, { "revision": "9d25b8b7d680caaab54a1de5e37b5a1b", "url": "css/languages.css" }, { "revision": "a7b99b0af5789c0fc94fba1194327241", "url": "css/lifegen.css" }, { "revision": "291b613346ad96335ed475d998f49f28", "url": "css/list-page--grouped.css" }, { "revision": "79cf9615f237355abca85679bdb4045d", "url": "css/lootgen-bundle.css" }, { "revision": "f9e7d35c2c35a5b151349a77b8254309", "url": "css/main.css" }, { "revision": "7ddb0fcfa9f3b20b5c4c6127096b9df7", "url": "css/makebrew.css" }, { "revision": "1ed486adaaa61b913e405e03cdba1d6a", "url": "css/makecards.css" }, { "revision": "6cc1a22a2fe71157773058e0353cc022", "url": "css/maps.css" }, { "revision": "2ce64beb30e254951f275edec5b5bd02", "url": "css/objects.css" }, { "revision": "15143ea472fc45ee9225dfa978743a85", "url": "css/optionalfeatures.css" }, { "revision": "e8d212eb230354407d31c090248af14b", "url": "css/plutonium.css" }, { "revision": "d7961c5fcf9c98ddd61ad1721d3d9707", "url": "css/recipes.css" }, { "revision": "dcf42a35e835076289ff4134d798cfd6", "url": "css/renderdemo.css" }, { "revision": "7c47b50bfff4285265dd261f799ead98", "url": "css/search.css" }, { "revision": "292aedafab0e3816d46fddc9bc90d680", "url": "css/spells.css" }, { "revision": "80f50ceeb3e6494cd7ff3368d0f26bb8", "url": "css/statgen-bundle.css" }, { "revision": "11f0ae7d5b474cbc4cd47a0904da4359", "url": "css/vehicles.css" }, { "revision": "8a80554c91d9fca8acb82f023de02f11", "url": "homebrew/_generated/index-abbreviations.json" }, { "revision": "b8fa802d4627dd072d3f03004b05e006", "url": "homebrew/_generated/index-adventure-book-ids.json" }, { "revision": "c51e64668357ed4185c84ae48c93c7e5", "url": "homebrew/_generated/index-meta.json" }, { "revision": "8a80554c91d9fca8acb82f023de02f11", "url": "homebrew/_generated/index-names.json" }, { "revision": "fd323737a6e442eb3f3d2e4ad0b91548", "url": "homebrew/_generated/index-props.json" }, { "revision": "b5366181ff9c8c3c23397772c37c61f6", "url": "homebrew/_generated/index-sources.json" }, { "revision": "e2d2e32aeb359e846f236ac813682a5f", "url": "homebrew/_generated/index-timestamps.json" }, { "revision": "96736e6a49f9ceb96b6e35935c0ad35d", "url": "homebrew/adventure/Arcanum Worlds; Odyssey of the Dragonlords.json" }, { "revision": "db969ef59b546ac82347d62bbdf70b80", "url": "homebrew/adventure/Ghostfire Gaming; Dungeons of Drakkenheim In Search of the Smuggler's Secrets.json" }, { "revision": "11cf60b2d4ced669be7c468629312d25", "url": "homebrew/adventure/Kobold Press; Book of Lairs.json" }, { "revision": "6858162cf30855224dea918a5460919a", "url": "homebrew/adventure/Kobold Press; Tome of Beasts 2 Lairs.json" }, { "revision": "b2360ffcfa3a08688d3aafecabb25bb7", "url": "homebrew/adventure/Kobold Press; Tome of Beasts 3 Lairs.json" }, { "revision": "278ba72103c936cbb2d730f191cbc214", "url": "homebrew/adventure/MonkeyDM; Heresy of Steel - A Steinhardt's Adventure.json" }, { "revision": "e15b49a02276fb7164e073593d6869f8", "url": "homebrew/adventure/Winghorn Press; To the End of Time.json" }, { "revision": "551a14dfb3dd1065d70fa75fbe400f81", "url": "homebrew/background/zeek0; Backgrounds Omnibus.json" }, { "revision": "7105561c472d1e8b902ab4adc8537ba9", "url": "homebrew/baseitem/enders; Oversized Longbow.json" }, { "revision": "a2b3787eb946957ab61eecdb7c4a2ef3", "url": "homebrew/book/aeyana; The Book of Hordes.json" }, { "revision": "f22d1061d04f16ae135684707a6d23e8", "url": "homebrew/book/Curio Solus; Festival Activies.json" }, { "revision": "2dd5f366694932123cb9a9d870a8e171", "url": "homebrew/book/Dave Eisinger; Discerning Merchant's Price Guide.json" }, { "revision": "0dda93db327597ef1124bff3157ea7cc", "url": "homebrew/book/Dungeon Rollers; Ancestral Weapons.json" }, { "revision": "75c83a351ff9f8e611b3c97e3d2bd7b5", "url": "homebrew/book/Ghostfire Gaming; Grim Hollow Campaign Guide.json" }, { "revision": "0e380d1f070af792e521b94261e45644", "url": "homebrew/book/Ghostfire Gaming; Grim Hollow Player's Guide.json" }, { "revision": "c94130af2bf87f02be370397e1bf3521", "url": "homebrew/book/Ghostfire Gaming; Stibbles Codex of Companions.json" }, { "revision": "61baf837b83ec0fbf0fa790956cd5e68", "url": "homebrew/book/Ghostfire Gaming; The Seeker's Guide to Twisted Taverns.json" }, { "revision": "4bbaff296a36908919639853c4cb7029", "url": "homebrew/book/Goob the Goblin; A Guide for Warlocks, Mysteries of Magic.json" }, { "revision": "dab418711905f98f0cb1b44937c0c649", "url": "homebrew/book/Hipsters & Dragons; The White Scorpions Assassins Guild.json" }, { "revision": "2ef6c9480b0b94608da3ca4571215676", "url": "homebrew/book/Jean Lorber; Knowledge is Power.json" }, { "revision": "aa5cde50a2b5caea6e6b24d1f823f6b7", "url": "homebrew/book/Justice Arman; Devil's Advocate A Guide to Infernal Contracts.json" }, { "revision": "de331e5fc4a6b38741e68f7bf8df6147", "url": "homebrew/book/Loresmyth; Remarkable Inns & Their Drinks.json" }, { "revision": "e30e3acdb386e08c04a103af9615c8eb", "url": "homebrew/book/MCDM Productions; Kingdoms & Warfare.json" }, { "revision": "0dd4dcc73ce3958137af9398b46a5771", "url": "homebrew/book/Michael E Shea; Return of the Lazy Dungeon Master.json" }, { "revision": "b2838d70ecb76a39d39acb6d853fb986", "url": "homebrew/book/Raiders of the Serpent Sea; Player's Guide Free.json" }, { "revision": "efad8553f20e01330b58150e83af9c1d", "url": "homebrew/book/Russ Morrissey; Archery Contest.json" }, { "revision": "dcc8e830d606d15bc4cce5f2d928755b", "url": "homebrew/book/Saidoro; Sane Magic Item Prices.json" }, { "revision": "da269a35899454c5b0521df3fad61cb8", "url": "homebrew/book/Skip Wiliams; Book of Challenges.json" }, { "revision": "0a2f30ca6707b5ec244ec13136d255b6", "url": "homebrew/book/Walrock Homebrew; Fortresses, Temples, & Strongholds.json" }, { "revision": "65faeefd4a4637e13e429132a75a5149", "url": "homebrew/book/Walrock Homebrew; Teas and Tisanes.json" }, { "revision": "4d1292806608695ff54ff8c9cc3918c7", "url": "homebrew/book/Walrock Homebrew; Traders and Merchants.json" }, { "revision": "e7c42baca8ef94b696eec7ce49ba6391", "url": "homebrew/class/Benjamin Huffman; Pugilist.json" }, { "revision": "428666d7eae9be3f489213cc50f443c7", "url": "homebrew/class/Benjamin Huffman; The Magus.json" }, { "revision": "5a0210c56aab654cc31869b2482c1bb1", "url": "homebrew/class/Ghostfire Gaming; Monster Hunter.json" }, { "revision": "e43700e940c4d86c733b5e42d6f92045", "url": "homebrew/class/Heavyarms; Gunslinger.json" }, { "revision": "f9d954dbe8164683df11c5013d5634bb", "url": "homebrew/class/KibblesTasty; Inventor.json" }, { "revision": "e0c5aa699dd4157227f0b6c2993e8e0e", "url": "homebrew/class/KibblesTasty; Occultist.json" }, { "revision": "c5dafadfeb4142f0109979ba3364052e", "url": "homebrew/class/KibblesTasty; Psion.json" }, { "revision": "b0da16cce67788491aae7b6daa6b782f", "url": "homebrew/class/KibblesTasty; Spellblade.json" }, { "revision": "1352b500fe726bfa8942584d7b1718d7", "url": "homebrew/class/KibblesTasty; Warlord.json" }, { "revision": "247785e5e3a7378918093f5f39b7bac4", "url": "homebrew/class/LaserLlama; Alternate Artificer.json" }, { "revision": "78a23b886bfc1e65378074461a856348", "url": "homebrew/class/LaserLlama; Alternate Barbarian.json" }, { "revision": "8a3dc09015abd04c0693b26e5552669a", "url": "homebrew/class/LaserLlama; Alternate Bard.json" }, { "revision": "2690296c79738469721c04177228fbb0", "url": "homebrew/class/LaserLlama; Alternate Blood Hunter.json" }, { "revision": "20411675f5ccc6e5f27a56092edc82cf", "url": "homebrew/class/LaserLlama; Alternate Druid.json" }, { "revision": "a96db5b450bd2ef70241c7eebc2afecd", "url": "homebrew/class/LaserLlama; Alternate Fighter.json" }, { "revision": "3569f5a9f1fcacf46e4ed6e6f5f94395", "url": "homebrew/class/LaserLlama; Alternate Monk.json" }, { "revision": "48c31f82ffc1a8f0722d2ada44590029", "url": "homebrew/class/LaserLlama; Alternate Paladin.json" }, { "revision": "2310fd86a8a21f6858a0da3e6b01b72b", "url": "homebrew/class/LaserLlama; Alternate Ranger.json" }, { "revision": "ecca867f29bb5ffd29108bd3fb95023d", "url": "homebrew/class/LaserLlama; Alternate Rogue.json" }, { "revision": "d2b20d5446d4b22bf456c33d0261e739", "url": "homebrew/class/LaserLlama; Alternate Sorcerer.json" }, { "revision": "05b2950bf1249188d8c55f81f4f31835", "url": "homebrew/class/LaserLlama; Alternate Warlock.json" }, { "revision": "577752a7d5ae654e044bd0523bfb892b", "url": "homebrew/class/LaserLlama; Alternate Wizard.json" }, { "revision": "6ee374e0c5dc8f29d50f5dec0acfbdfa", "url": "homebrew/class/LaserLlama; Magus.json" }, { "revision": "41366e201f27fd69385eb6bdf9266377", "url": "homebrew/class/LaserLlama; Psion.json" }, { "revision": "2ddaffd9f5cf37990699c67b1f4d11d6", "url": "homebrew/class/LaserLlama; Savant.json" }, { "revision": "14f2e5417eaf1f735d63856a399d4cb6", "url": "homebrew/class/LaserLlama; Shaman.json" }, { "revision": "4fd18cb1175d768ddd1907ab1133cae8", "url": "homebrew/class/LaserLlama; Vessel.json" }, { "revision": "f0fc37ba98a254843b81bce384e8fcd3", "url": "homebrew/class/LaserLlama; Warlord.json" }, { "revision": "3b7756db6c8d292d5ce85c99098a4fed", "url": "homebrew/class/Loot Tavern; Gunner.json" }, { "revision": "8fbd09e76074c174ed9070b7e5ae637a", "url": "homebrew/class/Mage Hand Press; Complete Binder.json" }, { "revision": "c140694a919725e79c099ba764dd1bbd", "url": "homebrew/class/Mage Hand Press; Gunslinger.json" }, { "revision": "1f38e1e9a5fe7c5a523ab10c52284435", "url": "homebrew/class/Matthew Mercer; Blood Hunter (2022).json" }, { "revision": "2f5087361d360373222b63108a17c28c", "url": "homebrew/class/MCDM Productions; Beastheart.json" }, { "revision": "87bf458152e883a9efb1bfe083d230f6", "url": "homebrew/class/MCDM Productions; The Illrigger Revised.json" }, { "revision": "08f91d724fcc985054f6b414d9d4b503", "url": "homebrew/class/Rain-Junkie; Dragon Knight.json" }, { "revision": "52b306a48d7ffb9164bb573107cb690d", "url": "homebrew/collection/1985 Games; Obojima - Tales from the Tall Grass.json" }, { "revision": "570ac0564761364c9e4da66d73347bc4", "url": "homebrew/collection/AcidArmy; AcidArmy's Book of Crossovers.json" }, { "revision": "266be79fb30c6604090cbcbef4135fc2", "url": "homebrew/collection/Alex Clippinger; Tome of the Pact.json" }, { "revision": "73ab3d486313268560dd33b3d5b84c18", "url": "homebrew/collection/Andrew Welker; Tasha's Crucible of Everything Else vol 2.json" }, { "revision": "98fe510bfc9bfc03545a06d571d5535c", "url": "homebrew/collection/Arcanum Worlds; Odyssey of the Dragonlords Player's Guide.json" }, { "revision": "9d44f1027d500a9bf0677ffc76f7244e", "url": "homebrew/collection/badooga; Badooga's Exploration Guidelines.json" }, { "revision": "e530f5468eb9d3dd04592fc195184734", "url": "homebrew/collection/badooga; Badooga's Monster Guidelines.json" }, { "revision": "01cde1a082c3e6fbf06f16eee1e51a1d", "url": "homebrew/collection/Benevolent Evil; The Elements and Beyond.json" }, { "revision": "8462d4a0241671857c56ca790d78a675", "url": "homebrew/collection/Bonus Action; Bonus Action.json" }, { "revision": "39b5a27588a399d91f391f504afe0d79", "url": "homebrew/collection/DMs Guild; Archetypes of Eberron.json" }, { "revision": "ac9eecdd042aa0c8dd30ff5c63a1dc36", "url": "homebrew/collection/DMsGuild; Xanathar's Lost Notes to Everything Else.json" }, { "revision": "6f8f64c070b8cc60bbcccea314f4ef0c", "url": "homebrew/collection/Dungeon Dudes; Sebastian Crowe's Guide to Drakkenheim.json" }, { "revision": "aa447ff1e34ea1c870b3552f4c816d39", "url": "homebrew/collection/Genuine Fantasy Press; The Compendium of Forgotten Secrets - Awakening.json" }, { "revision": "b85e09bb331d40f221315d15a27b662e", "url": "homebrew/collection/Ghostfire Gaming; Dungeons of Drakkenheim.json" }, { "revision": "7ca597614d0cc554bdafb756275c8dcd", "url": "homebrew/collection/Ghostfire Gaming; Grim Hollow - Lairs of Etharis.json" }, { "revision": "8612eef7bcdcd888caa075d8cc82865d", "url": "homebrew/collection/Ghostfire Gaming; Grim Hollow - Player Pack.json" }, { "revision": "7d8de917ea85e3a13dedbebdb3596d1a", "url": "homebrew/collection/Ghostfire Gaming; Grim Hollow - Player's Guide - 2024.json" }, { "revision": "2d1232c148757c371c0c649955f17c1c", "url": "homebrew/collection/Ghostfire Gaming; Grim Hollow - The Monster Grimoire.json" }, { "revision": "b338e660cb0b2b669439d30200bf065b", "url": "homebrew/collection/Griffin Macaulay; The Griffon's Saddlebag, Book 1.json" }, { "revision": "eceb7676b8cc88e11fe9617e57debb9e", "url": "homebrew/collection/Griffin Macaulay; The Griffon's Saddlebag, Book 2.json" }, { "revision": "2e694aa734a12730231d1a3c3f6d14a4", "url": "homebrew/collection/Griffin Macaulay; The Griffon's Saddlebag, Book 3.json" }, { "revision": "ceb032da9f7d57a8a0c04a0fe7c81449", "url": "homebrew/collection/Griffin Macaulay; The Griffon's Saddlebag, Book 4.json" }, { "revision": "57d489be1db3915294be0d08e45cddbe", "url": "homebrew/collection/Heavyarms; The Complete Armorer's Handbook.json" }, { "revision": "21dda342d49451339e1d1863dccc1b24", "url": "homebrew/collection/Hit Point Press; Humblewood Campaign Setting.json" }, { "revision": "28658a8036bd1959b3773de66792b720", "url": "homebrew/collection/Hit Point Press; Humblewood Tales.json" }, { "revision": "5f5f8c8d3065ab6f4e778b127e22324d", "url": "homebrew/collection/Jeremy Forbing; Elminsters Guide to Magic.json" }, { "revision": "74a37ebefcf7f615ddb0aa433de38eca", "url": "homebrew/collection/Jonoman3000; Blazing Dawn Player's Companion.json" }, { "revision": "a138e2439cdbf02fae38b20bd96af99b", "url": "homebrew/collection/Jonoman3000; Dark Arts Players Companion.json" }, { "revision": "75578758565b7d5a7fca026917d89e27", "url": "homebrew/collection/Jonoman3000; Sprouting Chaos Player's Companion.json" }, { "revision": "edf45203ebfa67632e5f7ce1c37d15d0", "url": "homebrew/collection/Keith Baker; Chronicles of Eberron.json" }, { "revision": "f8c96c7ebe28d51638ee06c2f8c408ca", "url": "homebrew/collection/Keith Baker; Dread Metrol - Into the Mists.json" }, { "revision": "93b9474fc32f806039283cf19fb62f9b", "url": "homebrew/collection/Keith Baker; Exploring Eberron.json" }, { "revision": "438a1f4eab25b3f173af761f5732e366", "url": "homebrew/collection/Keith Baker; Frontiers of Eberron Quickstone.json" }, { "revision": "1b7203558bb349e99edd67f3cd6d1453", "url": "homebrew/collection/Keith Baker; Inner Circle Exclusives.json" }, { "revision": "bc0c7144a736aa3d4ed6fdb2fe7ccce0", "url": "homebrew/collection/Keith Baker; Morgrave Miscellany.json" }, { "revision": "9a79f1c646de9c62ee29c21650bade4a", "url": "homebrew/collection/KibblesTasty; Kibbles' Compendium of Legends and Legacies.json" }, { "revision": "450440b1bf33a8a6689e2f5db74591a4", "url": "homebrew/collection/KibblesTasty; Kibbles' Crafting Guide.json" }, { "revision": "b52120c56c07e2c26ffc41d0de18873c", "url": "homebrew/collection/Kobold Press; Book of Ebon Tides.json" }, { "revision": "441132c44c131cd765567deaec08b16d", "url": "homebrew/collection/Kobold Press; Tales from the Shadows.json" }, { "revision": "a1703053e2eba9fb058a7e6d074d7f6f", "url": "homebrew/collection/Kobold Press; Tome of Heroes.json" }, { "revision": "5aa75295fabfdd267a05dd726cf6e70f", "url": "homebrew/collection/Loot Tavern; Heliana's Guide To Monster Hunting.json" }, { "revision": "966b01fcb9c81dff30b6311a98584709", "url": "homebrew/collection/Loot Tavern; Ryoko's Guide to Yokai Realms.json" }, { "revision": "4e7076274f87359cd271eb6bf76e3d76", "url": "homebrew/collection/Loot Tavern; Wrath of the Kaijus.json" }, { "revision": "71f2f16c0935526ab8ad5f81a1769d87", "url": "homebrew/collection/Mage Hand Press; Dark Matter - 2024.json" }, { "revision": "9af246ba1e433c6b638877f3044da98d", "url": "homebrew/collection/Mage Hand Press; Dark Matter.json" }, { "revision": "a75c9a995ee5f6b8752751e665d8eeeb", "url": "homebrew/collection/Mage Hand Press; Mimic Book of Mimics.json" }, { "revision": "df1fd5f0d4e6e263f545a14d9bbdbc85", "url": "homebrew/collection/Mage Hand Press; Valda Spire of Secrets - 2024.json" }, { "revision": "2823cd0ab4eae218124463f84c1c60a9", "url": "homebrew/collection/Mage Hand Press; Valda's Spire of Secrets - Player Pack.json" }, { "revision": "3acbd9dd49b32390f0d03aa379412d53", "url": "homebrew/collection/Mage Hand Press; Valda's Spire of Secrets.json" }, { "revision": "48c43b9bd5fd207eba426e9e9b1676b8", "url": "homebrew/collection/MCDM Productions; Strongholds and Followers.json" }, { "revision": "6b8bb9dbeeed6d012eb7334b37572dbb", "url": "homebrew/collection/MCDM Productions; Where Evil Lives.json" }, { "revision": "a072973278635de6a5970c002008f082", "url": "homebrew/collection/MonkeyDM; Dark Tides of Bilgewater - Rebalanced.json" }, { "revision": "b7537c72cfa3149fe374a7a2bb0cd1ec", "url": "homebrew/collection/MonkeyDM; Northern Lights Compendium.json" }, { "revision": "3733bb196dea3687318c655150a0234c", "url": "homebrew/collection/MonkeyDM; Steinhardt's Guide to the Eldritch Hunt.json" }, { "revision": "b47ed3b3c9c90e812b955cce6ca0ed12", "url": "homebrew/collection/Nord Games; Game Master's Toolbox Ultimate NPCs Skulduggery.json" }, { "revision": "826ce4aa7229f6d78314454d5e015255", "url": "homebrew/collection/Nord Games; Treacherous Traps.json" }, { "revision": "2a3b9244e7f55914baca04aacac5e48c", "url": "homebrew/collection/Plus Three Press; Crystalpunk Campaign Guide.json" }, { "revision": "35c1c0596e46883b77d2773f35e156cf", "url": "homebrew/collection/QL Games; Tasha's Crucible of Everything Else - Volume 1.json" }, { "revision": "0a505444077e88e5f84b1c83eba898f7", "url": "homebrew/collection/Sterling Vermin Adventuring Co.; The Ultimate Adventurer's Handbook.json" }, { "revision": "6743b01eaf0bdfb67c6dba312a5e9786", "url": "homebrew/creature/Anthony Turco; Korranberg Chronicle's Threat Dispatch.json" }, { "revision": "fff63c23c6883de7ae22ea82de42d47a", "url": "homebrew/creature/Anthony Turco; Nightmare on the Mournland Express.json" }, { "revision": "6dd6152693b597d6798042c62996dea1", "url": "homebrew/creature/badooga; Better Greatwyrms.json" }, { "revision": "b309ef620413222444a0068db93e2df1", "url": "homebrew/creature/Glen Cooper; Monsters of the Guild.json" }, { "revision": "2ae338eae38cb67bab754a27d814073f", "url": "homebrew/creature/Kobold Press; Creature Codex.json" }, { "revision": "339eb000626b16562714201ccd9c0e4f", "url": "homebrew/creature/Kobold Press; Gem Dragons of Faerun.json" }, { "revision": "91cf00e98cd65f5f59d7a0ed94365960", "url": "homebrew/creature/Kobold Press; Tome of Beasts 1 (2023 Edition).json" }, { "revision": "59b3f151c5ba67ef66b6d26a1b09a8ed", "url": "homebrew/creature/Kobold Press; Tome of Beasts 2.json" }, { "revision": "8514d3ef042b9fc1508e9132bcc67e41", "url": "homebrew/creature/Kobold Press; Tome of Beasts 3.json" }, { "revision": "77ccbca3bfe79dac461baeb5ae77764c", "url": "homebrew/creature/Lair of Dragons; 5 High Level Villains.json" }, { "revision": "1f5c4e4bb54ededa6515acced60e3ab9", "url": "homebrew/creature/Lair of Dragons; 5 Low Level Villains.json" }, { "revision": "25eded50ba959911c5e3b08d9200c55d", "url": "homebrew/creature/LaserLlama; Compendium of Beasts.json" }, { "revision": "ea2d53f70b9bc218a426a60d528fc212", "url": "homebrew/creature/MCDM Productions; Flee, Mortals!.json" }, { "revision": "d8ea84c6769d31140a9eeeb985dfe0b3", "url": "homebrew/creature/Mistfactor Press; Darklords & Domains.json" }, { "revision": "c179a3ac9f6edd3c639283783d5b384d", "url": "homebrew/creature/Mythos Chronicles; Mythological Creatures.json" }, { "revision": "0f2379e098794c978dd9fc2d08a27cac", "url": "homebrew/creature/Nicksoliss; The Seven Dragon Overlords.json" }, { "revision": "18fecb366a6a81cdf47e0a38b226fda4", "url": "homebrew/creature/World Builder Blog; Catastrophic Dragons.json" }, { "revision": "037d3367b3eb097197abfbc489c3cca1", "url": "homebrew/deck/WotC; Keys from the Golden Vault - Calling Cards.json" }, { "revision": "6441e6fa162ec0bd3e2674b4b8cd0b87", "url": "homebrew/feat/DnD Beyond; Expanded Racial Feats.json" }, { "revision": "e57f3364c6f574a8fddea5e0f21ccf52", "url": "homebrew/feat/KibblesTasty; Feats for Faiths.json" }, { "revision": "62038ef52a126e28ce115d5331f5e68f", "url": "homebrew/feat/KibblesTasty; Kibbles' Active Martial Feats.json" }, { "revision": "d3850c1b38220e69dd3eef735aa748f8", "url": "homebrew/index.json" }, { "revision": "8a00e585383b898fb9315b8d0bd9dd53", "url": "homebrew/item/ArcanaGames; Visions of the Vault.json" }, { "revision": "1c662ebf57a071dbec5a4812e17fb145", "url": "homebrew/item/ArmedPirate; Hoard of Kryx the Dragon.json" }, { "revision": "37c708388de9f7092bc63552b8c0c4be", "url": "homebrew/item/DMsGuild Community; Artifacts of the Guild.json" }, { "revision": "3080ca12e5139843291e42b16aee3fff", "url": "homebrew/item/griff-mac; The Griffon's Saddlebag.json" }, { "revision": "35e152cb1a584d5abbdf6f44d63143d7", "url": "homebrew/item/Mythos Chronicles; Mythological Items.json" }, { "revision": "28d126569fd67672b92b3b4168298f3a", "url": "homebrew/item/Yonael; Firearms of the Realm.json" }, { "revision": "cc648e022f4b873a002e9677a6f0ec2c", "url": "homebrew/optionalfeature/laserllama; Laserllama's Exploit Compendium.json" }, { "revision": "3e456dd329e42a7e95cce8e72c84528b", "url": "homebrew/package-lock.json" }, { "revision": "852b390ce6ed0938931437dbfb90932a", "url": "homebrew/package.json" }, { "revision": "cff41604bc78b3151757e9d962330416", "url": "homebrew/race/Benjamin Huffman; Beastfolk.json" }, { "revision": "b79d4566ecef3bdd5ac369dcce8032d7", "url": "homebrew/reward/IronRule; Epic Boons.json" }, { "revision": "a389dbb1f61f807187736ad58eeb0340", "url": "homebrew/spell/Jessica Wolfman; The (Not Really) Complete Tome of Spells.json" }, { "revision": "2c457f0d0e9cab57c4bd30fc675bb716", "url": "homebrew/spell/KibblesTasty; Kibbles' Casting Compendium.json" }, { "revision": "dafdf52217c9675739fd14e26351d9b6", "url": "homebrew/spell/KibblesTasty; Kibbles' Generic Elemental Spells.json" }, { "revision": "d5d5c799368693c2b1d74054be1bd6d5", "url": "homebrew/spell/KibblesTasty; Summoning Spells.json" }, { "revision": "f5b4566d9037f1f9d0097061b904bb7c", "url": "homebrew/spell/LaserLlama; LaserLlama's Compendium of Spells.json" }, { "revision": "392afc2bf8a2b66c5e083b516b0b69f7", "url": "homebrew/spell/Matthew Mercer; Widogast's Web of Fire.json" }, { "revision": "46c578a92c6462c0f6ad343e6579a9b9", "url": "homebrew/spell/somanyrobots, Omega Ankh; Spells That Don't Suck.json" }, { "revision": "99274a297b983b7d8ea37bd98e6b8643", "url": "homebrew/spell/somanyrobots; So Many Spells.json" }, { "revision": "5c09fa19b447f92475bffe80fd6b1eda", "url": "homebrew/spell/SwEcky; Spells by SwEcky.json" }, { "revision": "a8f6f65ba9104b77a164a5127772eec2", "url": "homebrew/subclass/Ghostfire Gaming; Artificer Subclasses.json" }, { "revision": "290521715e75928425524fea5f73149f", "url": "homebrew/subclass/KibblesTasty; Divine Agent.json" }, { "revision": "5270766a495ebe31e057dd7f3af9925f", "url": "homebrew/subclass/KibblesTasty; Path of the Bladestorm.json" }, { "revision": "dff93a41a33fc46b0cc117e94d36915c", "url": "homebrew/subclass/Kingstarman; Way of the Cherry Blossom Sage.json" }, { "revision": "ac6eceb9ffc44d4979c7d9e03e24a92f", "url": "homebrew/subclass/LaserLlama; Alternate Barbarian Path of the Blood Knight.json" }, { "revision": "47d8392ec8dcd89df9d4092ccee7fa92", "url": "homebrew/subclass/Laserllama; Artificer Specialties & Infusion Options.json" }, { "revision": "a09d583d2fe53d2734d97445aa64bde2", "url": "homebrew/subclass/LaserLlama; Bard Colleges.json" }, { "revision": "a73d707f91c695af83037a310855f963", "url": "homebrew/subclass/LaserLlama; Druid Circles.json" }, { "revision": "f6918e84cb043a32e69543404a3ad85a", "url": "homebrew/subclass/LaserLlama; Fighter Archetypes & Fighting Styles.json" }, { "revision": "61095ae008eda39ff0431f0cb8236087", "url": "homebrew/subclass/LaserLlama; Monastic Traditions.json" }, { "revision": "164f5a852cf73a3c1c96c3e2fa7ea047", "url": "homebrew/subclass/LaserLlama; Otherwordly Patrons.json" }, { "revision": "ada30a1618cf41b2d8926fdf4791e35e", "url": "homebrew/subclass/LaserLlama; Paladin Sacred Oaths.json" }, { "revision": "e97ef9ec01235752d2e7e757dc9d7792", "url": "homebrew/subclass/LaserLlama; Primal Paths.json" }, { "revision": "65f32648de5c2d80a0886bb265321011", "url": "homebrew/subclass/Laserllama; Roguish Archetypes.json" }, { "revision": "e39b871637dd09799e02fdd279b00bef", "url": "homebrew/subclass/Loot Tavern Publishing; Spirit Caller.json" }, { "revision": "e786ccfae667244b096e7196bcf2834c", "url": "homebrew/subclass/Mage Hand Press; Gunslinger Extras.json" }, { "revision": "fe1c5f87581244dcdbd09cd7a0a3196d", "url": "homebrew/subclass/Mage Hand Press; The Toon Warlock Patron.json" }, { "revision": "abbf7989b04c8bf37fd2526a626ca60f", "url": "homebrew/subclass/Matthew Mercer; College of the Maestro.json" }, { "revision": "63da045275bf1e59578365d220581c4a", "url": "homebrew/subclass/Matthew Mercer; Oath of the Open Sea.json" }, { "revision": "f3c7435a2d90705e2f563df427c7795f", "url": "homebrew/subclass/Matthew Mercer; Way of the Cobalt Soul.json" }, { "revision": "f443cab3ad2ed77e840190777af7aff1", "url": "homebrew/subclass/MonkeyDM; Artificer Mortis Engineer.json" }, { "revision": "4ce68cd262feb929a75e3c54e0ce6423", "url": "homebrew/subclass/MonkeyDM; Oath of the Eldritch Hunt.json" }, { "revision": "23a02c9bdf4f23eb5355d33766c8deac", "url": "homebrew/subclass/MonkeyDM; Pact of the trigger.json" }, { "revision": "b1b24b8b04f3365b40a57275210641b0", "url": "homebrew/subclass/somanyrobots; Rimeblade.json" }, { "revision": "127c53ab7b6a6da85aa81acfa7e3db6a", "url": "homebrew/subclass/somanyrobots; The Agitator.json" }, { "revision": "21a779949eaacfc8c3e562a86915fb5d", "url": "homebrew/subclass/somanyrobots; The Firestarter.json" }, { "revision": "7156e7ce07a040072056e349d3bd05e4", "url": "homebrew/subclass/somanyrobots; Way of Predation.json" }, { "revision": "fad7a7ff8997d3f9aeee9e77653a9a99", "url": "homebrew/table/Raging Swan; Tables.json" }, { "revision": "a3346d217d2c3a04dd37bfe09635294f", "url": "homebrew/trap/James Introcaso; 20 New Traps.json" }, { "revision": "6b97299fb65491a52388e44d3cbc5cbe", "url": "homebrew/variantrule/blainesilver; (More Predictible) Wish Spells.json" }, { "revision": "52ea59258bb7ab3eaf7044a33a3b2726", "url": "homebrew/variantrule/Dael Kingsmill; Thieves' Cant.json" }, { "revision": "8899a4342bb8673ac1dc693e82e17435", "url": "homebrew/variantrule/Matthew Mercer; Corruption Rules.json" }, { "revision": "a6d06facca1e2bcca29fc8ae981be20b", "url": "prerelease/index.json" }, { "revision": "6ae3d3a3fecb9dcbb41f363489c8090f", "url": "data/actions.json" }, { "revision": "af118aa2355b1a1d6f17a15f2c0cf900", "url": "data/adventures.json" }, { "revision": "6cdad5c63afcbf324c0e2d61a479ef2e", "url": "data/backgrounds.json" }, { "revision": "e04ba478018e08d95f84f0082d8d8bf9", "url": "data/bastions.json" }, { "revision": "83560be553b9e8ee0dc61778be9c5f71", "url": "data/books.json" }, { "revision": "4f4c8fc5bf6cb60b946a6be1a8b4d075", "url": "data/changelog.json" }, { "revision": "e1f7f6e1423ada93acc8ae3ce0474fe2", "url": "data/charcreationoptions.json" }, { "revision": "4658fe3a5bb37c38c2f65bd339bec750", "url": "data/conditionsdiseases.json" }, { "revision": "130050a67490537808992e672de66ee8", "url": "data/converter.json" }, { "revision": "d0b2293c6bede6452af095bf1564d76e", "url": "data/cultsboons.json" }, { "revision": "d1410c766e19626df29343d60d8adb5b", "url": "data/decks.json" }, { "revision": "04e88010ae75dcd166efefa05d03e030", "url": "data/deities.json" }, { "revision": "e331a9f480ae122a455b4e19b58bd1bb", "url": "data/encounters.json" }, { "revision": "5ef63794da57ffb3b37778deb37da9e3", "url": "data/feats.json" }, { "revision": "16a7a51d265f184a5f5bff70c7647122", "url": "data/fluff-backgrounds.json" }, { "revision": "8978231d95a1724ef4bdb684724715c1", "url": "data/fluff-bastions.json" }, { "revision": "ca4fff6d5f4436653da2b61cbb80d97e", "url": "data/fluff-charcreationoptions.json" }, { "revision": "c828e873d1de95a1a6c92803137a8a33", "url": "data/fluff-conditionsdiseases.json" }, { "revision": "72d6221dfe6df1c397fafad1a1078f95", "url": "data/fluff-feats.json" }, { "revision": "a383f493a5a0bdab398eaf6be0ce5c7b", "url": "data/fluff-items.json" }, { "revision": "714e02425afe9b21de5fcc80409aa711", "url": "data/fluff-languages.json" }, { "revision": "7f1f9f358789e398c0b8f7e3f618ce93", "url": "data/fluff-objects.json" }, { "revision": "3a115ca5ed78cd455ebbeb952044aa4e", "url": "data/fluff-optionalfeatures.json" }, { "revision": "a8343610be32437155a828dd60a91fe2", "url": "data/fluff-races.json" }, { "revision": "503aa2b979826aa5940cab7ecdf10da9", "url": "data/fluff-recipes.json" }, { "revision": "31e7625b2f0721d21cb56cd3af554e7c", "url": "data/fluff-rewards.json" }, { "revision": "e9568c6c725ac7b97b3fc9e697ddb27c", "url": "data/fluff-trapshazards.json" }, { "revision": "a2a0c6c61ca8888dea0178fe5c9510cc", "url": "data/fluff-vehicles.json" }, { "revision": "5fdc5a90c7911eb4955aa5b20afe837b", "url": "data/foundry-actions.json" }, { "revision": "a4109aff7ca138b5ad16110b468d8fc1", "url": "data/foundry-feats.json" }, { "revision": "7aa6ec21ae06927675c817cff407ee73", "url": "data/foundry-items.json" }, { "revision": "840cd227cf9cf735a78051d8517cc23b", "url": "data/foundry-optionalfeatures.json" }, { "revision": "8a80554c91d9fca8acb82f023de02f11", "url": "data/foundry-psionics.json" }, { "revision": "99815ec5214560d49d0d2c5efcb6b6a9", "url": "data/foundry-races.json" }, { "revision": "2aa465c9f9ec590eea8e14883fbb9146", "url": "data/foundry-rewards.json" }, { "revision": "dfea7fac9af47585a02473619b40abcb", "url": "data/foundry-vehicles.json" }, { "revision": "ffce1ede3dc5afefcfcb41747c50db96", "url": "data/items-base.json" }, { "revision": "2f01ed56696c638ed4446447e70b8c91", "url": "data/items.json" }, { "revision": "d3bf12e81fa7e4244b5d4510bc9c314e", "url": "data/languages.json" }, { "revision": "19add9cbfb283c21cab327b6763a77c2", "url": "data/life.json" }, { "revision": "c298737163e3a174190c87d5e63cc393", "url": "data/loot.json" }, { "revision": "65325d1c95713a7b3d0445f4c7c1ebc7", "url": "data/magicvariants.json" }, { "revision": "fb0d0a46a5fe5b752d3930b463fe2846", "url": "data/makebrew-creature.json" }, { "revision": "2f3bd6fe4f0114588da196fe9cb622f0", "url": "data/makecards.json" }, { "revision": "c42b246aebc587da40cca457bf93f3a6", "url": "data/monsterfeatures.json" }, { "revision": "750cc818e42489a2346b8de5e13fcd20", "url": "data/msbcr.json" }, { "revision": "6cb399918f5736a27243cdc49a029cf7", "url": "data/names.json" }, { "revision": "09792136f2709c1092c8df47cd18a88d", "url": "data/objects.json" }, { "revision": "d8056c7c7eaa6c4f7784ae8343c9037f", "url": "data/optionalfeatures.json" }, { "revision": "a1eab3dcb187aeff494d19f3fa5e7b64", "url": "data/psionics.json" }, { "revision": "efbd5c82f65ecdbf56fb3f2785c6db8b", "url": "data/races.json" }, { "revision": "623318e7b50fe83a02a2372403e087be", "url": "data/recipes.json" }, { "revision": "cb1ce37f66f85887a72ff4ffdda28e1e", "url": "data/renderdemo.json" }, { "revision": "5d353a6d203870fdc9e8e2b01f3385f1", "url": "data/rewards.json" }, { "revision": "785e457c528806fb905ecfd70765bdc9", "url": "data/senses.json" }, { "revision": "7d5ed268e1098f0dc64006977748b4f9", "url": "data/skills.json" }, { "revision": "fad7252027b6e45ae981f9d5fa22addd", "url": "data/tables.json" }, { "revision": "39eacc0da8a864ba1cfe017ae863ac3e", "url": "data/trapshazards.json" }, { "revision": "cc8ae498fb5a2c2d3e04656c583ac443", "url": "data/variantrules.json" }, { "revision": "dd7f582f4b0441186533d1c484e5de8e", "url": "data/vehicles.json" }, { "revision": "2e0120dae4c35d0bb627211f4d9163b6", "url": "data/bestiary/bestiary-abh.json" }, { "revision": "3d19d9e337224c4b6415db42d2062bed", "url": "data/bestiary/bestiary-bam.json" }, { "revision": "f8ef334d42b92010cb6a84038a02b1d9", "url": "data/bestiary/bestiary-bgdia.json" }, { "revision": "64352c9afc072db59abd9eb2f36488fb", "url": "data/bestiary/bestiary-bgg.json" }, { "revision": "51f7c461df02125650b1a7462d8bc668", "url": "data/bestiary/bestiary-bmt.json" }, { "revision": "0d43d7aeeedead1bb26636cfa0137400", "url": "data/bestiary/bestiary-cm.json" }, { "revision": "f06c414d4a50abeb19088efdb708ad1f", "url": "data/bestiary/bestiary-coa.json" }, { "revision": "c11d6605a87636c57c0f3a46234de510", "url": "data/bestiary/bestiary-cos.json" }, { "revision": "52a7e1b9e07f3a4a87460d5650e04288", "url": "data/bestiary/bestiary-crcotn.json" }, { "revision": "088988f29079a879124f619bda2df2a9", "url": "data/bestiary/bestiary-dip.json" }, { "revision": "c64945b17fe53a50c557cacf73f596c0", "url": "data/bestiary/bestiary-ditlcot.json" }, { "revision": "5cf87b3e0db9e6af7414268e8c13716c", "url": "data/bestiary/bestiary-dmg.json" }, { "revision": "e1ef79be3564034b6bbea1d03a2afdb0", "url": "data/bestiary/bestiary-dod.json" }, { "revision": "703f624a383a0dc6c872f749f6e26259", "url": "data/bestiary/bestiary-dosi.json" }, { "revision": "0c1460b0fbd237c37a6ceb8a776b5023", "url": "data/bestiary/bestiary-dsotdq.json" }, { "revision": "42760e1a8e9c7f99a2e97747f2a4a31c", "url": "data/bestiary/bestiary-egw.json" }, { "revision": "49f854e19a1f20edf6975e45b7d2d9c8", "url": "data/bestiary/bestiary-erlw.json" }, { "revision": "723e9d98c6850c525e438a7c782feccc", "url": "data/bestiary/bestiary-fraif.json" }, { "revision": "924056048182da1f7407370fc73bc73c", "url": "data/bestiary/bestiary-ftd.json" }, { "revision": "3405400d204babe194b4b36316435ed2", "url": "data/bestiary/bestiary-ggr.json" }, { "revision": "b4f11311d18c8e2116e6db8aaae92512", "url": "data/bestiary/bestiary-gos.json" }, { "revision": "fb1b73267b7f7a7e96f6fd1f770f85c4", "url": "data/bestiary/bestiary-gotsf.json" }, { "revision": "4bbe98d7eb7f79d833db2d00011faf54", "url": "data/bestiary/bestiary-hftt.json" }, { "revision": "c9806347ce2374071af620b5e19cb735", "url": "data/bestiary/bestiary-hotb.json" }, { "revision": "8f421ff9f9667850eb9918e2f79cc3d9", "url": "data/bestiary/bestiary-hotdq.json" }, { "revision": "1b2e2348ce5d77dbe1161ead7688f572", "url": "data/bestiary/bestiary-idrotf.json" }, { "revision": "b841b2d45383c314205bb6a6391a8342", "url": "data/bestiary/bestiary-imr.json" }, { "revision": "569ac34705a1d508cc0b65f9b8ec4345", "url": "data/bestiary/bestiary-jttrc.json" }, { "revision": "4bc25eb4de03bbcae1c43e3c1219d738", "url": "data/bestiary/bestiary-kftgv.json" }, { "revision": "ad0bc878b0a52f433a479e468f5f58c2", "url": "data/bestiary/bestiary-kkw.json" }, { "revision": "8fe7639bd5b97d6f63a0929189b63d19", "url": "data/bestiary/bestiary-llk.json" }, { "revision": "43d6cc877f0e97b2d20fe9b4a4595dea", "url": "data/bestiary/bestiary-mcv2dc.json" }, { "revision": "fceb66d76c01ba3e5cc1ad0e9a0b41a7", "url": "data/bestiary/bestiary-mcv4ec.json" }, { "revision": "11f801a4095f909940d0a3c440ae8e01", "url": "data/bestiary/bestiary-mm.json" }, { "revision": "7bce3024856b7ffdb541294b4a294097", "url": "data/bestiary/bestiary-mot.json" }, { "revision": "42b2e57c56f5f556ddd696c9c7244c14", "url": "data/bestiary/bestiary-mpmm.json" }, { "revision": "7317ea142caa818d05a92f7bef2567b7", "url": "data/bestiary/bestiary-oota.json" }, { "revision": "f945c4e6c7ae7f00b223adaf4b427636", "url": "data/bestiary/bestiary-pabtso.json" }, { "revision": "cd2cbbf418f063fbe5d8604418d296b6", "url": "data/bestiary/bestiary-phb.json" }, { "revision": "c9059b8a27c685e595fe47781e12cadb", "url": "data/bestiary/bestiary-pota.json" }, { "revision": "cbfc2346b1e37e187519f4536e49a2e8", "url": "data/bestiary/bestiary-qftis.json" }, { "revision": "e9be94b3bd8b06dfeb108908999c2e2c", "url": "data/bestiary/bestiary-rot.json" }, { "revision": "8902571da31e2a6bd63e5f19ab2e1ad6", "url": "data/bestiary/bestiary-scc.json" }, { "revision": "94ed1095b681380bbbeb83b1527b37de", "url": "data/bestiary/bestiary-sdw.json" }, { "revision": "465be9496b1771c58762d8d285ced58d", "url": "data/bestiary/bestiary-skt.json" }, { "revision": "e99948e5932132bc0834f9b1a775417e", "url": "data/bestiary/bestiary-slw.json" }, { "revision": "eb4baeb1eecaaf3ce4db0b2ac6fea0d2", "url": "data/bestiary/bestiary-tce.json" }, { "revision": "f5d1c5cecd4733a1ea14dcc3257aacb5", "url": "data/bestiary/bestiary-tdcsr.json" }, { "revision": "055627476889fc1c13638bf4b2988ccf", "url": "data/bestiary/bestiary-tftyp.json" }, { "revision": "67bc1607d102527582eda8d8d9a99a68", "url": "data/bestiary/bestiary-toa.json" }, { "revision": "7eda1e2ff02a8f0c4b25c4d0b69659f1", "url": "data/bestiary/bestiary-ttp.json" }, { "revision": "b0ea6467b319c68b0de89ede924937fb", "url": "data/bestiary/bestiary-vd.json" }, { "revision": "84f219deb6410a22ea1b0ea7495953e7", "url": "data/bestiary/bestiary-veor.json" }, { "revision": "95d3bedf12091f11621e788748fb1d00", "url": "data/bestiary/bestiary-vrgr.json" }, { "revision": "bfbce523c224f2a40ea41341a7deb93c", "url": "data/bestiary/bestiary-wbtw.json" }, { "revision": "ff8df6bc8a000c101ac46c03bf8af311", "url": "data/bestiary/bestiary-wdh.json" }, { "revision": "89db01a3880d88098019778d3ece84e0", "url": "data/bestiary/bestiary-xdmg.json" }, { "revision": "7b49ddda01cdf75adfac71fa0f1b14eb", "url": "data/bestiary/bestiary-xge.json" }, { "revision": "3e2ffc69de7543b44c188c54fd307463", "url": "data/bestiary/bestiary-xmm.json" }, { "revision": "f92009e001f5726c9764ee357ad5bc89", "url": "data/bestiary/bestiary-xphb.json" }, { "revision": "739c705c71511fa64e2673b0d5c89e0f", "url": "data/bestiary/fluff-bestiary-abh.json" }, { "revision": "2a8b9ed5e6c74493f71d582e8fc2abd4", "url": "data/bestiary/fluff-bestiary-bam.json" }, { "revision": "4d8b0be14feddd3081589c3f13f263fd", "url": "data/bestiary/fluff-bestiary-bgdia.json" }, { "revision": "cb233726e51a03b47a973798c435c5f0", "url": "data/bestiary/fluff-bestiary-bgg.json" }, { "revision": "1e34b9c97384be8edd9fd0154ce3158b", "url": "data/bestiary/fluff-bestiary-bmt.json" }, { "revision": "04ee4e7a3c69b64a14762e74a0d8d088", "url": "data/bestiary/fluff-bestiary-cm.json" }, { "revision": "677cdec5da5b2e4d4f772dbe631e03c9", "url": "data/bestiary/fluff-bestiary-coa.json" }, { "revision": "b3313666f8c8c61a97d901ba2658d821", "url": "data/bestiary/fluff-bestiary-cos.json" }, { "revision": "81f9eba49e38907bbc6ded8f2718517f", "url": "data/bestiary/fluff-bestiary-crcotn.json" }, { "revision": "7114be29e382687872ef65ff361dbe27", "url": "data/bestiary/fluff-bestiary-dip.json" }, { "revision": "ce42d9647fc1e956f822a0b30142f74c", "url": "data/bestiary/fluff-bestiary-ditlcot.json" }, { "revision": "9aebe36d43b81388388df2a284273028", "url": "data/bestiary/fluff-bestiary-dmg.json" }, { "revision": "caf2ddd81b30544662b6e3c981e5ea56", "url": "data/bestiary/fluff-bestiary-dod.json" }, { "revision": "981a0277b96df21527f297cf8cae18e5", "url": "data/bestiary/fluff-bestiary-dosi.json" }, { "revision": "77d6c5cbad8f7b52b1c900eca9dcd3e7", "url": "data/bestiary/fluff-bestiary-dsotdq.json" }, { "revision": "a66687ef3172b9b143281f55f04948bc", "url": "data/bestiary/fluff-bestiary-egw.json" }, { "revision": "17ae0a832993ee30c7fdfb3f9c96a53d", "url": "data/bestiary/fluff-bestiary-erlw.json" }, { "revision": "e8458db10d99581afe249cc105c66a24", "url": "data/bestiary/fluff-bestiary-fraif.json" }, { "revision": "82342166fc8ec1e4154b54b5388ef1d0", "url": "data/bestiary/fluff-bestiary-ftd.json" }, { "revision": "cbcc2709a3a5640d2d0d247236f6cc96", "url": "data/bestiary/fluff-bestiary-ggr.json" }, { "revision": "311f5b75b0f55b388f8e938beaa07035", "url": "data/bestiary/fluff-bestiary-gos.json" }, { "revision": "fab6bb3a39cf04aeec4bcbcd9385fa7b", "url": "data/bestiary/fluff-bestiary-hftt.json" }, { "revision": "48248f17ac5056afe4856f643931d0eb", "url": "data/bestiary/fluff-bestiary-hotb.json" }, { "revision": "68531f1744babfc06f8ae4ada54d94d4", "url": "data/bestiary/fluff-bestiary-hotdq.json" }, { "revision": "21c67e520249f95235c871c7464a9d62", "url": "data/bestiary/fluff-bestiary-idrotf.json" }, { "revision": "665fa8f99b28f837408e2cd0db060f10", "url": "data/bestiary/fluff-bestiary-imr.json" }, { "revision": "8e3dbb3f5ad5014971199215c3c22541", "url": "data/bestiary/fluff-bestiary-jttrc.json" }, { "revision": "8057893bf0d54f2930ec04532c2e598f", "url": "data/bestiary/fluff-bestiary-kftgv.json" }, { "revision": "fbdefce7e8b897f605ef6b7dcf79bf24", "url": "data/bestiary/fluff-bestiary-kkw.json" }, { "revision": "835ab44b2a9e95628de4013ff881a009", "url": "data/bestiary/fluff-bestiary-llk.json" }, { "revision": "d0ba3d2d45a1af5159a31fe2d7d2bdd3", "url": "data/bestiary/fluff-bestiary-mcv2dc.json" }, { "revision": "225c47c6f080edf7e6eb67392d2f2ccf", "url": "data/bestiary/fluff-bestiary-mcv4ec.json" }, { "revision": "dd31925c3181b663002b94b6fe439892", "url": "data/bestiary/fluff-bestiary-mm.json" }, { "revision": "14496b6766563170c3d5c88ce152c495", "url": "data/bestiary/fluff-bestiary-mot.json" }, { "revision": "eccb0a07f1a038cb11538abef2892338", "url": "data/bestiary/fluff-bestiary-mpmm.json" }, { "revision": "8aee0fa8b5936da722f05e231873817c", "url": "data/bestiary/fluff-bestiary-oota.json" }, { "revision": "72f76f482e36d01cd6bbeed441ee711a", "url": "data/bestiary/fluff-bestiary-pabtso.json" }, { "revision": "09c44f8c0758f5139c9c024d3be0bc5d", "url": "data/bestiary/fluff-bestiary-pota.json" }, { "revision": "3a10943ad4e187d1590a578ed1e02dcc", "url": "data/bestiary/fluff-bestiary-qftis.json" }, { "revision": "cf48313a4a26941f2b6214d7e6c38c34", "url": "data/bestiary/fluff-bestiary-rot.json" }, { "revision": "1a82dea0775dd359076c3a6356d5b2f8", "url": "data/bestiary/fluff-bestiary-scc.json" }, { "revision": "67e699edfd5b30cf023286599f08fa74", "url": "data/bestiary/fluff-bestiary-sdw.json" }, { "revision": "cad650a5e84d80fc0cfdb3f997c91834", "url": "data/bestiary/fluff-bestiary-skt.json" }, { "revision": "f1d8e65d6d91057ca63839f55114c2ae", "url": "data/bestiary/fluff-bestiary-tce.json" }, { "revision": "ac5aadfe003cc170948c5cddf21dc271", "url": "data/bestiary/fluff-bestiary-tdcsr.json" }, { "revision": "38ecfecd6fd6c325b1279a245043b847", "url": "data/bestiary/fluff-bestiary-tftyp.json" }, { "revision": "8d3b5f4d7cf6b6e55b88a571bc2220b8", "url": "data/bestiary/fluff-bestiary-toa.json" }, { "revision": "1f804457c2be2052d4d5d42fab6ecf24", "url": "data/bestiary/fluff-bestiary-ttp.json" }, { "revision": "4208d0d764cc948c51f0851608fae8b9", "url": "data/bestiary/fluff-bestiary-vd.json" }, { "revision": "0e4689fe75f31d5d2fd3eccea3605790", "url": "data/bestiary/fluff-bestiary-veor.json" }, { "revision": "040bfaab3599c255e4cd603a733b7126", "url": "data/bestiary/fluff-bestiary-vrgr.json" }, { "revision": "20e32a83a37a1763f732bc0540dc15db", "url": "data/bestiary/fluff-bestiary-wbtw.json" }, { "revision": "713ea5f567a3aa6cc9088efb819cfd0f", "url": "data/bestiary/fluff-bestiary-wdh.json" }, { "revision": "2d175073b6a63eeb55977c95a19f8b96", "url": "data/bestiary/fluff-bestiary-xmm.json" }, { "revision": "77fa58a53c40d4b1ad6bfa91eb2514e1", "url": "data/bestiary/fluff-bestiary-xphb.json" }, { "revision": "e27a58e6e6e8d3033bb81b49e7fc0dc9", "url": "data/bestiary/fluff-index.json" }, { "revision": "e7a4ccefbd83e10058c23d44a92dda53", "url": "data/bestiary/foundry.json" }, { "revision": "87eb8ec26d8cf615f3c03e8e7e3e97d8", "url": "data/bestiary/index.json" }, { "revision": "afffbc3882f05576791756c2e7bb28d6", "url": "data/bestiary/legendarygroups.json" }, { "revision": "88101c42878168a6b7cb5152535cfc2b", "url": "data/bestiary/template.json" }, { "revision": "ea788dd94c8555319e05ebbd6e34ead3", "url": "data/book/book-aag.json" }, { "revision": "b7b4a36134999a0cb11f372c767acc28", "url": "data/book/book-abh.json" }, { "revision": "78ee79189200047a9dd12e59f3965518", "url": "data/book/book-bam.json" }, { "revision": "36afe9b489cc3826fb1b48beecb5fab7", "url": "data/book/book-bgg.json" }, { "revision": "dcb1fc624cf62f934ed3169fb6c5d440", "url": "data/book/book-bmt.json" }, { "revision": "2c0bba50383f83b3c5ffc952142cf6fd", "url": "data/book/book-dmg.json" }, { "revision": "33d36c2c3d11edd263fdc5a1918e5428", "url": "data/book/book-dmtcrg.json" }, { "revision": "121df942342b6112d8338fa8ec412133", "url": "data/book/book-dod.json" }, { "revision": "aea1dcf76b08e61f0c536ef677fc43b9", "url": "data/book/book-egw.json" }, { "revision": "d01284568eb6cabd13f81536e9383365", "url": "data/book/book-erlw.json" }, { "revision": "0a3d09c0dcfe3773daeb2be343334f18", "url": "data/book/book-fraif.json" }, { "revision": "c4653217b25a9bc929815385dcdac5bb", "url": "data/book/book-frhof.json" }, { "revision": "786ff32b8d01a7262ed1753aeb18c2ed", "url": "data/book/book-ftd.json" }, { "revision": "d8acfdc411b0fc5250eee9367cb01599", "url": "data/book/book-ggr.json" }, { "revision": "8952653bd15262f847b96d7572dd8d9b", "url": "data/book/book-hf.json" }, { "revision": "59d64f8b496006984c9a0d011fd6bf3b", "url": "data/book/book-hffotm.json" }, { "revision": "ce4362373e96d6ecc120059a4fe7678c", "url": "data/book/book-mcv4ec.json" }, { "revision": "49d9391c6b814c759773f41006a62cd1", "url": "data/book/book-mm.json" }, { "revision": "e51c9dc54d457c958aca128731aaead8", "url": "data/book/book-mot.json" }, { "revision": "695482b1774d99e0b4178ec78d760f69", "url": "data/book/book-mpmm.json" }, { "revision": "c7e613d9bc023dbe454106160d7e77ed", "url": "data/book/book-nf.json" }, { "revision": "f3c6ef9a0b9dd509a8602451d87fce71", "url": "data/book/book-oga.json" }, { "revision": "bffd28e393e80e7ae83dc8732c87a5f2", "url": "data/book/book-paf.json" }, { "revision": "719f04cbfd44700ba404b49dd6f74f72", "url": "data/book/book-phb.json" }, { "revision": "fd2094b19d4187cbb622544e41eb700e", "url": "data/book/book-sac.json" }, { "revision": "fc03ca1e1813780bda09292bfb4fd5e7", "url": "data/book/book-sato.json" }, { "revision": "3e3badfd00eb766dfdc0d647f6d3c9da", "url": "data/book/book-scag.json" }, { "revision": "ea98826b1ed5503692e12b43772e4789", "url": "data/book/book-scc.json" }, { "revision": "15e95ba667ef7a3046d86fdc50e3753a", "url": "data/book/book-screen.json" }, { "revision": "f6f4e24cca13b65ac5f31c8aa86bbbb2", "url": "data/book/book-tce.json" }, { "revision": "70319e85ca7edb0fec94ef487df6f362", "url": "data/book/book-td.json" }, { "revision": "bfc30aff97049f5c4379cc84fcade62d", "url": "data/book/book-tdcsr.json" }, { "revision": "65873001108d9cc543c109ece936d0cf", "url": "data/book/book-vrgr.json" }, { "revision": "eda848fcefa691bfdf8a4ca14008e798", "url": "data/book/book-xdmg.json" }, { "revision": "0a7f43cf57fd0e3c96aad41baa8d4bb1", "url": "data/book/book-xge.json" }, { "revision": "f615f7b2555c5d456db18ebbc3bb38b8", "url": "data/book/book-xmm.json" }, { "revision": "5eb06062c753b2062cb8ba8fbd29533f", "url": "data/book/book-xphb.json" }, { "revision": "55b411c9d0f70c2265c92cbb00357942", "url": "data/class/class-artificer.json" }, { "revision": "3d2b4429ede209a0dee8b5f885fa79cf", "url": "data/class/class-barbarian.json" }, { "revision": "fc25c41e8fc133eafb48cdffa8789585", "url": "data/class/class-bard.json" }, { "revision": "c162ccf24557517f7b81440b973a4540", "url": "data/class/class-cleric.json" }, { "revision": "7a5bd92bc36528b01de369280f98ede6", "url": "data/class/class-druid.json" }, { "revision": "c05ddf689a3073260db66dfaba4e6ef2", "url": "data/class/class-fighter.json" }, { "revision": "8f1dd5af23094fb3ce280a137ab32558", "url": "data/class/class-monk.json" }, { "revision": "87210cb0b884ce45ca454bc0b371edfa", "url": "data/class/class-paladin.json" }, { "revision": "5fe435f5151a07acafb4ac7cd396610f", "url": "data/class/class-ranger.json" }, { "revision": "a3d7d5ea2029678c1751f504bbc0eea4", "url": "data/class/class-rogue.json" }, { "revision": "c2cb6b3fe59e41d92805be8d7b27ece9", "url": "data/class/class-sorcerer.json" }, { "revision": "7934f2b04781f89e9500a2ee7fc9d5a8", "url": "data/class/class-warlock.json" }, { "revision": "99988edb99a69720294ed72816c7c23b", "url": "data/class/class-wizard.json" }, { "revision": "be3d9455d17bb3fb56e4a994625e4415", "url": "data/class/fluff-class-artificer.json" }, { "revision": "d21178830412ae8836ea8ff0c2d30465", "url": "data/class/fluff-class-barbarian.json" }, { "revision": "8015ae8252a986b01bb10c95d9dee006", "url": "data/class/fluff-class-bard.json" }, { "revision": "849a20208b0809a0a0044afc36474b82", "url": "data/class/fluff-class-cleric.json" }, { "revision": "58e03e54fc64446d2b64b201eaac5c76", "url": "data/class/fluff-class-druid.json" }, { "revision": "60b3ad745fa40572029101f9e389ff14", "url": "data/class/fluff-class-fighter.json" }, { "revision": "4343f0dd97d86e2d5479491e41640ea8", "url": "data/class/fluff-class-monk.json" }, { "revision": "fc038d9f03b4163b65e6719dc3396019", "url": "data/class/fluff-class-paladin.json" }, { "revision": "7b25cbd73dffae2aae4ed9057c55dce4", "url": "data/class/fluff-class-ranger.json" }, { "revision": "593f3831628efcf5453f03d68545f7ae", "url": "data/class/fluff-class-rogue.json" }, { "revision": "f2f0a07f6569de0ae6e7eefd4fed9f75", "url": "data/class/fluff-class-sorcerer.json" }, { "revision": "37c42d473a56dbf788d978636d88c6ad", "url": "data/class/fluff-class-warlock.json" }, { "revision": "6ff273c1fbd2dd63bb6ae486a2a88b1c", "url": "data/class/fluff-class-wizard.json" }, { "revision": "b7a590dffad970444f28e5b24124779f", "url": "data/class/fluff-index.json" }, { "revision": "b5b50c2b04659025f0f034e7582c3c55", "url": "data/class/foundry.json" }, { "revision": "05f808b163e13e9cb2b30a4b88927be5", "url": "data/class/index.json" }, { "revision": "c7ddf22917b3a12b308eab0c926b67c5", "url": "data/generated/bookref-dmscreen-index.json" }, { "revision": "d7707ab75a2d27fca99189577139d314", "url": "data/generated/bookref-dmscreen.json" }, { "revision": "9a98a14260b4d1888d3d935631452dcd", "url": "data/generated/bookref-quick.json" }, { "revision": "ee7b3838f7a30c2f2b2488bd848602b6", "url": "data/generated/gendata-maps.json" }, { "revision": "557825e657a0c9fb2ebc71f292f592a6", "url": "data/generated/gendata-nav-adventure-book-index.json" }, { "revision": "5f12d8673a2d61ecea847fba7a957dd4", "url": "data/generated/gendata-spell-source-lookup.json" }, { "revision": "c962f75bf65a56485fe3086b409e5318", "url": "data/generated/gendata-subclass-lookup.json" }, { "revision": "839c185f65ca42df454b8092edfae73c", "url": "data/generated/gendata-tables.json" }, { "revision": "0027ee418a767b5bf1aea5950ad4c57b", "url": "data/generated/gendata-tag-redirects.json" }, { "revision": "6abe8720ad10ae41cddd4b91cb53af8f", "url": "data/generated/gendata-variantrules.json" }, { "revision": "53abb6bc54db47da87247b08f26f9847", "url": "data/spells/fluff-index.json" }, { "revision": "7a6262777ec331263bb31da56b8661c3", "url": "data/spells/fluff-spells-aag.json" }, { "revision": "214a50ba3e1defe9a48ad3487d76d9d3", "url": "data/spells/fluff-spells-egw.json" }, { "revision": "f3908add562645eb60c499bd3a597c28", "url": "data/spells/fluff-spells-frhof.json" }, { "revision": "2ab79cf61d10af3dd5388a16d578ddb5", "url": "data/spells/fluff-spells-ftd.json" }, { "revision": "c14b3545b006f81273db8b35ca4c07b4", "url": "data/spells/fluff-spells-ggr.json" }, { "revision": "9d1ee9807d48a3a2d6639b345bfaccd3", "url": "data/spells/fluff-spells-phb.json" }, { "revision": "d0ad1532a3d18c2376b0c33fca976e11", "url": "data/spells/fluff-spells-tce.json" }, { "revision": "fb43fa1de386d72730b240e273579bd2", "url": "data/spells/fluff-spells-xge.json" }, { "revision": "c2764e5b194592413f861dfe893b0057", "url": "data/spells/fluff-spells-xphb.json" }, { "revision": "a3f3b83d345d13ac96c2275fc8bc0b30", "url": "data/spells/foundry.json" }, { "revision": "8c89f0336e97cfd150b8080a27125db5", "url": "data/spells/index.json" }, { "revision": "3b2636fa93d454ea6bd97c80976c22e7", "url": "data/spells/sources.json" }, { "revision": "b569535643bfb663eaf950ed5cfc3984", "url": "data/spells/spells-egw.json" }, { "revision": "c6c212538b4e65e31664b47379e7dc42", "url": "data/spells/spells-frhof.json" }, { "revision": "6d5dd254b38e2fe8b8c6e15183f41aa4", "url": "data/spells/spells-ftd.json" }, { "revision": "c4608c1be8d264dd9d026689873e6e33", "url": "data/spells/spells-ggr.json" }, { "revision": "550606f7314222621bc8c8deaba8e154", "url": "data/spells/spells-idrotf.json" }, { "revision": "d171dec9c73e6b88dfcb6ef2da2f2796", "url": "data/spells/spells-llk.json" }, { "revision": "05b847ba4d320251f0397372138ef214", "url": "data/spells/spells-phb.json" }, { "revision": "4911291f06e50bf0bc36e2acb3e1f2c9", "url": "data/spells/spells-scc.json" }, { "revision": "4ca7da670d30f031601921e458735be4", "url": "data/spells/spells-tce.json" }, { "revision": "bf10c7386dca95a44bb03f254fa2d196", "url": "data/spells/spells-tdcsr.json" }, { "revision": "9dd8bd83493fea6f6e591d6e5742bc10", "url": "data/spells/spells-xge.json" }, { "revision": "4aed919764ca7454ac0f03d3dcae13c8", "url": "data/spells/spells-xphb.json" }, { "revision": "dbb89c692b526360842fe74a5f2e8da1", "url": "5etools.html" }, { "revision": "6fd6d72ad49ceeeae45f54e758a14694", "url": "actions.html" }, { "revision": "8d53b95d1a55397f3c62df85ed072150", "url": "adventure.html" }, { "revision": "5ee52027a08d06f041237f251dac5fb8", "url": "adventures.html" }, { "revision": "66fe266c5cea702891e0bda03b218c52", "url": "backgrounds.html" }, { "revision": "0f947951093580e55287c90c6c435d06", "url": "bastions.html" }, { "revision": "58dc352beaccb567068be97eb76580c1", "url": "bestiary.html" }, { "revision": "5ad1abb631c60c50defe0beaa9bd6184", "url": "blocklist.html" }, { "revision": "3b1e3aae082f1e2b716ce06c893f7ea7", "url": "book.html" }, { "revision": "98068133c75f153a17c7cfc104487f93", "url": "books.html" }, { "revision": "854bbd31c30be1d54b504822819da95b", "url": "changelog.html" }, { "revision": "74127ea0065aabb6d652a8e0bf02e596", "url": "charcreationoptions.html" }, { "revision": "64725e9bea5fc0663079d4ac04f8db4a", "url": "classes.html" }, { "revision": "73711a96e85640d67fec5e44c668591c", "url": "conditionsdiseases.html" }, { "revision": "d2c1589ae85af1a9b8948c8325524c31", "url": "converter.html" }, { "revision": "893006cd188c2005eb38ce4dd0d79b06", "url": "crcalculator.html" }, { "revision": "f52dec55c6bf6ed652731ceb7c8513a2", "url": "cultsboons.html" }, { "revision": "60c541dad20e228d08d1c657b275672f", "url": "decks.html" }, { "revision": "1cbe62a33b6d803181164cb8495c53a6", "url": "deities.html" }, { "revision": "012617d80c7539483104da042460ec4c", "url": "dmscreen.html" }, { "revision": "2f4026bf9f7bb9052d4626d4603711e9", "url": "encountergen.html" }, { "revision": "b09d0d5c1cd4beeac9b4d12c22a919cb", "url": "feats.html" }, { "revision": "c9d0b3ceab0c6a02bbd342bae84dc43a", "url": "index.html" }, { "revision": "5de610e9082e8fc09ceca4a131f952e9", "url": "inittrackerplayerview.html" }, { "revision": "c564d706d4290f8f260df92f1df162a6", "url": "items.html" }, { "revision": "ab458b1ec21064650e58907052f006a9", "url": "langdemo.html" }, { "revision": "ef0bcc8e4864938439fb7517e619050a", "url": "languages.html" }, { "revision": "dd9d1675771191be6bce04beb16c0e09", "url": "lifegen.html" }, { "revision": "01e299b664e6e4fe8e157cf6033ad5e0", "url": "lootgen.html" }, { "revision": "b627a2a09071bedd17857f6829b88bdf", "url": "makebrew.html" }, { "revision": "25af7c60aa81d38253b3b3ce041e1b1e", "url": "makecards.html" }, { "revision": "cdb03bce383ced1d6f86ef16541b8e2f", "url": "managebrew.html" }, { "revision": "41ca900c24982a16178513b818a00984", "url": "manageprerelease.html" }, { "revision": "cd228d5b15e557f8b4f4e1bad8162446", "url": "maps.html" }, { "revision": "fcc6d1f62fb7c9cde84b2e8adb0c5ece", "url": "names.html" }, { "revision": "67c688c2478110ac7c1ec78d179b3298", "url": "objects.html" }, { "revision": "7d7c6cf2ee71b72c1881909a3f336a79", "url": "optionalfeatures.html" }, { "revision": "25fe7319357d2abe35f2a949dc8f8305", "url": "plutonium.html" }, { "revision": "74d782fee4b363e32a0c6f75b8df4c3f", "url": "privacy-policy.html" }, { "revision": "79865ddff39b9d2c9ff1ccb813c340e4", "url": "psionics.html" }, { "revision": "f6ebce0e37ec2356969feef0f5977093", "url": "quickreference.html" }, { "revision": "d30760911e001e7ea3a042217e64283e", "url": "races.html" }, { "revision": "eb29487d06eba29f5a3096d9a70e27b6", "url": "recipes.html" }, { "revision": "959d7cc70a1e9b0f0f85d0b198af8624", "url": "renderdemo.html" }, { "revision": "4718515cc6fce5e55fbf54690ac2bd59", "url": "rewards.html" }, { "revision": "0cd268ba69f6b3fc44dc2c72d3a0ab53", "url": "search.html" }, { "revision": "16e233d26ad8a260e3f64688bb601955", "url": "spells.html" }, { "revision": "f9877d8c2d9bda6b7a83178f79420164", "url": "statgen.html" }, { "revision": "ff2abc8e1337da43821b392dd0722dfb", "url": "tables.html" }, { "revision": "6635c604a07b5c14018b8c79d8b1da08", "url": "trapshazards.html" }, { "revision": "c463c33b194420c52744aca474bc39dc", "url": "variantrules.html" }, { "revision": "eaf5100b983efcd64998c928fe4698dd", "url": "vehicles.html" }, { "revision": "18b30b6b8592dc62d426631c8a740e1d", "url": "search/index-alt-spell.json" }, { "revision": "8201928204381494e8b19690fbdf90d2", "url": "search/index-foundry.json" }, { "revision": "77dedc1b4303b5ca29dbe0b4f18e66be", "url": "search/index-item.json" }, { "revision": "494c9f8c175f71b1d993a61bbb47141a", "url": "search/index-partnered.json" }, { "revision": "5bba657e3454d150ef18aaf50fb119e9", "url": "search/index.json" }, { "revision": "b33a9abf59ddae83c0ea3b224270a7d7", "url": "manifest.webmanifest" }, { "revision": "448c34a56d699c29117adc64c43affeb", "url": "fonts/glyphicons-halflings-regular.woff2" }, { "revision": "04c967f6f0b6a812ad0c9f4bc1470a42", "url": "fonts/Convergence-Regular.woff2" }, { "revision": "ffbdd7a184919c88217433df12ed9bf4", "url": "fonts/Roboto-Regular.woff2" }, { "revision": "ffabcfca755b1be5637ac0fa3fc60317", "url": "sw-injector.js" }]);
  var RevisionCacheFirst = class extends Strategy {
    // explicitly set `credentials` option as a workaround to enable basic auth in third-party installs
    // See: 5ET-BUG-115
    static _FETCH_OPTIONS_VET = { credentials: "same-origin" };
    cacheRoutesAbortController = null;
    constructor() {
      super({ cacheName: "runtime-revision" });
      this.activate = this.activate.bind(this);
      this.cacheRoutes = this.cacheRoutes.bind(this);
      addEventListener("message", (event) => {
        switch (event.data.type) {
          case "CACHE_ROUTES": {
            this.cacheRoutesAbortController = new AbortController();
            event.waitUntil(this.cacheRoutes(event.data, this.cacheRoutesAbortController.signal));
            break;
          }
          case "CANCEL_CACHE_ROUTES": {
            console.log("Aborting cache!");
            this.cacheRoutesAbortController?.abort();
            this.cacheRoutesAbortController = null;
            break;
          }
        }
      });
    }
    /**
      * @param {Request} request
      * @param {StrategyHandler} handler
      * @returns {Promise<Response | undefined>}
      */
    async _handle(request, handler) {
      const url = request.url;
      const cacheKey = createCacheKey({ url, revision: runtimeManifest.get(url) }).cacheKey;
      console.log(`Trying to resolve URL "${url}" with key "${cacheKey}"`);
      const cacheResponse = await handler.cacheMatch(cacheKey);
      if (cacheResponse !== void 0)
        return cacheResponse;
      console.log(`Fetching URL "${url}" over the network for RevisionFirstCache`);
      try {
        const fetchResponse = await handler.fetch(request, this.constructor._FETCH_OPTIONS_VET);
        handler.cachePut(cacheKey, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        offlineAlert(url);
        return new Response();
      }
    }
    /**
     * the cache busting portion of the Strategy.
     * Iterate the cache, and remove anything that is not in the manifest, or from a different revision.
     *
     * call this from the activate event
     *
     * @param {ExtendableEvent} event
     * @returns {Promise}
     */
    activate(event) {
      return waitUntil2(event, async () => {
        const cache = await caches.open(this.cacheName);
        const currentCacheKeys = (await cache.keys()).map((request) => request.url);
        const validCacheKeys = new Set(Array.from(runtimeManifest).map(([url, revision]) => createCacheKey({ url, revision }).cacheKey));
        await Promise.allSettled(
          currentCacheKeys.map(async (key) => {
            if (!validCacheKeys.has(key)) {
              console.log(`Deleting key "${key}" from the cache because its revision does not match`);
              await cache.delete(key);
            }
          })
        );
      });
    }
    /**
     * Preload runtime cache routes. This method is called based on a message from the "frontend".
     * The method is passed a regex which all possible files are matched against.
     * Files which match and have not already been loaded will be attempted to be fetched.
     *
     * File fetching is done with a pool strategy, where async function closures pop urls off an array.
     * If a fetch throws an error, it will not be retried, and it will kill the worker.
     * This intentionally reduces the number of concurrent requests.
     * If a system or server is struggling under the load, it could cause fetches to fail,
     * in a manner that is opaque to this code.
     *
     * When all the original workers have died or finished, any failures will be reported.
     *
     * @param {{payload: {routeRegex: RegExp}}} data the data sent with the request
     * @param {AbortSignal} signal signal to abort the operation
     */
    async cacheRoutes(data, signal) {
      const cache = await caches.open(this.cacheName);
      let currentCacheKeys;
      let isTooManyKeys = false;
      try {
        currentCacheKeys = new Set((await cache.keys()).map((request) => request.url));
      } catch (e) {
        isTooManyKeys = true;
        console.error("Failed to load cache keys due to error; falling back on per-request check...", e);
      }
      const validCacheKeys = Array.from(runtimeManifest).map(([url, revision]) => createCacheKey({ url, revision }).cacheKey);
      console.log(`Found ${validCacheKeys.length} valid cache keys`);
      const routeRegex = data.payload.routeRegex;
      const routesToCache = validCacheKeys.filter((key) => (isTooManyKeys || !currentCacheKeys.has(key)) && routeRegex.test(key));
      console.log(`Found ${routesToCache.length} routes to cache`);
      const fetchTotal = routesToCache.length;
      let fetched = 0;
      const postProgress = async ({ frozenFetched }) => {
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients) {
          client.postMessage({ type: "CACHE_ROUTES_PROGRESS", payload: { fetched: frozenFetched, fetchTotal } });
        }
      };
      await postProgress({ frozenFetched: fetched });
      if (fetchTotal === 0)
        return;
      const concurrentFetches = 15;
      const fetchPromise = async () => {
        while (true) {
          const url = routesToCache.pop();
          if (url === void 0 || signal.aborted)
            return;
          const cleanUrl = url.replace(/\?__WB_REVISION__=\w+$/m, "");
          const keysForUrl = isTooManyKeys ? await cache.keys(url) : null;
          if (isTooManyKeys && keysForUrl.length) {
            console.log(`Skipping ${cleanUrl} (too many keys and already in cache)`);
            fetched++;
            postProgress({ frozenFetched: fetched });
            continue;
          }
          const response = await fetch(cleanUrl, this.constructor._FETCH_OPTIONS_VET);
          await cache.put(url, response);
          fetched++;
          postProgress({ frozenFetched: fetched });
        }
      };
      const fetchPromises = [];
      for (let i = 0; i < concurrentFetches; i++) {
        fetchPromises.push(fetchPromise());
      }
      const fetchResults = await Promise.allSettled(fetchPromises);
      const errorResults = fetchResults.filter((fetchResult) => fetchResult.status === "rejected");
      if (errorResults.length > 0) {
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients)
          client.postMessage({ type: "CACHE_ROUTES_ERROR", payload: { errors: errorResults } });
      }
    }
  };
  var runtimeManifest = new Map([["data/adventure/adventure-bgdia.json", "98d3f6a8be9adff8fc7ee791a22410e2"], ["data/adventure/adventure-cm.json", "7dedb63035e80819a996f08ff8c3f31f"], ["data/adventure/adventure-coa.json", "77b7b23731560dd58b41c9dfa309550a"], ["data/adventure/adventure-cos.json", "32a77e9c1d44dc26cddb819de7f5af3d"], ["data/adventure/adventure-crcotn.json", "20f02608cb58feeca7bad5f361614368"], ["data/adventure/adventure-dip.json", "8edb1f2307966ffdadf65126a3b93911"], ["data/adventure/adventure-ditlcot.json", "46a6f6d0fdd4e1cbce88ffa04062986b"], ["data/adventure/adventure-dosi.json", "7bfbbb3d4f7dddcee2ce58e297732afe"], ["data/adventure/adventure-dsotdq.json", "b65e77ef59c5c2dcde323bc970918709"], ["data/adventure/adventure-efr.json", "051c3388759d992b67c51b420308e029"], ["data/adventure/adventure-fraif-tllol.json", "86426fca0ab62349beba1b6004c64c51"], ["data/adventure/adventure-fs.json", "869fdda693b4b8cd9042309b1025079f"], ["data/adventure/adventure-gos.json", "fc52f0145c31640cf1493f04c36c1eab"], ["data/adventure/adventure-gotsf.json", "ccd5ff0a9a793e93340e73359c01c95d"], ["data/adventure/adventure-hbtd.json", "10b890e58ce1b93733ea8e55354ff541"], ["data/adventure/adventure-hftt.json", "fb7f7c6c4993cfa78504bfb891b82719"], ["data/adventure/adventure-hol.json", "8ff54944c0cdb740f13904025092914d"], ["data/adventure/adventure-hotb.json", "9805801ae3c73b3cb5fcd3bec2004bfd"], ["data/adventure/adventure-hotdq.json", "270c7bc273a8ac5f0e552d2f0d9e2356"], ["data/adventure/adventure-idrotf.json", "2284c48247c3562a95e3184b8b20d306"], ["data/adventure/adventure-imr.json", "1acb3586a693309e9596addd9a2cedbe"], ["data/adventure/adventure-jttrc.json", "00132c95a158e5014d2cae510721aad8"], ["data/adventure/adventure-kftgv.json", "d7c955a23e4e0d4d1977036a22904acf"], ["data/adventure/adventure-llk.json", "5054cecfc175f6d99717c25762a0cf6a"], ["data/adventure/adventure-mot-nss.json", "277c522960d947fc41773bfde010ce41"], ["data/adventure/adventure-oota.json", "08c1529bce810ac38ac3e720c0bbf8b2"], ["data/adventure/adventure-pabtso.json", "847e6a2801988d852d4ae70dde5734f2"], ["data/adventure/adventure-pota.json", "0a2bc75ed5603c88b4a8aab2cf669539"], ["data/adventure/adventure-qftis.json", "fcc81d99eaced756fd5f9ab7c6fb3ea1"], ["data/adventure/adventure-rot.json", "7e43a13d6ff0d4f0858acb8998987883"], ["data/adventure/adventure-sdw.json", "065a98cd643444db6f37bf52a53805ce"], ["data/adventure/adventure-skt.json", "2c4452318c6a44644c0ad52d69fc7af2"], ["data/adventure/adventure-slw.json", "5907de293687ec4bfb51321e93999a11"], ["data/adventure/adventure-tftyp-atg.json", "d47a3e6e4217d4daeebfd3f76824debb"], ["data/adventure/adventure-tftyp-dit.json", "406be584357e9f88bda24fe7b7c9c993"], ["data/adventure/adventure-tftyp-tfof.json", "59c384ea87d92e5005e0618fc6d52edd"], ["data/adventure/adventure-tftyp-thsot.json", "848d3feacd0a34080a4303d71a4c484f"], ["data/adventure/adventure-tftyp-toh.json", "85197634544173be783fda43fb1fa2d9"], ["data/adventure/adventure-tftyp-tsc.json", "b2ea30d1d3bad1fe068072c42d9bb5ef"], ["data/adventure/adventure-tftyp-wpm.json", "9de0bea41a6683f51d95e196485dcc10"], ["data/adventure/adventure-tlk.json", "2e4e191fa298e5a4612a50b5e65463c9"], ["data/adventure/adventure-toa.json", "2b93ccb19da28c13b6223d7919cc89fe"], ["data/adventure/adventure-ttp.json", "806d110d785999e576e7e4a0f7cb2eff"], ["data/adventure/adventure-veor.json", "b03372f7ee5089b67f4e9f5dc0135b8e"], ["data/adventure/adventure-vnotee.json", "2ecd95b85c58f53b14866212465f8d7e"], ["data/adventure/adventure-wbtw.json", "6af21181f85158d346f171ddc00cdbb1"], ["data/adventure/adventure-wdh.json", "b9954b7d2f701d4f0b81999da2c3032a"], ["icon/icon-1024.png", "f60474ee3a7bf04d8382cadc77afe9ec"], ["icon/icon-192.png", "80d8e3c369914b3888d3ee4af07e8437"], ["icon/icon-512.png", "4bf55f77cbaa98369ef3c2acdccd0b4f"], ["android-chrome-192x192.png", "b614eaa0ad252d579691a04f119a6fbe"], ["android-chrome-256x256.png", "1e90846de779d720d5b17512491d2527"], ["android-chrome-384x384.png", "3b4d89e280462dec9b64e482c935fc24"], ["android-chrome-512x512.png", "fcb809e942b90b1aa869aa119816768e"], ["apple-touch-icon-120x120.png", "fbfa4f964f283b88f0734506b0f62a22"], ["apple-touch-icon-152x152.png", "aff48568051b66a7c1dbe15cda09da53"], ["apple-touch-icon-167x167.png", "f1a9d673bf2c184932605a31e98cba19"], ["apple-touch-icon-180x180.png", "0fcf7820a71f52b675a1f81427a33dc5"], ["apple-touch-icon-360x360.png", "e3f1fb5828fb43aeb59de642f3106c72"], ["favicon_preview.png", "39e26ac3c26893ea7e3816441f0c1e5b"], ["favicon-128x128.png", "b68d2faf351ef52d85eaadf610224740"], ["favicon-144x144.png", "87b112800fee97801416d51b27a4f231"], ["favicon-16x16.png", "de0ba73998e568d547c37d16950815fe"], ["favicon-256x256.png", "f51fadaa402442f0f87ea576ec01bf6c"], ["favicon-32x32.png", "f2c41f20cce6ef3089432145722ea49f"], ["favicon-48x48.png", "2eb505678c9fc5b1d6e8c61548a90a95"], ["favicon-64x64.png", "f8dee6b249ba23bf635180a1b77a7bba"], ["maskable_icon.png", "98b037c65c723b606017fd9c400311f5"], ["mstile-144x144.png", "08cd74e5c59f77a48f841c34074bfaae"], ["mstile-150x150.png", "fd37147cd7c31a8da01c06ce1b0b93d0"], ["mstile-310x150.png", "7e54439ad3402e957dedd29ddf31f326"], ["mstile-310x310.png", "78912a91be79bdbb2633c86b5d2c992c"], ["mstile-70x70.png", "321bb7d946b4052e5de4cf9ab0203bf3"], ["safari_pin_preview.png", "dcb567c98c8358a2a9dbc4c121ec0919"], ["touch_bar_preview.png", "9bdf17dff2a08d19f6fe9d161532dd5a"], ["favicon.svg", "746a8b0e4acd295d194812b937d11781"], ["safari-pinned-tab.svg", "e7f0a2eb4ccd3ed4ec2bc5dabbf2ee90"]].map(
    ([
      route,
      revision
    ]) => [
      `${self.location.origin}/${route}`,
      revision
    ]
  ));
  var revisionCacheFirst = new RevisionCacheFirst();
  registerRoute(
    ({ request }) => runtimeManifest.has(request.url),
    revisionCacheFirst
  );
  addEventListener("activate", revisionCacheFirst.activate);
  registerRoute(({ request }) => request.destination === "font", new CacheFirst({
    cacheName: "font-cache"
  }));
  registerRoute(({ request }) => request.destination === "image", new NetworkFirst({
    cacheName: "external-image-cache",
    plugins: [
      // this is a safeguard against an utterly massive cache - these numbers may need tweaking
      new ExpirationPlugin({ maxAgeSeconds: 7 * 24 * 60 * 60, maxEntries: 100, purgeOnQuotaError: true })
    ]
  }));
  addEventListener("install", () => {
    self.skipWaiting();
  });
  addEventListener("activate", (event) => {
    event.waitUntil((async () => {
      const cacheNames2 = await caches.keys();
      for (const cacheName of cacheNames2) {
        if (!/\d+\.\d+\.\d+/.test(cacheName))
          continue;
        await caches.delete(cacheName);
        console.log(`Deleted legacy cache "${cacheName}"`);
      }
    })());
  });
})();
