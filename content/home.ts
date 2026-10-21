export const home = {
  hero: {
    image: "/images/hero.jpg",
    imageAlt: "Placeholder for a portrait of Ameer Hosein. Replace this file with his photograph.",
    video: "",
    eyebrow: "Trinidad & Tobago",
    heading: "Capturing Life Through",
    headingAccent: "The Lens",
    text: "Welcome to the official digital hub of Ameer Hosein. Explore professional photography, masterclasses, and the AH collection.",
    primaryCta: { label: "Explore Collection", href: "/shop" },
    secondaryCta: { label: "Instagram", href: "https://www.instagram.com/ameerhoseintt/" },
  },
  store: {
    eyebrow: "The AH Collection",
    heading: "Official Merchandise",
    text: "Streetwear from the AH mark. Prices are in Trinidad and Tobago dollars, and you can edit every piece in the product file.",
    pieces: [
      { slug: "ah-hoodie", badge: "Best Seller" },
      { slug: "ah-signature-tee" },
      { slug: "ah-cap", badge: "New Drop" },
    ],
  },
  courses: {
    eyebrow: "Learn & Grow",
    heading: "Photography Masterclasses",
    text: "Learn the camera, the light, the edit, and how the work becomes a career. Classes meet in Chaguanas.",
  },
} as const;
