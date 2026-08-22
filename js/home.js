/* =========================
   EARLY ACCESS UNLOCK
========================= */

const EARLY_ACCESS_PASSWORD = "karirano";

const unlockForm = document.querySelector("#unlock-form");
const unlockInput = document.querySelector("#unlock-password");
const unlockError = document.querySelector("#unlock-error");

if (unlockForm && unlockInput) {

    unlockForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const entered = unlockInput.value.trim().toLowerCase();
        const correct = EARLY_ACCESS_PASSWORD.trim().toLowerCase();

        if (entered === correct) {
            localStorage.setItem("krosh_unlocked", "1");
            window.location.href = "torbe.html";
        } else {
            unlockError.hidden = false;
        }
    });

    unlockInput.addEventListener("input", () => {
        unlockError.hidden = true;
    });
}


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
   INSTAGRAM GALLERY — DRAG SCROLL
========================= */

const instagramGrid = document.querySelector(".home-instagram-grid");

if (instagramGrid) {

    let isDraggingInstagram = false;
    let hasDraggedInstagram = false;
    let instagramStartX = 0;
    let instagramStartScrollLeft = 0;

    instagramGrid.addEventListener("mousedown", (e) => {
        isDraggingInstagram = true;
        hasDraggedInstagram = false;

        instagramStartX = e.pageX;
        instagramStartScrollLeft = instagramGrid.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDraggingInstagram = false;
        instagramGrid.classList.remove("dragging");
    });

    instagramGrid.addEventListener("mouseleave", () => {
        isDraggingInstagram = false;
        instagramGrid.classList.remove("dragging");
    });

    instagramGrid.addEventListener("mousemove", (e) => {
        if (!isDraggingInstagram) return;

        const walk = e.pageX - instagramStartX;

        if (!hasDraggedInstagram && Math.abs(walk) > 5) {
            hasDraggedInstagram = true;
            instagramGrid.classList.add("dragging");
        }

        if (!hasDraggedInstagram) return;

        e.preventDefault();

        instagramGrid.scrollLeft = instagramStartScrollLeft - walk;
    });

    instagramGrid.addEventListener("click", (e) => {
        if (hasDraggedInstagram) {
            e.stopPropagation();
            e.preventDefault();
            hasDraggedInstagram = false;
        }
    }, true);

    instagramGrid.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
}


/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
            otherItem.classList.remove("active");

            const otherQuestion = otherItem.querySelector(".faq-question");
            otherQuestion.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            item.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });

    question.setAttribute("aria-expanded", "false");
});
