(() => {
  "use strict";

  if (window.__SITE_PROGRESS_INIT__) return;
  window.__SITE_PROGRESS_INIT__ = true;

  if (!window.NProgress) return;

  const HOLD_AT = 0.9;
  const FAST_JUMP_TO = 0.18;
  const MID_JUMP_TO = 0.6;
  const QUIET_MS = 250;
  const FAILSAFE_MS = 15000;

  let pending = 0;
  let windowLoaded = false;
  let quietTimer = null;

  function safeSet(n) {
    try {
      window.NProgress.set(Math.max(0, Math.min(1, n)));
    } catch {}
  }

  function capAtHold() {
    const s = window.NProgress.status;
    if (typeof s === "number" && s > HOLD_AT) safeSet(HOLD_AT);
  }

  function maybeFinish() {
    capAtHold();
    if (!windowLoaded) return;
    if (pending !== 0) return;

    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => {
      if (!windowLoaded) return;
      if (pending !== 0) return;
      try {
        window.NProgress.done(true);
      } catch {}
    }, QUIET_MS);
  }

  window.NProgress.configure({
    minimum: 0.08,
    showSpinner: false,
    trickle: true,
    trickleSpeed: 240,
    easing: "ease",
    speed: 200,
  });

  window.NProgress.start();

  setTimeout(() => {
    const s = window.NProgress.status;
    if (typeof s === "number" && s < FAST_JUMP_TO) safeSet(FAST_JUMP_TO);
  }, 80);

  if (typeof window.fetch === "function") {
    const origFetch = window.fetch.bind(window);
    window.fetch = (...args) => {
      pending += 1;
      capAtHold();
      return Promise.resolve(origFetch(...args)).finally(() => {
        pending = Math.max(0, pending - 1);
        maybeFinish();
      });
    };
  }

  if (window.XMLHttpRequest && !window.XMLHttpRequest.__SITE_PROGRESS_PATCHED__) {
    window.XMLHttpRequest.__SITE_PROGRESS_PATCHED__ = true;
    const origSend = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.send = function (...args) {
      pending += 1;
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

  document.addEventListener("DOMContentLoaded", () => {
    const s = window.NProgress.status;
    if (typeof s === "number" && s < MID_JUMP_TO) safeSet(MID_JUMP_TO);
    capAtHold();
  });

  window.addEventListener("load", () => {
    windowLoaded = true;
    safeSet(HOLD_AT);
    maybeFinish();
  });

  setTimeout(() => {
    try {
      window.NProgress.done(true);
    } catch {}
  }, FAILSAFE_MS);
})();
