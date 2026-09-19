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
    };
    var skip = function () {
      root.classList.add("boot-skip");
      setTimeout(done, 250);
    };
    events.forEach(function (e) { addEventListener(e, skip, { passive: true }); });
    setTimeout(done, 1600);
  } catch (e) {}
})();`;
