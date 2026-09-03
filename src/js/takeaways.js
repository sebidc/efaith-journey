(function () {
    const { escapeHtml, loadJson } = window.EFaithContent;

    document.addEventListener("DOMContentLoaded", async () => {
        const form = document.querySelector("[data-takeaway-form]");
        const result = document.querySelector("[data-takeaway-result]");
        if (!form || !result) {
            return;
        }

        try {
            const data = await loadJson("content/data/takeaways.json");
            form.innerHTML = `
                ${data.questions.map((question, index) => `
                    <fieldset class="question-card">
                        <legend><strong>${index + 1}. ${escapeHtml(question.prompt)}</strong></legend>
                        ${question.options.map((option) => `
                            <label class="choice-label">
                                <input type="radio" name="q${index}" value="${escapeHtml(option)}" required>
                                <span>${escapeHtml(option)}</span>
                            </label>
                        `).join("")}
                    </fieldset>
                `).join("")}
                <button type="submit">Submit Reflection</button>
            `;

            form.querySelectorAll(".choice-label input").forEach((input) => {
                input.addEventListener("change", () => {
                    const card = input.closest(".question-card");
                    const label = input.closest(".choice-label");

                    card.querySelectorAll(".choice-label").forEach((choice) => {
                        choice.classList.toggle("is-selected", choice === label);
                    });

                    card.classList.remove("is-answering");
                    void card.offsetWidth;
                    card.classList.add("is-answering");
                });
            });

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const values = data.questions.map((_, index) => new FormData(form).get(`q${index}`));
                result.hidden = false;
                result.classList.remove("is-revealing");
                result.innerHTML = `
                    <h3>Reflection Submitted</h3>
                    ${values.map((value, index) => `
                        <p><strong>${escapeHtml(data.summaryLabels[index])}:</strong> ${escapeHtml(value)}</p>
                    `).join("")}
                `;
                void result.offsetWidth;
                result.classList.add("is-revealing");
                result.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        } catch {
            form.innerHTML = '<p class="loading-copy">Key Takeaways content could not be loaded.</p>';
        }
    });
})();
