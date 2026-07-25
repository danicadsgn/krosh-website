const bagOptionsContainer = document.querySelector("#bag-options");
const selectedBagLabel = document.querySelector("#selected-bag-label");
const pouchOptionsContainer = document.querySelector("#pouch-options");
const combinationImage = document.querySelector("#combination-image");

let selectedBag = "pink";
let selectedPouch = "fruit";

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
    button.setAttribute("aria-label", bag.label);

    if (bag.id === selectedBag) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selectedBag = bag.id;
      selectedBagLabel.textContent = bag.label;

      renderBagOptions();

      const selectedButton =
        bagOptionsContainer.querySelector(".color-option.selected");

      selectedButton.classList.add("pop");

      updateCombinationImage();
    });

    bagOptionsContainer.appendChild(button);
  });
}

function renderPouchOptions() {
  pouchOptionsContainer.innerHTML = "";

  pouches.forEach((pouch) => {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("pouch-option");

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

      selectedButton.classList.add("pop");

      updateCombinationImage();
    });

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