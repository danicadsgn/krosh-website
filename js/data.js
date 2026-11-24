// TREĆA KOLEKCIJA. VAŽNO: color (hex) i label su PRIVREMENI (procenjeni sa slika)
// dok ne stignu prave boje i nazivi. id mora ostati isti kao u nazivima fajlova.
const bags = [
  { id: "black", color: "#101010", label: "Black", soldOut: false },
  { id: "silver", color: "#E0E0D7", label: "Silver", swatch: "images/bag-colors/silver.png", soldOut: false },
  { id: "nude", color: "#B7A199", label: "Nude", soldOut: false },
  { id: "plum", color: "#562D49", label: "Plum", soldOut: false },
  { id: "mocha", color: "#7A6A64", label: "Mocha", swatch: "images/bag-colors/mocha.png", soldOut: false },
  { id: "darkgreen", color: "#2E5044", label: "Dark Green", soldOut: false },
  { id: "peach", color: "#DE988A", label: "Peach", soldOut: false },
  { id: "darkchocolate", color: "#382820", label: "Dark Chocolate", soldOut: false },
  { id: "yellow", color: "#FEEEB8", label: "Yellow", soldOut: false },
  { id: "maroon", color: "#56201C", label: "Maroon", soldOut: false },
  { id: "lightgrey", color: "#888888", label: "Light Grey", soldOut: false },
  { id: "forrest", color: "#243B40", label: "Forrest", soldOut: false },
  { id: "burgundy", color: "#760014", label: "Burgundy", soldOut: true },
  { id: "coffee", color: "#66391C", label: "Coffee", soldOut: false },
  { id: "white", color: "#F8F3EC", label: "White", soldOut: false },
  { id: "bronze", color: "#5E4F4C", label: "Bronze", swatch: "images/bag-colors/bronze.png", soldOut: false },
  { id: "darkgrey", color: "#2F2F32", label: "Dark Grey", soldOut: false },
  { id: "blue", color: "#357EDE", label: "Blue", soldOut: false }
];

// id mora da odgovara nazivu u images/combinations/bag-<bag>_pouch-<id>.webp
const pouches = [
  { id: "pink", image: "images/pouches/pink.webp", soldOut: false },
  { id: "blackwhite", image: "images/pouches/blackwhite.webp", soldOut: false },
  { id: "greencheck", image: "images/pouches/green.webp", soldOut: false },
  { id: "fall", image: "images/pouches/fall.webp", soldOut: false },
  { id: "beige", image: "images/pouches/beige.webp", soldOut: false },
  { id: "garden", image: "images/pouches/garden.webp", soldOut: false },
  { id: "silver", image: "images/pouches/silver.webp", soldOut: false },
  { id: "purple", image: "images/pouches/purple.webp", soldOut: false },
  { id: "gold", image: "images/pouches/gold.webp", soldOut: false },
  { id: "magenta", image: "images/pouches/magenta.webp", soldOut: false },
  { id: "redplaid", image: "images/pouches/redplaid.webp", soldOut: false },
  { id: "silverfloral", image: "images/pouches/silverfloral.webp", soldOut: false },
  { id: "black", image: "images/pouches/black.webp", soldOut: false },
  { id: "greenplaid", image: "images/pouches/greenplaid.webp", soldOut: false },
  { id: "beigestripes", image: "images/pouches/beigestripes.webp", soldOut: false },
  { id: "blueplaid", image: "images/pouches/blueplaid.webp", soldOut: false }
];

// Mini torbe — jedna cena za sve, boje su gotove slike (nema kombinacija).
// id je isto ime za sliku torbe (bags/) i kružić (swatches/).
// width/height su u cm. soldOut: true označava prodatu boju.
const miniBagPrice = 3500;

const miniBags = [
  { id: "mini1", label: "", image: "images/mini-torbe/bags/mini1.webp", swatch: "images/mini-torbe/swatches/mini1.webp", width: 20, height: 17, soldOut: false },
  { id: "mini2", label: "", image: "images/mini-torbe/bags/mini2.webp", swatch: "images/mini-torbe/swatches/mini2.webp", width: 18, height: 16, soldOut: false },
  { id: "mini3", label: "", image: "images/mini-torbe/bags/mini3.webp", swatch: "images/mini-torbe/swatches/mini3.webp", width: 20, height: 18, soldOut: false },
  { id: "mini4", label: "", image: "images/mini-torbe/bags/mini4.webp", swatch: "images/mini-torbe/swatches/mini4.webp", width: 20, height: 17, soldOut: false },
  { id: "mini5", label: "", image: "images/mini-torbe/bags/mini5.webp", swatch: "images/mini-torbe/swatches/mini5.webp", width: 19, height: 16, soldOut: false },
  { id: "mini6", label: "", image: "images/mini-torbe/bags/mini6.webp", swatch: "images/mini-torbe/swatches/mini6.webp", width: 21, height: 17, soldOut: false },
  { id: "mini7", label: "", image: "images/mini-torbe/bags/mini7.webp", swatch: "images/mini-torbe/swatches/mini7.webp", width: 22, height: 18, soldOut: false },
  { id: "mini8", label: "", image: "images/mini-torbe/bags/mini8.webp", swatch: "images/mini-torbe/swatches/mini8.webp", width: 21, height: 17, soldOut: false },
  { id: "mini9", label: "", image: "images/mini-torbe/bags/mini9.webp", swatch: "images/mini-torbe/swatches/mini9.webp", width: 18, height: 16, soldOut: false },
  { id: "mini10", label: "", image: "images/mini-torbe/bags/mini10.webp", swatch: "images/mini-torbe/swatches/mini10.webp", width: 18, height: 15, soldOut: false },
  { id: "mini11", label: "", image: "images/mini-torbe/bags/mini11.webp", swatch: "images/mini-torbe/swatches/mini11.webp", width: 20, height: 18, soldOut: true },
  { id: "mini12", label: "", image: "images/mini-torbe/bags/mini12.webp", swatch: "images/mini-torbe/swatches/mini12.webp", width: 18, height: 16, soldOut: false },
  { id: "mini13", label: "", image: "images/mini-torbe/bags/mini13.webp", swatch: "images/mini-torbe/swatches/mini13.webp", width: 19, height: 16, soldOut: false }
];

// "U akciji" fotke za mini torbe. Jedan zajednički credit ispod galerije.
const miniLifestyleCredit = { name: "@unchillscenario", url: "https://www.instagram.com/unchillscenario/" };
const miniLifestyle = [
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-1.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-2.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-3.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-4.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-5.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-6.webp" },
  { src: "images/mini-torbe/lifestyle/mini-lifestyle-7.webp" }
];
