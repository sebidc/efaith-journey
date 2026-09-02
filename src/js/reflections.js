(function () {
    const { escapeHtml, loadJson, loadMarkdown, markdownToHtml } = window.EFaithContent;

    document.addEventListener("DOMContentLoaded", async () => {
        const content = document.querySelector("[data-reflection-content]");
        const book = document.querySelector("[data-flip-book]");
        const cover = document.querySelector("[data-book-cover]");
        const prev = document.querySelector("[data-book-prev]");
        const next = document.querySelector("[data-book-next]");
        const count = document.querySelector("[data-book-count]");
        const leftPage = document.querySelector(".book-page-left");

        if (!content || !book || !cover || !prev || !next || !count || !leftPage) {
            return;
        }

        try {
            const pages = await loadJson("content/data/reflections.json");
            let currentIndex = 0;

            function animateTurn() {
                cover.classList.add("is-open");
                book.classList.remove("is-turning");
                void book.offsetWidth;
                book.classList.add("is-turning");
            }

            async function openPage(index, shouldAnimate) {
                currentIndex = (index + pages.length) % pages.length;
                const page = pages[currentIndex];
                const markdown = await loadMarkdown(page.file);
                content.innerHTML = markdownToHtml(markdown);
                leftPage.innerHTML = `
                    <p class="kicker">e-Faith Journey</p>
                    <h1>${escapeHtml(page.label)}</h1>
                    <p>Page ${currentIndex + 1} of ${pages.length}</p>
                `;
                count.textContent = `${currentIndex + 1} / ${pages.length}`;
                if (shouldAnimate) {
                    animateTurn();
                }
            }

            cover.addEventListener("click", () => openPage(currentIndex, true));
            prev.addEventListener("click", () => openPage(currentIndex - 1, true));
            next.addEventListener("click", () => openPage(currentIndex + 1, true));

            openPage(0, false);
        } catch {
            content.innerHTML = '<p class="loading-copy">Reflection content could not be loaded.</p>';
        }
    });
})();
