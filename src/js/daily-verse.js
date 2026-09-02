(function () {
    const { escapeHtml, loadJson } = window.EFaithContent;
    const API_URL = "https://discoverybiblestudy.org/daily/api/";

    function fallbackVerse(verses) {
        const daySeed = Math.floor(Date.now() / 86400000);
        return verses[daySeed % verses.length];
    }

    function renderVerse(root, verse, source) {
        root.innerHTML = `
            <p class="kicker">Daily Bible Verse</p>
            <h1>${escapeHtml(verse.ref || verse.reference)}</h1>
            <p>${escapeHtml(verse.text)}</p>
            <p class="verse-meta">${escapeHtml(verse.date || "Local daily fallback")} · ${escapeHtml(source)}</p>
        `;
    }

    document.addEventListener("DOMContentLoaded", async () => {
        const root = document.querySelector("[data-daily-verse]");
        if (!root) {
            return;
        }

        try {
            const response = await fetch(API_URL, { cache: "no-store" });
            if (!response.ok) {
                throw new Error("Daily verse API unavailable");
            }
            const verse = await response.json();
            renderVerse(root, verse, "Discovery Bible Study API");
        } catch {
            const verses = await loadJson("content/data/verses.json");
            renderVerse(root, fallbackVerse(verses), "Local fallback");
        }
    });
})();
