/* =========================
   MOBILE MENU
========================= */

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
   CHARM COLORS + ORDER
========================= */

const charmColors = document.querySelectorAll(".charm-color");

const selectedCharmColorName = document.querySelector(
    ".selected-charm-color-name"
);

const charmSelectionSummary = document.querySelector(
    ".charms-selection-summary"
);

const charmOrderButton = document.querySelector(
    ".charms-order-button"
);

let selectedCharmColor = null;


charmColors.forEach((color) => {

    color.addEventListener("click", () => {

        charmColors.forEach((item) => {
            item.classList.remove("is-selected");
        });

        color.classList.add("is-selected");

        selectedCharmColor = color.dataset.color;

        if (selectedCharmColorName) {
            selectedCharmColorName.textContent =
                selectedCharmColor;
        }

        if (charmSelectionSummary) {
            charmSelectionSummary.textContent =
                `Cvetiša - ${selectedCharmColor}`;
        }

        if (charmOrderButton) {
            charmOrderButton.disabled = false;
        }

    });

});


/* =========================
   ORDER BUTTON
========================= */

if (charmOrderButton) {

    charmOrderButton.addEventListener("click", async () => {

        if (!selectedCharmColor) return;

        const orderText =
            `KROSH Cvetiša — ${selectedCharmColor}`;

        try {

            await navigator.clipboard.writeText(orderText);

            charmOrderButton.textContent =
                "Izbor je kopiran <3";

            setTimeout(() => {

                window.open(
                    "https://www.instagram.com/krosh.rs/",
                    "_blank"
                );

                charmOrderButton.textContent =
                    "Naruči svog Cvetišu";

            }, 700);

        } catch (error) {

            console.error(
                "Izbor nije mogao da se kopira:",
                error
            );

        }

    });

}


/* =========================
   CHARMS GALLERY — DESKTOP
========================= */

const charmsGallery = document.querySelector(".charms-gallery-track");
const charmsLeftArrow = document.querySelector(".charms-gallery-arrow-left");
const charmsRightArrow = document.querySelector(".charms-gallery-arrow-right");

if (charmsGallery && charmsLeftArrow && charmsRightArrow) {

    function updateCharmsArrows() {
        const atStart = charmsGallery.scrollLeft <= 2;

        const atEnd =
            charmsGallery.scrollLeft + charmsGallery.clientWidth >=
            charmsGallery.scrollWidth - 2;

        charmsLeftArrow.classList.toggle("hidden", atStart);
        charmsRightArrow.classList.toggle("hidden", atEnd);
    }

    function getCharmsStep() {
        const firstImage = charmsGallery.querySelector("img");

        if (!firstImage) return 0;

        const gap = parseFloat(
            getComputedStyle(charmsGallery).gap
        ) || 0;

        return firstImage.getBoundingClientRect().width + gap;
    }

    charmsRightArrow.addEventListener("click", () => {
        charmsGallery.scrollBy({
            left: getCharmsStep(),
            behavior: "smooth"
        });
    });

    charmsLeftArrow.addEventListener("click", () => {
        charmsGallery.scrollBy({
            left: -getCharmsStep(),
            behavior: "smooth"
        });
    });


    /* DRAG WITH MOUSE */

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    charmsGallery.addEventListener("mousedown", (e) => {
        isDragging = true;
        charmsGallery.classList.add("dragging");

        startX = e.pageX;
        startScrollLeft = charmsGallery.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        charmsGallery.classList.remove("dragging");
    });

    charmsGallery.addEventListener("mouseleave", () => {
        isDragging = false;
        charmsGallery.classList.remove("dragging");
    });

    charmsGallery.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const walk = e.pageX - startX;

        charmsGallery.scrollLeft =
            startScrollLeft - walk;
    });

    charmsGallery.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });


    /* ARROWS */

    charmsGallery.addEventListener(
        "scroll",
        updateCharmsArrows
    );

    updateCharmsArrows();
}


/* =========================
   CHARM COLORS — DRAG SCROLL
========================= */

const charmColorsRow = document.querySelector(".charms-color-options");
const charmColorsWrapper = document.querySelector(".charms-colors-wrapper");

if (charmColorsRow) {

    function updateCharmColorsFade() {
        if (!charmColorsWrapper) return;

        const atEnd =
            charmColorsRow.scrollLeft + charmColorsRow.clientWidth >=
            charmColorsRow.scrollWidth - 2;

        charmColorsWrapper.classList.toggle("at-end", atEnd);
    }

    let isDraggingColors = false;
    let hasDraggedColors = false;
    let colorsStartX = 0;
    let colorsStartScrollLeft = 0;

    charmColorsRow.addEventListener("mousedown", (e) => {
        isDraggingColors = true;
        hasDraggedColors = false;

        colorsStartX = e.pageX;
        colorsStartScrollLeft = charmColorsRow.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDraggingColors = false;
        charmColorsRow.classList.remove("dragging");
    });

    charmColorsRow.addEventListener("mouseleave", () => {
        isDraggingColors = false;
        charmColorsRow.classList.remove("dragging");
    });

    charmColorsRow.addEventListener("mousemove", (e) => {
        if (!isDraggingColors) return;

        const walk = e.pageX - colorsStartX;

        if (!hasDraggedColors && Math.abs(walk) > 5) {
            hasDraggedColors = true;
            charmColorsRow.classList.add("dragging");
        }

        if (!hasDraggedColors) return;

        e.preventDefault();

        charmColorsRow.scrollLeft =
            colorsStartScrollLeft - walk;
    });

    charmColorsRow.addEventListener("click", (e) => {
        if (hasDraggedColors) {
            e.stopPropagation();
            e.preventDefault();
            hasDraggedColors = false;
        }
    }, true);

    charmColorsRow.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    charmColorsRow.addEventListener("scroll", updateCharmColorsFade);

    updateCharmColorsFade();
}