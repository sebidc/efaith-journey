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
        const chrome = document.querySelector(".hero-chrome");
        const menuButton = document.querySelector(".menu-toggle");
        const menu = document.querySelector("[data-site-menu]");

        if (chrome && menuButton && menu) {
            const closeMenu = () => {
                chrome.classList.remove("is-menu-open");
                menuButton.setAttribute("aria-expanded", "false");
            };

            menuButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const isOpen = chrome.classList.toggle("is-menu-open");
                menuButton.setAttribute("aria-expanded", String(isOpen));
            });

            menu.addEventListener("click", (event) => {
                if (event.target.closest("a")) {
                    closeMenu();
                }
            });

            document.addEventListener("click", (event) => {
                if (!chrome.contains(event.target)) {
                    closeMenu();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    closeMenu();
                }
            });
        }

        if (!document.querySelector(".site-frame")) {
            const frame = document.createElement("div");
            frame.className = "site-frame";
            frame.setAttribute("aria-hidden", "true");
            document.body.append(frame);
        }
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
