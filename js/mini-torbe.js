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
   MINI TORBE — IZBOR BOJE
========================= */

const miniSection = document.querySelector(".mini-configurator");
const miniOptions = document.querySelector("#mini-options");
const miniImage = document.querySelector("#mini-image");
const miniLoader = document.querySelector("#preview-loader");
const miniLabel = document.querySelector("#mini-selected-label");
const miniPrice = document.querySelector("#mini-price");
const miniSize = document.querySelector("#mini-size");
const miniOrder = document.querySelector("#mini-order");
const miniReserve = document.querySelector("#mini-reserve");

let selectedMini = null;

miniImage.addEventListener("load", () => {
    miniLoader.classList.add("is-hidden");
});

function getSelectedMiniBag() {
    return miniBags.find((bag) => bag.id === selectedMini);
}

function updateMiniDetails() {
    const bag = getSelectedMiniBag();

    miniLabel.textContent = bag.label || "";
    miniLabel.hidden = !bag.label;

    miniPrice.textContent = bag.soldOut ? "Prodato" : `${miniBagPrice} RSD`;

    miniSize.textContent =
        bag.width && bag.height ? `${bag.width} × ${bag.height} cm` : "";

    miniOrder.hidden = !!bag.soldOut;
}

function updateMiniImage() {
    const bag = getSelectedMiniBag();

    if (miniImage.getAttribute("src") === bag.image) {
        if (miniImage.complete) {
            miniLoader.classList.add("is-hidden");
        }
        return;
    }

    miniLoader.classList.remove("is-hidden");
    miniImage.src = bag.image;

    if (miniImage.complete) {
        miniLoader.classList.add("is-hidden");
    }
}

function renderMiniOptions() {
    miniOptions.innerHTML = "";

    miniBags.forEach((bag) => {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("pouch-option", "mini-option");

        const name = bag.label || `Mini torba ${bag.id}`;
        button.setAttribute("aria-label", bag.soldOut ? `${name} — prodato` : name);

        if (bag.soldOut) {
            button.classList.add("sold-out");
            button.title = "Prodato";
        }

        if (bag.id === selectedMini) {
            button.classList.add("selected");
        }

        const image = document.createElement("img");
        image.src = bag.swatch;
        image.alt = "";
        image.draggable = false;
        button.appendChild(image);

        button.addEventListener("click", () => {
            selectedMini = bag.id;

            renderMiniOptions();

            const selectedButton = miniOptions.querySelector(".mini-option.selected");

            if (selectedButton) {
                selectedButton.classList.add("pop");
            }

            updateMiniDetails();
            updateMiniImage();
        });

        if (bag.soldOut) {
            const soldLabel = document.createElement("span");
            soldLabel.className = "sold-label";
            soldLabel.textContent = "Sold";
            button.appendChild(soldLabel);
        }

        miniOptions.appendChild(button);
    });
}

if (miniBags.length === 0) {
    miniSection.hidden = true;
} else {
    const firstAvailable = miniBags.find((bag) => !bag.soldOut) || miniBags[0];
    selectedMini = firstAvailable.id;

    renderMiniOptions();
    updateMiniDetails();
    updateMiniImage();

    window.addEventListener("load", () => {
        setTimeout(() => {
            miniBags.forEach((bag) => {
                const img = new Image();
                img.src = bag.image;
            });
        }, 600);
    });

    const miniFade = document.querySelector("#mini-wrapper");

    function updateMiniFade() {
        const atEnd =
            miniOptions.scrollLeft + miniOptions.clientWidth >= miniOptions.scrollWidth - 2;

        miniFade.classList.toggle("at-end", atEnd);
    }

    miniOptions.addEventListener("scroll", updateMiniFade);
    updateMiniFade();
}

miniReserve.addEventListener("click", () => {
    if (typeof gtag === "function") {
        gtag("event", "instagram_click", {
            event_category: "engagement",
            event_label: "Mini torba rezervacija"
        });
    }
});


const miniInfoLink = document.querySelector(".mini-info-link");

if (miniInfoLink) {
    miniInfoLink.addEventListener("click", (e) => {
        e.preventDefault();

        const faqSection = document.querySelector("#faq");

        if (faqSection) {
            faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}


/* =========================
   U AKCIJI — RENDER
========================= */

const miniLifestyleSection = document.querySelector("#mini-lifestyle");

if (miniLifestyle.length > 0) {
    const galleryEl = miniLifestyleSection.querySelector(".lifestyle-gallery");
    const trackEl = document.querySelector("#lightbox-track");

    miniLifestyle.forEach((item) => {
        const thumb = document.createElement("div");
        thumb.className = "lifestyle-item";

        const thumbImg = document.createElement("img");
        thumbImg.src = item.src;
        thumbImg.alt = "KROSH mini torba u svakodnevnom nošenju";
        thumb.appendChild(thumbImg);

        const slide = document.createElement("div");
        slide.className = "lightbox-slide";

        const slideImg = document.createElement("img");
        slideImg.src = item.src;
        slideImg.alt = "KROSH mini torba u svakodnevnom nošenju";
        slide.appendChild(slideImg);

        galleryEl.appendChild(thumb);
        trackEl.appendChild(slide);
    });

    const creditEl = document.querySelector("#mini-lifestyle-credit");

    if (creditEl && typeof miniLifestyleCredit !== "undefined") {
        creditEl.append("Photos by: ");

        const creditLink = document.createElement("a");
        creditLink.href = miniLifestyleCredit.url;
        creditLink.target = "_blank";
        creditLink.rel = "noopener noreferrer";
        creditLink.textContent = miniLifestyleCredit.name;
        creditEl.appendChild(creditLink);

        creditEl.hidden = false;
    }

    miniLifestyleSection.hidden = false;
}


/* =========================
   FAQ
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


/* =========================
   U AKCIJI — GALERIJA I LIGHTBOX
========================= */

const lifestyleGallery = document.querySelector(".lifestyle-gallery");
const leftArrow = document.querySelector(".lifestyle-arrow-left");
const rightArrow = document.querySelector(".lifestyle-arrow-right");

if (lifestyleGallery && leftArrow && rightArrow) {

    function updateArrows() {
        const atStart = lifestyleGallery.scrollLeft <= 2;
        const atEnd =
            lifestyleGallery.scrollLeft + lifestyleGallery.clientWidth >=
            lifestyleGallery.scrollWidth - 2;

        leftArrow.classList.toggle("hidden", atStart);
        rightArrow.classList.toggle("hidden", atEnd);
    }

    function getStep() {
        const firstImage = lifestyleGallery.querySelector("img");

        if (!firstImage) return 0;

        return firstImage.getBoundingClientRect().width + 6;
    }

    rightArrow.addEventListener("click", () => {
        lifestyleGallery.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });
    });

    leftArrow.addEventListener("click", () => {
        lifestyleGallery.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    });

    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startScrollLeft = 0;

    lifestyleGallery.addEventListener("mousedown", (e) => {
        isDragging = true;
        hasDragged = false;

        startX = e.pageX;
        startScrollLeft = lifestyleGallery.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        lifestyleGallery.classList.remove("dragging");
    });

    lifestyleGallery.addEventListener("mouseleave", () => {
        isDragging = false;
        lifestyleGallery.classList.remove("dragging");
    });

    lifestyleGallery.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const walk = e.pageX - startX;

        if (!hasDragged && Math.abs(walk) > 5) {
            hasDragged = true;
            lifestyleGallery.classList.add("dragging");
        }

        if (!hasDragged) return;

        e.preventDefault();

        lifestyleGallery.scrollLeft = startScrollLeft - walk;
    });

    lifestyleGallery.addEventListener("click", (e) => {
        if (hasDragged) {
            e.stopPropagation();
            e.preventDefault();
            hasDragged = false;
        }
    }, true);

    lifestyleGallery.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    lifestyleGallery.addEventListener("scroll", updateArrows);

    updateArrows();
}

const lightbox = document.getElementById("lightbox");
const lightboxTrack = document.getElementById("lightbox-track");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxTrack) {

    const lifestyleImages = document.querySelectorAll(".lifestyle-gallery img");
    const lightboxSlides = lightboxTrack.querySelectorAll(".lightbox-slide");
    const lightboxCredits = lightboxTrack.querySelectorAll(".lightbox-credit a");

    function openLightbox(index) {
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const target = lightboxSlides[index];

        if (target) {
            lightboxTrack.scrollLeft = target.offsetLeft;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    lifestyleImages.forEach((image, index) => {

        image.addEventListener("click", () => {

            if (window.innerWidth >= 992) return;

            openLightbox(index);
        });

    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxTrack.addEventListener("click", closeLightbox);

    lightboxCredits.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });

}
