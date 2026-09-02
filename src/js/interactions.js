(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
        document.body.classList.add("is-entering");
        window.requestAnimationFrame(() => {
            document.body.classList.remove("is-entering");
        });
        window.addEventListener("pageshow", () => {
            document.body.classList.remove("is-leaving", "is-entering");
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (document.querySelector(".site-frame")) {
            return;
        }

        const frame = document.createElement("div");
        frame.className = "site-frame";
        frame.setAttribute("aria-hidden", "true");
        document.body.append(frame);
    });

    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");
        if (!link || reduceMotion) {
            return;
        }

        const url = new URL(link.href, window.location.href);
        const current = new URL(window.location.href);
        const isSameOrigin = url.origin === current.origin;
        const isPage = /\.(html)?$/.test(url.pathname) || url.pathname.endsWith("/");
        const isHashOnly = url.pathname === current.pathname && url.hash;

        if (!isSameOrigin || isHashOnly || link.target || !isPage) {
            return;
        }

        event.preventDefault();
        document.body.classList.add("is-leaving");
        window.setTimeout(() => {
            window.location.href = link.href;
        }, 340);
    });
})();
