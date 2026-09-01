const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const papers = Array.from(document.querySelectorAll(".paper"));
let currentState = 0;
const maxState = papers.length;
let movingPaperIndex = null;
let movingPaperTimer = null;

function updateBookState() {
    if (!book || papers.length === 0) {
        return;
    }

    let shift = "0%";

    if (currentState === 0) {
        shift = "0%";
    } else if (currentState === maxState) {
        shift = "100%";
    } else {
        shift = "50%";
    }

    book.style.transform = `translateX(${shift})`;

    papers.forEach((paper, index) => {
        if (index === movingPaperIndex) {
            paper.style.zIndex = maxState * 3;
        }

        if (index < currentState) {
            paper.classList.add("flipped");
            if (index !== movingPaperIndex) {
                paper.style.zIndex = maxState + index + 1;
            }
        } else {
            paper.classList.remove("flipped");
            if (index !== movingPaperIndex) {
                paper.style.zIndex = maxState - index;
            }
        }
    });
}

function goNextPage() {
    movingPaperIndex = currentState < maxState ? currentState : null;
    currentState = currentState < maxState ? currentState + 1 : 0;
    updateBookState();
    clearMovingPaper();
}

function goPrevPage() {
    movingPaperIndex = currentState > 0 ? currentState - 1 : null;
    currentState = currentState > 0 ? currentState - 1 : maxState;
    updateBookState();
    clearMovingPaper();
}

function clearMovingPaper() {
    window.clearTimeout(movingPaperTimer);
    movingPaperTimer = window.setTimeout(() => {
        movingPaperIndex = null;
        updateBookState();
    }, 1150);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        goNextPage();
    }

    if (event.key === "ArrowLeft") {
        goPrevPage();
    }
});

window.addEventListener("resize", updateBookState);

const stage = document.querySelector(".main-stage");
let touchStartX = 0;
let touchStartY = 0;

if (stage) {
    stage.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });

    stage.addEventListener("touchend", (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
            return;
        }

        if (deltaX < 0) {
            goNextPage();
        } else {
            goPrevPage();
        }
    }, { passive: true });
}

document.querySelectorAll("[data-character-count]").forEach((field) => {
    const target = document.querySelector(field.getAttribute("data-character-count"));
    const minimum = Number(field.getAttribute("data-minimum") || 0);

    function updateCount() {
        if (!target) {
            return;
        }

        const remaining = Math.max(minimum - field.value.trim().length, 0);
        target.textContent = remaining === 0 ? "Ready to submit." : `${remaining} more characters needed.`;
    }

    field.addEventListener("input", updateCount);
    updateCount();
});

const filter = document.querySelector("[data-entry-filter]");
const search = document.querySelector("[data-entry-search]");
const entries = Array.from(document.querySelectorAll("[data-entry-kind]"));

function applyEntryFilters() {
    const selectedKind = filter ? filter.value : "All";
    const query = search ? search.value.trim().toLowerCase() : "";

    entries.forEach((entry) => {
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
    confessionText.addEventListener("input", () => {
        const value = confessionText.value.trim();
        confessionPreview.textContent = value || "Your testimonial preview will appear here as you type.";
    });
}

document.querySelectorAll(".book-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        if (window.location.protocol !== "file:") {
            return;
        }

        event.preventDefault();
        const note = form.querySelector(".field-note");
        if (note) {
            note.textContent = "Preview ready. The ASP.NET .cshtml version saves this with C# on a server.";
        }
    });
});

updateBookState();
