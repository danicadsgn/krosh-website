const bags = [
  { id: "peach", color: "#D99E9C", label: "Peach", soldOut: false },
  { id: "butteryellow", color: "#FFFBC5", label: "Butter Yellow", soldOut: false },
  { id: "royalblue", color: "#0043C0", label: "Royal Blue", soldOut: true },
  { id: "black", color: "#101010", label: "Black", soldOut: false },
  { id: "green", color: "#049F6E", label: "Green", soldOut: false },
  { id: "jeans", color: "#4A66A3", label: "Jeans", soldOut: true },
  { id: "pink", color: "#FE7BE2", label: "Pink", soldOut: false },
  { id: "pearlwhite", color: "#F8F3EC", label: "Pearl White", soldOut: false },
  { id: "navy", color: "#2F3955", label: "Navy", soldOut: false },
  { id: "red", color: "#C80C35", label: "Red", soldOut: true },
  { id: "beige", color: "#F5E3D1", label: "Beige", soldOut: false },
  { id: "olive", color: "#96B3A5", label: "Olive", soldOut: true },
  { id: "blue", color: "#357EDE", label: "Blue", soldOut: false },
  { id: "maroon", color: "#6C3334", label: "Maroon", soldOut: false },
  { id: "truewhite", color: "#EEF5F8", label: "True White", soldOut: false },
  { id: "purple", color: "#7C52C9", label: "Purple", soldOut: false },
  { id: "terracotta", color: "#C24037", label: "Terracotta", soldOut: true }
];

const pouches = [
  { id: "blueplaid", image: "images/pouches/blueplaid.webp", soldOut: false },
  { id: "pink", image: "images/pouches/pink.webp", soldOut: false },
  { id: "garden", image: "images/pouches/garden.webp", soldOut: false },
  { id: "silverfloral", image: "images/pouches/silverfloral.webp", soldOut: false },
  { id: "blackwhite", image: "images/pouches/blackwhite.webp", soldOut: false },
  { id: "orangeplaid", image: "images/pouches/orangeplaid.webp", soldOut: false },
  { id: "bluefloral", image: "images/pouches/bluefloral.webp", soldOut: false },
  { id: "pastel", image: "images/pouches/pastel.webp", soldOut: true },
  { id: "yellow", image: "images/pouches/yellow.webp", soldOut: false },
  { id: "cars", image: "images/pouches/cars.webp", soldOut: false },
  { id: "redplaid", image: "images/pouches/redplaid.webp", soldOut: true },
  { id: "beigestripes", image: "images/pouches/beigestripes.webp", soldOut: false },
  { id: "darkplaid", image: "images/pouches/darkplaid.webp", soldOut: true },
  { id: "lightblueplaid", image: "images/pouches/lightblueplaid.webp", soldOut: false },
  { id: "lines", image: "images/pouches/lines.webp", soldOut: true }
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
  { id: "mini11", label: "", image: "images/mini-torbe/bags/mini11.webp", swatch: "images/mini-torbe/swatches/mini11.webp", width: 20, height: 18, soldOut: false },
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
