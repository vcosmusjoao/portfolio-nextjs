/**
 * Runs in <head>, before the first paint, so the boot cover is already in
 * place when the page appears — a React effect would only run after hydration
 * and flash the page before covering it.
 *
 * It only adds a class; the animation itself is CSS, so if anything here
 * fails the page simply shows without an intro.
 */
export const BOOT_SCRIPT = `(function () {
  try {
    var root = document.documentElement;
    var KEY = "portfolio.booted";
    if (sessionStorage.getItem(KEY) === "1") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem(KEY, "1");
    root.classList.add("booting");

    var events = ["keydown", "pointerdown", "wheel", "touchstart"];
    var done = function () {
      root.classList.remove("booting", "boot-skip");
      events.forEach(function (e) { removeEventListener(e, skip); });
      document.removeEventListener("animationend", onEnd);
    };
    var skip = function () {
      root.classList.add("boot-skip");
      setTimeout(done, 250);
    };
    // Clean up when the sweep actually finishes. The animation starts at first
    // paint, which on a slow connection can be well after this script runs, so
    // a timer counted from here could cut the sweep off mid-screen.
    var onEnd = function (e) {
      if (e.animationName === "boot-reveal") done();
    };
    document.addEventListener("animationend", onEnd);
    events.forEach(function (e) { addEventListener(e, skip, { passive: true }); });
    // Safety net only, in case animationend never fires.
    setTimeout(done, 8000);
  } catch (e) {}
})();`;
