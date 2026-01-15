(() => {
  "use strict";

  if (window.__SITE_PROGRESS_INIT__) return;
  window.__SITE_PROGRESS_INIT__ = true;

  const HOLD_AT = 0.9;
  const FAST_JUMP_TO = 0.18;
  const MID_JUMP_TO = 0.6;

  const QUIET_MS = 350;
  const MIN_VISIBLE_MS = 250;
  const FAILSAFE_MS = 20000;

  let pending = 0;
  let windowLoaded = false;
  let quietTimer = null;

  let startedAtMs = 0;
  let hasStarted = false;

  const isTransparent = (cssColor) => {
    if (!cssColor) return true;

    const c = String(cssColor).trim().toLowerCase();
    if (c === "transparent") return true;

    const rgba = c.match(
      /^rgba\(\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?\s*,\s*([0-9.]+)\s*\)$/
    );
    return rgba ? Number(rgba[4]) === 0 : false;
  };

  const safeSet = (n) => {
    try {
      NProgress.set(Math.max(0, Math.min(1, n)));
    } catch {
      // ignore
    }
  };

  const capAtHold = () => {
    const s = NProgress.status;
    if (typeof s === "number" && s > HOLD_AT) safeSet(HOLD_AT);
  };

  const ensureStarted = () => {
    if (hasStarted) return;
    hasStarted = true;
    startedAtMs = Date.now();
    NProgress.start();
  };

  const applyThemeProgressColorFromProbe = () => {
    try {
      if (!document.body) return false;

      const root = document.documentElement;

      const probe = document.createElement("button");
      probe.className = "ve-btn ve-btn-xs ve-btn-default cls__btn-cf--active";
      probe.type = "button";
      probe.tabIndex = -1;

      probe.style.position = "absolute";
      probe.style.left = "-99999px";
      probe.style.top = "-99999px";
      probe.style.visibility = "hidden";
      probe.style.pointerEvents = "none";

      document.body.appendChild(probe);

      const cs = getComputedStyle(probe);

      // Prefer background (most accurate for "active" button),
      // fallback to border, then text if needed.
      let chosen = cs.backgroundColor;
      if (isTransparent(chosen)) chosen = cs.borderTopColor;
      if (isTransparent(chosen)) chosen = cs.borderLeftColor;
      if (isTransparent(chosen)) chosen = cs.color;

      probe.remove();

      if (chosen && !isTransparent(chosen)) {
        root.style.setProperty("--site-progress-color", chosen);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  };

  const applyThemeProgressColor = () => {
    if (applyThemeProgressColorFromProbe()) return;

    document.addEventListener(
      "DOMContentLoaded",
      () => {
        applyThemeProgressColorFromProbe();
      },
      { once: true }
    );
  };

  const maybeFinish = () => {
    capAtHold();

    if (!windowLoaded) return;
    if (pending !== 0) return;

    const elapsed = Date.now() - startedAtMs;
    if (elapsed < MIN_VISIBLE_MS) {
      setTimeout(maybeFinish, MIN_VISIBLE_MS - elapsed);
      return;
    }

    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => {
      if (!windowLoaded) return;
      if (pending !== 0) return;

      try {
        safeSet(HOLD_AT);
        NProgress.done(true);
      } catch {
        // ignore
      }
    }, QUIET_MS);
  };

  const patchNetworkTracking = () => {
    if (typeof window.fetch === "function" && !window.fetch.__SITE_PROGRESS_PATCHED__) {
      const origFetch = window.fetch.bind(window);

      const wrappedFetch = (...args) => {
        pending += 1;
        ensureStarted();
        capAtHold();

        return Promise.resolve(origFetch(...args)).finally(() => {
          pending = Math.max(0, pending - 1);
          maybeFinish();
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
        capAtHold();

        this.addEventListener(
          "loadend",
          () => {
            pending = Math.max(0, pending - 1);
            maybeFinish();
          },
          { once: true }
        );

        return origSend.apply(this, args);
      };
    }
  };

  const init = () => {
    if (!window.NProgress) return;

    applyThemeProgressColor();

    NProgress.configure({
      minimum: 0.08,
      showSpinner: false,
      trickle: true,
      trickleSpeed: 240,
      easing: "ease",
      speed: 200,
    });

    ensureStarted();
    patchNetworkTracking();

    setTimeout(() => {
      const s = NProgress.status;
      if (typeof s === "number" && s < FAST_JUMP_TO) safeSet(FAST_JUMP_TO);
      capAtHold();
    }, 80);

    document.addEventListener("DOMContentLoaded", () => {
      const s = NProgress.status;
      if (typeof s === "number" && s < MID_JUMP_TO) safeSet(MID_JUMP_TO);
      capAtHold();
    });

    document.addEventListener(
      "click",
      (e) => {
        const a = e.target && e.target.closest ? e.target.closest("a") : null;
        if (!a) return;

        const href = a.getAttribute("href") || "";
        if (!href || href.startsWith("#")) return;

        ensureStarted();
        capAtHold();
      },
      { capture: true }
    );

    window.addEventListener("load", () => {
      windowLoaded = true;
      safeSet(HOLD_AT);
      maybeFinish();
    });

    setTimeout(() => {
      try {
        NProgress.done(true);
      } catch {
        // ignore
      }
    }, FAILSAFE_MS);
  };

  // Body-safe boot:
  // - With `defer`, this runs after parsing and body exists.
  // - If someone removes `defer`, we still wait until body exists.
  if (document.body) {
    init();
  } else {
    const startWait = Date.now();
    const MAX_WAIT_MS = 5000;

    const tick = () => {
      if (document.body) {
        init();
        return;
      }
      if (Date.now() - startWait > MAX_WAIT_MS) return;
      requestAnimationFrame(tick);
    };

    tick();
  }
})();