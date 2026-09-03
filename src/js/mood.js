(function () {
    const { escapeHtml, loadJson } = window.EFaithContent;

    function renderMoodApp(root, items, compact) {
        root.innerHTML = `
            <div class="mood-question">
                <p class="kicker">Choose One</p>
                <h2>${compact ? "How are you today?" : "What are you carrying today?"}</h2>
            </div>
            <div class="mood-options">
                ${items.map((item, index) => `
                    <button class="option-button" type="button" data-index="${index}" aria-pressed="false">
                        ${escapeHtml(item.description)}
                    </button>
                `).join("")}
            </div>
            <div class="mood-result" data-mood-result hidden></div>
        `;

        const result = root.querySelector("[data-mood-result]");
        root.querySelectorAll(".option-button").forEach((button) => {
            button.addEventListener("click", () => {
                const item = items[Number(button.dataset.index)];
                root.querySelectorAll(".option-button").forEach((option) => {
                    option.setAttribute("aria-pressed", String(option === button));
                });
                button.classList.remove("is-popping");
                void button.offsetWidth;
                button.classList.add("is-popping");
                result.hidden = false;
                result.classList.remove("is-revealing");
                result.innerHTML = `
                    <div class="emotion-art" aria-hidden="true">${escapeHtml(item.symbol)}</div>
                    <div>
                        <p class="kicker">${escapeHtml(item.mood)}</p>
                        <h3>${escapeHtml(item.reference)}</h3>
                        <p>${escapeHtml(item.verse)}</p>
                        <p>${escapeHtml(item.explanation)}</p>
                    </div>
                `;
                void result.offsetWidth;
                result.classList.add("is-revealing");
            });
        });
    }

    document.addEventListener("DOMContentLoaded", async () => {
        const roots = [
            ...document.querySelectorAll("[data-mood-app]"),
            ...document.querySelectorAll("[data-mood-preview]")
        ];

        if (!roots.length) {
            return;
        }

        try {
            const items = await loadJson("content/data/mood-options.json");
            roots.forEach((root) => renderMoodApp(root, items, root.hasAttribute("data-mood-preview")));
        } catch {
            roots.forEach((root) => {
                root.innerHTML = '<p class="loading-copy">Mood Checker content could not be loaded.</p>';
            });
        }
    });
})();
