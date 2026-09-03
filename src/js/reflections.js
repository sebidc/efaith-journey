(function () {
    const { escapeHtml, loadJson, loadMarkdown, markdownToHtml } = window.EFaithContent;

    document.addEventListener("DOMContentLoaded", async () => {
        const book = document.querySelector("[data-flip-book]");
        const prev = document.querySelector("[data-book-prev]");
        const next = document.querySelector("[data-book-next]");
        const count = document.querySelector("[data-book-count]");
        const loading = document.querySelector("[data-book-loading]");

        if (!book || !prev || !next || !count || !window.St?.PageFlip) {
            return;
        }

        let pageFlip = null;
        function pageShell(markup, className, density = "soft") {
            const page = document.createElement("div");
            page.className = `reflection-page ${className}`;
            page.dataset.density = density;
            page.innerHTML = markup;
            return page;
        }

        function frontCover() {
            return pageShell(`
                <div class="reflection-cover-content">
                    <p class="cover-mark">e-Faith Journey</p>
                    <h1>Reflections</h1>
                    <p>Open the book to read the group's reflection, individual journals, final prayer, and shared takeaways.</p>
                </div>
            `, "reflection-cover reflection-front-cover", "hard");
        }

        function backCover() {
            return pageShell(`
                <div class="reflection-cover-content reflection-cover-content--end">
                    <p class="cover-mark">Amen</p>
                    <h1>e-Faith Journey</h1>
                    <p>The reflections close here, but the journey continues.</p>
                </div>
            `, "reflection-cover reflection-back-cover", "hard");
        }

        function closingPaper(index, total) {
            return pageShell(`
                <article class="reflection-paper">
                    <header class="reflection-paper-meta">
                        <p class="kicker">e-Faith Journey</p>
                        <span>Page ${index + 1} of ${total}</span>
                    </header>
                    <div class="reflection-paper-body reflection-paper-body--closing">
                        <p class="kicker">Amen</p>
                        <h1>Final Page</h1>
                        <p>Close the book with gratitude for faith, friendship, and the journey we shared.</p>
                    </div>
                </article>
            `, "reflection-paper-page reflection-final-paper");
        }

        async function contentPage(page, index, total) {
            const markdown = await loadMarkdown(page.file);
            return pageShell(`
                <article class="reflection-paper">
                    <header class="reflection-paper-meta">
                        <p class="kicker">e-Faith Journey</p>
                        <span>Page ${index + 1} of ${total}</span>
                    </header>
                    <div class="reflection-paper-body">
                        ${markdownToHtml(markdown)}
                    </div>
                </article>
            `, "reflection-paper-page");
        }

        function updateControls() {
            const current = pageFlip ? pageFlip.getCurrentPageIndex() : 0;
            const total = pageFlip ? pageFlip.getPageCount() : 1;

            count.textContent = `${current + 1} / ${total}`;
            prev.disabled = current === 0;
            next.disabled = current >= total - 1;
            setBookView(current, total);
        }

        function setBookView(index, total) {
            book.classList.toggle("is-front-single", index === 0);
            book.classList.toggle("is-back-single", index >= total - 1);
        }

        function prepareTurn(direction) {
            if (!pageFlip) {
                return;
            }

            const total = pageFlip.getPageCount();
            const current = pageFlip.getCurrentPageIndex();
            const target = Math.max(0, Math.min(total - 1, current + direction));
            setBookView(target, total);
        }

        function destroyExisting() {
            pageFlip = null;
            book.innerHTML = "";
        }

        async function renderBook() {
            destroyExisting();

            const reflectionPages = await loadJson("content/data/reflections.json");
            const total = reflectionPages.length + 3;
            const pages = [frontCover()];

            for (let index = 0; index < reflectionPages.length; index += 1) {
                pages.push(await contentPage(reflectionPages[index], index + 1, total));
            }

            pages.push(closingPaper(reflectionPages.length + 1, total));
            pages.push(backCover());
            pages.forEach((page) => book.appendChild(page));

            const isMobile = window.matchMedia("(max-width: 620px)").matches;
            const pageWidth = isMobile ? Math.max(260, Math.min(320, window.innerWidth - 72)) : 470;
            const pageHeight = isMobile ? Math.round(pageWidth * 1.42) : 620;

            pageFlip = new St.PageFlip(book, {
                width: pageWidth,
                height: pageHeight,
                size: "stretch",
                minWidth: isMobile ? 240 : 280,
                maxWidth: isMobile ? pageWidth : 520,
                minHeight: isMobile ? 340 : 390,
                maxHeight: isMobile ? pageHeight : 680,
                drawShadow: true,
                flippingTime: 1180,
                usePortrait: true,
                startPage: 0,
                startZIndex: 20,
                autoSize: true,
                maxShadowOpacity: 0.52,
                showCover: true,
                mobileScrollSupport: true,
                swipeDistance: 24,
                clickEventForward: true,
                disableFlipByClick: false
            });

            pageFlip.on("flip", updateControls);
            pageFlip.on("init", updateControls);
            pageFlip.loadFromHTML(pages);
            updateControls();
        }

        prev.addEventListener("click", () => {
            if (pageFlip) {
                prepareTurn(-1);
                pageFlip.flipPrev("bottom");
            }
        });

        next.addEventListener("click", () => {
            if (pageFlip) {
                prepareTurn(1);
                pageFlip.flipNext("bottom");
            }
        });

        try {
            if (loading) {
                loading.textContent = "Opening the book...";
            }
            await renderBook();
        } catch {
            book.innerHTML = '<p class="loading-copy">Reflection content could not be loaded.</p>';
        }
    });
})();
