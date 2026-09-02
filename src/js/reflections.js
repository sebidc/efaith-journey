(function () {
    const { escapeHtml, loadJson, loadMarkdown, markdownToHtml } = window.EFaithContent;

    document.addEventListener("DOMContentLoaded", async () => {
        const content = document.querySelector("[data-reflection-content]");
        const book = document.querySelector("[data-flip-book]");
        const prev = document.querySelector("[data-book-prev]");
        const next = document.querySelector("[data-book-next]");
        const count = document.querySelector("[data-book-count]");
        const leftPage = document.querySelector(".book-page-left");

        if (!content || !book || !prev || !next || !count || !leftPage) {
            return;
        }

        try {
            const reflectionPages = await loadJson("content/data/reflections.json");
            const pages = [
                { type: "front-cover", label: "Front Cover" },
                ...reflectionPages,
                { type: "back-cover", label: "Back Cover" }
            ];
            let currentIndex = 0;

            function animateTurn(direction) {
                book.classList.remove("is-turning", "is-turning-forward", "is-turning-back");
                void book.offsetWidth;
                book.classList.add("is-turning", direction < 0 ? "is-turning-back" : "is-turning-forward");
            }

            async function openPage(index, shouldAnimate, direction = 1) {
                currentIndex = (index + pages.length) % pages.length;
                const page = pages[currentIndex];
                book.classList.toggle("is-cover-page", Boolean(page.type));

                if (page.type === "front-cover") {
                    content.innerHTML = `
                        <div class="book-cover-page">
                            <p class="cover-mark">e-Faith Journey</p>
                            <h1>Reflections</h1>
                            <p>Open the book to read the group's reflection, individual journals, final prayer, and shared takeaways.</p>
                        </div>
                    `;
                } else if (page.type === "back-cover") {
                    content.innerHTML = `
                        <div class="book-cover-page back">
                            <p class="cover-mark">Amen</p>
                            <h1>Final Page</h1>
                            <p>Close the book with gratitude for faith, friendship, and the journey we shared.</p>
                        </div>
                    `;
                } else {
                    const markdown = await loadMarkdown(page.file);
                    content.innerHTML = markdownToHtml(markdown);
                }

                leftPage.innerHTML = `
                    <p class="kicker">e-Faith Journey</p>
                    <h1>${escapeHtml(page.label)}</h1>
                    <p>Page ${currentIndex + 1} of ${pages.length}</p>
                `;
                count.textContent = `${currentIndex + 1} / ${pages.length}`;
                if (shouldAnimate) {
                    animateTurn(direction);
                }
            }

            prev.addEventListener("click", () => openPage(currentIndex - 1, true, -1));
            next.addEventListener("click", () => openPage(currentIndex + 1, true, 1));

            openPage(0, false);
        } catch {
            content.innerHTML = '<p class="loading-copy">Reflection content could not be loaded.</p>';
        }
    });
})();
