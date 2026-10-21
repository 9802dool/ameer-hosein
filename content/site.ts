export const site = {
  mark: "AH",
  name: "Ameer Hosein",
  title: "AH | Ameer Hosein — Creator, Photographer & Merch",
  description:
    "The official hub of Ameer Hosein. Professional photography, masterclasses in Chaguanas, and the AH merch collection.",
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
    { href: "/about", label: "About" },
    { href: "/shop", label: "Merch Store" },
    { href: "/courses/fundamentals", label: "Workshops" },
    { href: "/portfolio", label: "Portfolio" },
  ],
  footer: [
    { href: "/about", label: "About Ameer" },
    { href: "/shop", label: "Merch Store" },
    { href: "/courses/fundamentals", label: "Workshops" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}
