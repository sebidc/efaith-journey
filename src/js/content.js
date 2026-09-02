(function () {
    const cache = new Map();

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function inlineMarkdown(value) {
        return escapeHtml(value)
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>");
    }

    function markdownToHtml(markdown) {
        const lines = markdown.replace(/\r\n/g, "\n").split("\n");
        const output = [];
        let paragraph = [];
        let listOpen = false;
        let quoteOpen = false;

        function closeParagraph() {
            if (paragraph.length) {
                output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
                paragraph = [];
            }
        }

        function closeList() {
            if (listOpen) {
                output.push("</ul>");
                listOpen = false;
            }
        }

        function closeQuote() {
            if (quoteOpen) {
                output.push("</blockquote>");
                quoteOpen = false;
            }
        }

        lines.forEach((line) => {
            const trimmed = line.trim();

            if (!trimmed) {
                closeParagraph();
                closeList();
                closeQuote();
                return;
            }

            const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
            if (heading) {
                closeParagraph();
                closeList();
                closeQuote();
                const level = Math.min(heading[1].length, 3);
                output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
                return;
            }

            if (trimmed.startsWith("- ")) {
                closeParagraph();
                closeQuote();
                if (!listOpen) {
                    output.push("<ul>");
                    listOpen = true;
                }
                output.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
                return;
            }

            if (trimmed.startsWith("> ")) {
                closeParagraph();
                closeList();
                if (!quoteOpen) {
                    output.push("<blockquote>");
                    quoteOpen = true;
                }
                output.push(`<p>${inlineMarkdown(trimmed.slice(2))}</p>`);
                return;
            }

            paragraph.push(trimmed);
        });

        closeParagraph();
        closeList();
        closeQuote();

        return `<div class="markdown">${output.join("")}</div>`;
    }

    function selectSection(markdown, section) {
        if (!section) {
            return markdown;
        }

        const marker = `<!-- ${section} -->`;
        const start = markdown.indexOf(marker);
        if (start < 0) {
            return markdown;
        }

        const after = markdown.slice(start + marker.length);
        const end = after.search(/\n<!--\s*[-\w]+\s*-->/);
        return (end < 0 ? after : after.slice(0, end)).trim();
    }

    async function fetchText(path) {
        if (!cache.has(path)) {
            cache.set(path, fetch(path).then((response) => {
                if (!response.ok) {
                    throw new Error(`Unable to load ${path}`);
                }
                return response.text();
            }));
        }

        return cache.get(path);
    }

    async function renderMarkdownElement(element) {
        const markdown = await fetchText(element.dataset.md);
        const selected = selectSection(markdown, element.dataset.mdSelect);
        element.innerHTML = markdownToHtml(selected);
    }

    async function loadMarkdown(path) {
        return fetchText(path);
    }

    async function loadJson(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Unable to load ${path}`);
        }
        return response.json();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-md]").forEach((element) => {
            renderMarkdownElement(element).catch(() => {
                element.innerHTML = '<p class="loading-copy">Content could not be loaded.</p>';
            });
        });
    });

    window.EFaithContent = {
        escapeHtml,
        markdownToHtml,
        loadMarkdown,
        loadJson
    };
})();
