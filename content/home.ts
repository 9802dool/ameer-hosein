export const home = {
  hero: {
    image: "/images/hero.jpg",
    imageAlt: "Placeholder for a full-bleed portrait or film still of Ameer Hosein.",
    video: "",
    tagline: "Photographer | Content Creator | Leader",
    primaryCta: { label: "Join the Next Class", href: "/courses/fundamentals#enrol" },
    secondaryCta: { label: "Book a Shoot", href: "/contact?subject=Photoshoot" },
  },
  intro: {
    image: "/images/intro.jpg",
    imageAlt: "Placeholder portrait of Ameer Hosein.",
    heading: "Pictures with a point of view.",
    paragraphs: [
      "I make photographs, I teach them, and I put the work where people can actually see it. Based in Trinidad and Tobago, I shoot, lecture, and build The Fundamentals of Photography for anyone ready to take the craft seriously.",
      "The red suit is the mark. The pictures are the point. If you want a class, a sitting, or a collaboration, you are in the right place.",
    ],
  },
  stats: [
    { value: "16K+", label: "Instagram followers" },
    { value: "628+", label: "posts" },
    { value: "FOP", label: "graduates" },
  ],
  closing: {
    heading: "Tell me what you want to make.",
    text: "A class seat, a portrait, a wedding, or a brand story. Send a note, or message me on WhatsApp and start with the pictures.",
  },
} as const;
