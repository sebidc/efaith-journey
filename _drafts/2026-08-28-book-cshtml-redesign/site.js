(function () {
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.querySelector("#primary-navigation");

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", function () {
            const isOpen = primaryNav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.querySelectorAll("[data-character-count]").forEach(function (field) {
        const target = document.querySelector(field.getAttribute("data-character-count"));
        const update = function () {
            if (!target) {
                return;
            }

            const minimum = Number(field.getAttribute("data-minimum") || 0);
            const remaining = Math.max(minimum - field.value.trim().length, 0);
            target.textContent = remaining === 0
                ? "Ready to submit."
                : remaining + " more characters needed.";
        };

        field.addEventListener("input", update);
        update();
    });

    const filter = document.querySelector("[data-entry-filter]");
    const search = document.querySelector("[data-entry-search]");
    const entries = Array.from(document.querySelectorAll("[data-entry-kind]"));

    function applyEntryFilters() {
        if (!entries.length) {
            return;
        }

        const selectedKind = filter ? filter.value : "All";
        const query = search ? search.value.trim().toLowerCase() : "";

        entries.forEach(function (entry) {
            const matchesKind = selectedKind === "All" || entry.dataset.entryKind === selectedKind;
            const matchesQuery = !query || entry.textContent.toLowerCase().includes(query);
            entry.hidden = !(matchesKind && matchesQuery);
        });
    }

    if (filter) {
        filter.addEventListener("change", applyEntryFilters);
    }

    if (search) {
        search.addEventListener("input", applyEntryFilters);
    }

    const confessionText = document.querySelector("[data-confession-text]");
    const confessionPreview = document.querySelector("[data-confession-preview]");

    if (confessionText && confessionPreview) {
        confessionText.addEventListener("input", function () {
            const value = confessionText.value.trim();
            confessionPreview.textContent = value
                ? value
                : "Your testimonial preview will appear here as you type.";
        });
    }
}());
