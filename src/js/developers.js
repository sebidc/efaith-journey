(function () {
    const { escapeHtml, loadJson, loadMarkdown, markdownToHtml } = window.EFaithContent;

    document.addEventListener("DOMContentLoaded", async () => {
        const grid = document.querySelector("[data-developer-grid]");
        const detail = document.querySelector("[data-resume-dock]");
        if (!grid || !detail) {
            return;
        }

        try {
            const members = await loadJson("content/data/developers.json");

            async function openMember(member, button) {
                grid.querySelectorAll(".resume-card").forEach((card) => {
                    card.setAttribute("aria-pressed", String(card === button));
                });

                const markdown = await loadMarkdown(member.bio);
                detail.classList.remove("is-open");
                detail.innerHTML = `
                    <p class="kicker">${escapeHtml(member.label)}</p>
                    ${markdownToHtml(markdown)}
                    <a class="resume-link" href="${escapeHtml(member.resumePdf)}">Open PDF</a>
                `;
                void detail.offsetWidth;
                detail.classList.add("is-open");
            }

            members.forEach((member, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "resume-card";
                button.setAttribute("aria-pressed", "false");
                button.innerHTML = `
                    <span>${escapeHtml(member.label)}</span>
                    <img src="${escapeHtml(member.resumePreview)}" alt="${escapeHtml(member.label)} resume thumbnail">
                `;
                button.addEventListener("click", () => openMember(member, button));
                grid.append(button);

                if (index === 0) {
                    openMember(member, button);
                }
            });
        } catch {
            detail.innerHTML = '<p class="loading-copy">Developer content could not be loaded.</p>';
        }
    });
})();
