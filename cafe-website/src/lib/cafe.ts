/**
 * ============================================================
 *  CAFE DETAILS — EDIT EVERYTHING HERE
 *  Change the values below and the whole website updates.
 * ============================================================
 */
import hero from "@/assets/hero.jpg";
import coffee from "@/assets/coffee.jpg";
import coldbrew from "@/assets/coldbrew.jpg";
import dessert from "@/assets/dessert.jpg";

export const CAFE = {
  name: "Ember & Oak Café",
  city: "Your City",
  tagline: "Slow-roasted coffee, warm corners, good company.",
  phone: "+91 98765 43210", // shown on the site
  phoneDigits: "919876543210", // digits only, with country code (for WhatsApp/call links)
  email: "hello@emberandoak.cafe",
  address: "12 Garden Lane, Your City 400001",
  instagram: "https://instagram.com/yourcafe",
  googleReviewsUrl: "https://maps.google.com/?q=cafe",
  // Map: replace the search text with your exact address
  mapEmbed: "https://www.google.com/maps?q=12+Garden+Lane&output=embed",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=12+Garden+Lane",
  menuPdf: "/menu.pdf", // upload your PDF to the /public folder with this name
  whatsappMessage: "Hi! I'd like to place an order.",
  hours: [
    { days: "Mon – Fri", time: "7:30 AM – 10:00 PM" },
    { days: "Saturday", time: "8:00 AM – 11:00 PM" },
    { days: "Sunday", time: "8:00 AM – 9:00 PM" },
  ],
};

/** Builds a WhatsApp link with a prefilled message */
export const whatsappLink = (msg: string = CAFE.whatsappMessage) =>
  `https://wa.me/${CAFE.phoneDigits}?text=${encodeURIComponent(msg)}`;

/** Photos — swap these imports in the lines above to use your own */
export const IMAGES = { hero, coffee, coldbrew, dessert };

export type Tag = "Bestseller" | "Veg" | "New";
export type MenuItem = { name: string; desc: string; price: string; tags?: Tag[]; image?: string };

/** MENU — add, remove or edit items in each category */
export const MENU: Record<string, MenuItem[]> = {
  Coffee: [
    { name: "Signature Cappuccino", desc: "Double shot, velvety milk, house blend.", price: "₹180", tags: ["Bestseller", "Veg"], image: coffee },
    { name: "Flat White", desc: "Ristretto with silky microfoam.", price: "₹190", tags: ["Veg"] },
    { name: "Hazelnut Latte", desc: "Roasted hazelnut syrup, espresso, milk.", price: "₹210", tags: ["Veg"] },
    { name: "Pour Over", desc: "Single-origin, brewed by hand.", price: "₹220", tags: ["New", "Veg"] },
  ],
  "Cold Drinks": [
    { name: "18-Hour Cold Brew", desc: "Smooth, low-acid, served over ice.", price: "₹200", tags: ["Bestseller", "Veg"], image: coldbrew },
    { name: "Iced Mocha", desc: "Dark chocolate, espresso, cold milk.", price: "₹220", tags: ["Veg"] },
    { name: "Mint Lemon Cooler", desc: "Fresh mint, lime, soda.", price: "₹150", tags: ["Veg"] },
  ],
  Snacks: [
    { name: "Butter Croissant", desc: "Flaky, baked fresh every morning.", price: "₹140", tags: ["Veg"] },
    { name: "Pesto Grilled Sandwich", desc: "Basil pesto, mozzarella, tomato.", price: "₹240", tags: ["Veg", "New"] },
    { name: "Chicken Panini", desc: "Herbed chicken, peppers, cheddar.", price: "₹280" },
  ],
  Desserts: [
    { name: "Dark Chocolate Cake", desc: "Three layers of rich ganache.", price: "₹220", tags: ["Bestseller", "Veg"], image: dessert },
    { name: "Basque Cheesecake", desc: "Burnt top, creamy centre.", price: "₹240", tags: ["Veg"] },
    { name: "Cinnamon Roll", desc: "Warm, gooey, cream-cheese glaze.", price: "₹160", tags: ["New", "Veg"] },
  ],
};

/** Featured on the Home page */
export const SIGNATURES: MenuItem[] = [MENU["Coffee"]![0]!, MENU["Cold Drinks"]![0]!, MENU["Desserts"]![0]!];

export const REVIEWS = [
  { name: "Priya S.", stars: 5, text: "The cappuccino is the best in town and the corner sofa is my new office." },
  { name: "Arjun M.", stars: 5, text: "Warm staff, quiet music, fast Wi-Fi. Their cold brew is unreal." },
  { name: "Neha K.", stars: 4, text: "Lovely weekend spot. The chocolate cake alone is worth the trip." },
];

/** Gallery photos on the About page */
export const GALLERY = [
  { src: hero, alt: "Cafe interior with wooden tables and plants" },
  { src: coffee, alt: "Cappuccino with latte art" },
  { src: coldbrew, alt: "Iced cold brew by the window" },
  { src: dessert, alt: "Chocolate cake and croissant" },
  { src: hero, alt: "Sunlit seating area" },
  { src: coffee, alt: "Coffee on a rustic table" },
];

/** Local business schema for search engines ("cafe near me") */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: CAFE.name,
  telephone: CAFE.phone,
  email: CAFE.email,
  address: { "@type": "PostalAddress", streetAddress: CAFE.address, addressLocality: CAFE.city },
  servesCuisine: "Coffee, Cafe",
  priceRange: "₹₹",
  sameAs: [CAFE.instagram],
};
