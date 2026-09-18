(function () {
  const key = "mathsversity-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const stored = localStorage.getItem(key);
  const currentTheme = () => root.dataset.theme || (media.matches ? "dark" : "light");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(key, theme);
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute("content", theme === "dark" ? "#101722" : "#f6f8fb");
    document.querySelectorAll(".mv-theme-toggle").forEach((button) => {
      button.textContent = theme === "dark" ? "☀" : "☾";
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
      button.setAttribute("title", theme === "dark" ? "Light mode" : "Dark mode");
    });
  }

  applyTheme(stored || (media.matches ? "dark" : "light"));

  const toolMatch = window.location.pathname.match(/tool-([1-8])-\d+\.html$/i);
  const loadLibrary = (src) => new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => { console.warn(`Mathsversity library unavailable: ${src}`); resolve(); };
    document.head.appendChild(script);
  });

  if (toolMatch) {
    window.mathsversityLibraries = {
      ready: Promise.all([
        loadLibrary("https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.min.js"),
        loadLibrary("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"),
        loadLibrary("https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"),
        loadLibrary("https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js"),
        loadLibrary("https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js"),
        loadLibrary("https://cdn.jsdelivr.net/npm/jsxgraph@1.8.0/distrib/jsxgraphcore.js"),
      ]),
    };

    window.mathsversityEnhanceTool = (root) => {
      if (window.MathJax?.typesetPromise && root) window.MathJax.typesetPromise([root]);
    };

    window.mathsversityCelebrate = () => {
      if (window.confetti) window.confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
      if (window.Howl) new window.Howl({ src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQAAAAA="] }).play();
    };

    window.mathsversityLibraries.ready.then(() => {
      window.mathsversityEnhanceTool?.(document.getElementById("toolApp"));
    });
  }

  // Class 3 through 8 tool pages were originally generated as static placeholders.
  // Mount the real activity app on those legacy pages until their templates are
  // regenerated, keeping the catalog links and direct URLs working alike.
  function mountClass34Tool() {
    const match = window.location.pathname.match(/tool-(3|4|5|6|7|8)-(\d+)\.html$/i);
    if (!match || document.getElementById("toolApp")) return;

    const shell = document.querySelector(".tool-shell");
    if (!shell) return;

    document.body.dataset.tool = `${match[1]}-${match[2]}`;
    shell.innerHTML = '<div class="learning-tool" id="toolApp"></div>';

    if (!document.querySelector('link[href$="c1c2-tools.css"]')) {
      const styles = document.createElement("link");
      styles.rel = "stylesheet";
      styles.href = "c1c2-tools.css";
      document.head.appendChild(styles);
    }

    const script = document.createElement("script");
    script.src = match[1] === "5" || match[1] === "6" ? "c5c6-tools.js?v=10" : match[1] === "7" || match[1] === "8" ? "c7c8-tools.js?v=4" : "c3c4-tools.js?v=4";
    script.async = false;
    (window.mathsversityLibraries?.ready || Promise.resolve()).then(() => document.body.appendChild(script));
  }

  mountClass34Tool();

  function mountToggle() {
    if (document.querySelector(".mv-theme-toggle")) return;

    const button = document.createElement("button");
    button.className = "mv-theme-toggle";
    button.type = "button";
    button.addEventListener("click", () => {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });

    const target =
      document.querySelector(".top-actions") ||
      document.querySelector(".tool-top") ||
      document.querySelector(".sub-top") ||
      document.querySelector(".premium-header") ||
      document.querySelector(".auth-brand");

    if (target) {
      target.appendChild(button);
      applyTheme(currentTheme());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle);
  } else {
    mountToggle();
  }
})();
