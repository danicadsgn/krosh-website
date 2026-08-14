const modelButtons = document.querySelectorAll(".scarf-model");
const galleryImages = document.querySelectorAll(".scarves-gallery-track img");

modelButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Ukloni selekciju sa prethodnog modela
        modelButtons.forEach((btn) => {
            btn.classList.remove("is-selected");
        });

        // Selektuj kliknuti model
        button.classList.add("is-selected");
        selectedModel = button.dataset.model;
updateScarfSelection();

        // Pronađi odgovarajuću veliku fotografiju
        const slideNumber = Number(button.dataset.slide);
        const targetImage = galleryImages[slideNumber - 1];

        // Horizontalno pomeri galeriju do te fotografije
        if (targetImage) {
            targetImage.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }
    });
});

const colorButtons = document.querySelectorAll(".scarf-color");
const selectedColorName = document.querySelector(".selected-color-name");

colorButtons.forEach((button) => {
    button.addEventListener("click", () => {

        colorButtons.forEach((btn) => {
            btn.classList.remove("is-selected");
        });

        button.classList.add("is-selected");
        selectedColor = button.dataset.color;
updateScarfSelection();

        selectedColorName.textContent = button.dataset.color;
    });
});

const tieButtons = document.querySelectorAll(".scarf-tie");

tieButtons.forEach((button) => {
    button.addEventListener("click", () => {

        tieButtons.forEach((btn) => {
            btn.classList.remove("is-selected");
        });

        button.classList.add("is-selected");
        selectedTie = button.dataset.tie;
updateScarfSelection();
    });
});

const selectionSummary = document.querySelector(".scarves-selection-summary");
const orderButton = document.querySelector(".scarves-order-button");

let selectedModel = null;
let selectedColor = null;
let selectedTie = null;

function updateScarfSelection() {
    if (selectedModel && selectedColor && selectedTie) {
        selectionSummary.textContent =
            `Model ${selectedModel} – ${selectedColor} – ${selectedTie}`;

        orderButton.disabled = false;
    } else {
        selectionSummary.textContent =
            "Izaberi model, boju i dužinu trakica";

        orderButton.disabled = true;
    }
}

orderButton.addEventListener("click", async () => {
    if (!selectedModel || !selectedColor || !selectedTie) return;

    const orderText =
        `KROSH marama — Model ${selectedModel} / ${selectedColor} / ${selectedTie}`;

    try {
        await navigator.clipboard.writeText(orderText);

        orderButton.textContent = "Kombinacija je kopirana <3";

        setTimeout(() => {
            window.open(
                "https://www.instagram.com/krosh.rs/",
                "_blank"
            );

            orderButton.textContent = "Naruči svoju maramu";
        }, 700);

    } catch (error) {
        console.error("Kombinacija nije mogla da se kopira:", error);
    }
});

const scarfFaqItems = document.querySelectorAll(".faq-item");

scarfFaqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        scarfFaqItems.forEach((otherItem) => {
            otherItem.classList.remove("active");

            const otherQuestion =
                otherItem.querySelector(".faq-question");

            otherQuestion.setAttribute(
                "aria-expanded",
                "false"
            );
        });

        if (!isOpen) {
            item.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });
});

const menuButton = document.querySelector(".menu-button");
const menuClose = document.querySelector(".menu-close");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && menuClose && mobileMenu) {

    function openMenu() {
        mobileMenu.classList.add("is-open");
        mobileMenu.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }

    menuButton.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
}

/* =========================
   SCARVES GALLERY — DESKTOP
========================= */

const scarvesGallery = document.querySelector(".scarves-gallery-track");
const scarvesLeftArrow = document.querySelector(".scarves-gallery-arrow-left");
const scarvesRightArrow = document.querySelector(".scarves-gallery-arrow-right");

if (scarvesGallery && scarvesLeftArrow && scarvesRightArrow) {

    function updateScarvesArrows() {
        const atStart = scarvesGallery.scrollLeft <= 2;

        const atEnd =
            scarvesGallery.scrollLeft + scarvesGallery.clientWidth >=
            scarvesGallery.scrollWidth - 2;

        scarvesLeftArrow.classList.toggle("hidden", atStart);
        scarvesRightArrow.classList.toggle("hidden", atEnd);
    }

    function getScarvesStep() {
        const firstImage = scarvesGallery.querySelector("img");

        if (!firstImage) return 0;

        const gap = parseFloat(
            getComputedStyle(scarvesGallery).gap
        ) || 0;

        return firstImage.getBoundingClientRect().width + gap;
    }

    scarvesRightArrow.addEventListener("click", () => {
        scarvesGallery.scrollBy({
            left: getScarvesStep(),
            behavior: "smooth"
        });
    });

    scarvesLeftArrow.addEventListener("click", () => {
        scarvesGallery.scrollBy({
            left: -getScarvesStep(),
            behavior: "smooth"
        });
    });


    /* DRAG WITH MOUSE */

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    scarvesGallery.addEventListener("mousedown", (e) => {
        isDragging = true;
        scarvesGallery.classList.add("dragging");

        startX = e.pageX;
        startScrollLeft = scarvesGallery.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        scarvesGallery.classList.remove("dragging");
    });

    scarvesGallery.addEventListener("mouseleave", () => {
        isDragging = false;
        scarvesGallery.classList.remove("dragging");
    });

    scarvesGallery.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const walk = e.pageX - startX;

        scarvesGallery.scrollLeft =
            startScrollLeft - walk;
    });

    scarvesGallery.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });


    /* ARROWS */

    scarvesGallery.addEventListener(
        "scroll",
        updateScarvesArrows
    );

    updateScarvesArrows();
}

/* =========================
   SCARF COLORS — DRAG SCROLL
========================= */

const scarfColorsRow = document.querySelector(".scarves-color-options");
const scarfColorsWrapper = document.querySelector(".scarves-colors-wrapper");

if (scarfColorsRow) {

    function updateScarfColorsFade() {
        if (!scarfColorsWrapper) return;

        const atEnd =
            scarfColorsRow.scrollLeft + scarfColorsRow.clientWidth >=
            scarfColorsRow.scrollWidth - 2;

        scarfColorsWrapper.classList.toggle("at-end", atEnd);
    }

    let isDraggingColors = false;
    let hasDraggedColors = false;
    let colorsStartX = 0;
    let colorsStartScrollLeft = 0;

    scarfColorsRow.addEventListener("mousedown", (e) => {
        isDraggingColors = true;
        hasDraggedColors = false;

        colorsStartX = e.pageX;
        colorsStartScrollLeft = scarfColorsRow.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDraggingColors = false;
        scarfColorsRow.classList.remove("dragging");
    });

    scarfColorsRow.addEventListener("mouseleave", () => {
        isDraggingColors = false;
        scarfColorsRow.classList.remove("dragging");
    });

    scarfColorsRow.addEventListener("mousemove", (e) => {
        if (!isDraggingColors) return;

        const walk = e.pageX - colorsStartX;

        if (!hasDraggedColors && Math.abs(walk) > 5) {
            hasDraggedColors = true;
            scarfColorsRow.classList.add("dragging");
        }

        if (!hasDraggedColors) return;

        e.preventDefault();

        scarfColorsRow.scrollLeft =
            colorsStartScrollLeft - walk;
    });

    scarfColorsRow.addEventListener("click", (e) => {
        if (hasDraggedColors) {
            e.stopPropagation();
            e.preventDefault();
            hasDraggedColors = false;
        }
    }, true);

    scarfColorsRow.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    scarfColorsRow.addEventListener("scroll", updateScarfColorsFade);

    updateScarfColorsFade();
}