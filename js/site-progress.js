(() => {
  "use strict";

  if (window.__SITE_PROGRESS_INIT__) return;
  window.__SITE_PROGRESS_INIT__ = true;

  if (!window.NProgress) return;

  // ---- Tuning ----
  const MIN = 0.02;

  // Simulated progress cap before "done"
  const LOADING_CAP = 0.70;

  // How long it takes to smoothly reach ~70% if the page is still loading
  // (longer = slower, less "shooting to 70%")
  const LOADING_RAMP_MS = 3500;

  // Finishing animation duration (slow finish, no jump)
  const FINISH_MS = 900;

  // Avoid blink if the page is super fast
  const MIN_VISIBLE_MS = 250;

  // If something never resolves, force-complete
  const FAILSAFE_MS = 20000;

  // ---- State ----
  let pending = 0;
  let windowLoaded = false;

  let startedAt = 0;
  let finishStartedAt = 0;
  let finishFrom = 0;

  let rafId = null;
  let isFinishing = false;
  let isDone = false;

  // ---- Easing ----
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function easeOutCubic(t) {
    const x = clamp(t, 0, 1);
    return 1 - Math.pow(1 - x, 3);
  }

  function easeInOutCubic(t) {
    const x = clamp(t, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  // ---- NProgress helpers ----
  function getStatus() {
    return typeof NProgress.status === "number" ? NProgress.status : MIN;
  }

  function safeSet(n) {
    try {
      NProgress.set(clamp(n, 0, 1));
    } catch {
      // ignore
    }
  }

  function ensureStarted() {
    if (startedAt) return;
    startedAt = Date.now();

    NProgress.configure({
      minimum: MIN,
      showSpinner: false,
      trickle: false, // IMPORTANT: no random/jittery increments
      easing: "ease",
      speed: 300,
    });

    NProgress.start();
    safeSet(MIN);
  }

  // ---- Network tracking (fetch + XHR) ----
  function patchNetworkTracking() {
    if (typeof window.fetch === "function" && !window.fetch.__SITE_PROGRESS_PATCHED__) {
      const origFetch = window.fetch.bind(window);

      const wrappedFetch = (...args) => {
        pending += 1;
        ensureStarted();

        return Promise.resolve(origFetch(...args)).finally(() => {
          pending = Math.max(0, pending - 1);
        });
      };

      wrappedFetch.__SITE_PROGRESS_PATCHED__ = true;
      window.fetch = wrappedFetch;
    }

    if (window.XMLHttpRequest && !window.XMLHttpRequest.__SITE_PROGRESS_PATCHED__) {
      window.XMLHttpRequest.__SITE_PROGRESS_PATCHED__ = true;

      const origSend = window.XMLHttpRequest.prototype.send;

      window.XMLHttpRequest.prototype.send = function (...args) {
        pending += 1;
        ensureStarted();

        this.addEventListener(
          "loadend",
          () => {
            pending = Math.max(0, pending - 1);
          },
          { once: true }
        );

        return origSend.apply(this, args);
      };
    }
  }

  // ---- Completion conditions ----
  function canFinishNow() {
    return windowLoaded && pending === 0;
  }

  function beginFinishIfReady() {
    if (isFinishing || isDone) return;
    if (!canFinishNow()) return;

    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_VISIBLE_MS) return; // wait for visibility window

    isFinishing = true;
    finishStartedAt = Date.now();
    finishFrom = getStatus();
    if (finishFrom < MIN) finishFrom = MIN;
  }

  // ---- Animation loop ----
  function tick() {
    if (isDone) return;

    const now = Date.now();
    ensureStarted();

    if (!isFinishing) {
      // Simulate smooth progress up to 70% (no more)
      const t = now - startedAt;
      const p = easeOutCubic(t / LOADING_RAMP_MS);
      const target = MIN + (LOADING_CAP - MIN) * p;

      // Never go backward
      const cur = getStatus();
      safeSet(Math.max(cur, Math.min(target, LOADING_CAP)));

      // If we're actually ready, begin finish (but do not jump)
      beginFinishIfReady();
    } else {
      // Finish smoothly from current -> 100%
      const ft = (now - finishStartedAt) / FINISH_MS;
      const p = easeInOutCubic(ft);
      const target = finishFrom + (1 - finishFrom) * p;

      safeSet(Math.max(getStatus(), target));

      if (ft >= 1) {
        try {
          safeSet(1);
          NProgress.done(true);
        } catch {
          // ignore
        }
        isDone = true;
        return;
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  // ---- Init (body-safe) ----
  function init() {
    ensureStarted();
    patchNetworkTracking();

    window.addEventListener("load", () => {
      windowLoaded = true;
      beginFinishIfReady();
    });

    // Failsafe
    setTimeout(() => {
      if (isDone) return;
      try {
        NProgress.done(true);
      } catch {
        // ignore
      }
      isDone = true;
      if (rafId != null) cancelAnimationFrame(rafId);
    }, FAILSAFE_MS);

    tick();
  }

  // If someone removes `defer`, still avoid body-null issues
  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init, { once: true });
})();