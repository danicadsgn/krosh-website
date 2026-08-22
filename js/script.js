const bagOptionsContainer = document.querySelector("#bag-options");
const selectedBagLabel = document.querySelector("#selected-bag-label");
const pouchOptionsContainer = document.querySelector("#pouch-options");
const combinationImage = document.querySelector("#combination-image");

let selectedBag = "peach";
let selectedPouch = "redplaid";

function getFirstAvailableItem(items) {
  return items.find((item) => !item.soldOut);
}

const initialBag = bags.find((bag) => bag.id === selectedBag);
const initialPouch = pouches.find((pouch) => pouch.id === selectedPouch);

if (!initialBag || initialBag.soldOut) {
  const firstAvailableBag = getFirstAvailableItem(bags);

  if (firstAvailableBag) {
    selectedBag = firstAvailableBag.id;
  }
}

if (!initialPouch || initialPouch.soldOut) {
  const firstAvailablePouch = getFirstAvailableItem(pouches);

  if (firstAvailablePouch) {
    selectedPouch = firstAvailablePouch.id;
  }
}

// preload svih kombinacija
for (const bag of bags) {
  for (const pouch of pouches) {
    const img = new Image();
    img.src = `images/combinations/bag-${bag.id}_pouch-${pouch.id}.webp`;
  }
}

function updateCombinationImage() {
  combinationImage.src =
    `images/combinations/bag-${selectedBag}_pouch-${selectedPouch}.webp`;
}

function renderBagOptions() {
  bagOptionsContainer.innerHTML = "";

  bags.forEach((bag) => {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("color-option");
    button.style.backgroundColor = bag.color;

    if (bag.soldOut) {
      button.classList.add("sold-out");
      button.setAttribute(
        "aria-label",
        `${bag.label} — rasprodato`
      );
      button.title = "Rasprodato";
    } else {
      button.setAttribute("aria-label", bag.label);
    }

    if (bag.id === selectedBag) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {

      selectedBag = bag.id;
      selectedBagLabel.textContent = bag.label;

      renderBagOptions();

      const selectedButton =
        bagOptionsContainer.querySelector(".color-option.selected");

      if (selectedButton) {
        selectedButton.classList.add("pop");
      }

      updateCombinationImage();
    });

    if (bag.soldOut) {
      const soldLabel = document.createElement("span");
      soldLabel.className = "sold-label";
      soldLabel.textContent = "Sold";
      button.appendChild(soldLabel);
    }

    bagOptionsContainer.appendChild(button);
  });
}

function renderPouchOptions() {
  pouchOptionsContainer.innerHTML = "";

  pouches.forEach((pouch) => {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("pouch-option");

    if (pouch.soldOut) {
      button.classList.add("sold-out");
      button.setAttribute("aria-label", "Vrećica — rasprodato");
      button.title = "Rasprodato";
    }

    if (pouch.id === selectedPouch) {
      button.classList.add("selected");
    }

    const image = document.createElement("img");
    image.src = pouch.image;
    image.alt = "";
    image.draggable = false;

    button.appendChild(image);

    button.addEventListener("click", () => {

      selectedPouch = pouch.id;

      renderPouchOptions();

      const selectedButton =
        pouchOptionsContainer.querySelector(".pouch-option.selected");

      if (selectedButton) {
        selectedButton.classList.add("pop");
      }

      updateCombinationImage();
    });

    if (pouch.soldOut) {
      const soldLabel = document.createElement("span");
      soldLabel.className = "sold-label";
      soldLabel.textContent = "Sold";
      button.appendChild(soldLabel);
    }

    pouchOptionsContainer.appendChild(button);
  });
}

selectedBagLabel.textContent =
  bags.find((bag) => bag.id === selectedBag).label;

renderBagOptions();
renderPouchOptions();
updateCombinationImage();

function setupFade(wrapperSelector, rowSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  const row = document.querySelector(rowSelector);

  function updateFade() {
    const atEnd =
      row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;

    wrapper.classList.toggle("at-end", atEnd);
  }

  row.addEventListener("scroll", updateFade);

  updateFade();
}

setupFade("#bag-wrapper", "#bag-options");
setupFade("#pouch-wrapper", "#pouch-options");

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

function trackInstagramClick() {
    gtag('event', 'instagram_click', {
        event_category: 'engagement',
        event_label: 'Rezervisi svoju kombinaciju'
    });
}

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