export const site = {
  mark: "AH",
  name: "Ameer Hosein",
  title: "AH | Ameer Hosein",
  description:
    "Ameer Hosein is a photographer, photography lecturer, and content creator in Trinidad and Tobago. Study The Fundamentals of Photography in Chaguanas, book a shoot, or shop AH.",
  tagline: "Photographer | Content Creator | Leader",
  signOff: "Love & Light, AH",
  phoneDisplay: "+1 (868) 345-5632",
  phoneTel: "+18683455632",
  whatsappNumber: "18683455632",
  location: {
    name: "Plaza De Montrose",
    area: "Chaguanas",
    country: "Trinidad and Tobago",
    mapQuery: "Plaza De Montrose, Chaguanas, Trinidad and Tobago",
  },
  socials: [
    {
      label: "Instagram",
      handle: "@ameerhoseintt",
      href: "https://instagram.com/ameerhoseintt",
    },
    {
      label: "Facebook",
      handle: "/ameerhoseintt",
      href: "https://facebook.com/ameerhoseintt",
    },
    {
      label: "Weddings & family",
      handle: "@ameerhoseinphotography",
      href: "https://instagram.com/ameerhoseinphotography",
    },
    {
      label: "Fujifilm",
      handle: "@ameer.fujix",
      href: "https://instagram.com/ameer.fujix",
    },
  ],
  nav: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/courses/fundamentals", label: "FOP" },
    { href: "/courses/pro", label: "Pro Class" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ],
  footer: [
    { href: "/testimonials", label: "Testimonials" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/courses/fundamentals", label: "Photography classes" },
    { href: "/shop", label: "AH Store" },
  ],
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}
