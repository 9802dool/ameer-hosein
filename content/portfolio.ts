export const portfolioCategories = [
  { id: "portraits", label: "Portraits & Models" },
  { id: "fashion", label: "Fashion / Haute" },
  {
    id: "weddings",
    label: "Weddings & Family",
    href: "https://instagram.com/ameerhoseinphotography",
    handle: "@ameerhoseinphotography",
  },
  {
    id: "fujifilm",
    label: "Fujifilm",
    href: "https://instagram.com/ameer.fujix",
    handle: "@ameer.fujix",
  },
  { id: "travel", label: "Travel" },
  { id: "published", label: "Published Work" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]["id"];

export type PortfolioImage = {
  src: string;
  alt: string;
  category: PortfolioCategory;
  width: number;
  height: number;
};

export const portfolioImages: PortfolioImage[] = [
  {
    src: "/images/ig/ig-hero-b.jpg",
    alt: "Ameer Hosein seated in the studio.",
    category: "portraits",
    width: 3276,
    height: 4096,
  },
  {
    src: "/images/ig/ig-dining.jpg",
    alt: "Ameer Hosein at a table by the river.",
    category: "portraits",
    width: 2848,
    height: 3792,
  },
  {
    src: "/images/ig/ig-hero-a.jpg",
    alt: "Ameer Hosein walking in the studio.",
    category: "fashion",
    width: 3276,
    height: 4096,
  },
  {
    src: "/images/wedding-01.jpg",
    alt: "Placeholder wedding or family frame.",
    category: "weddings",
    width: 1500,
    height: 1000,
  },
  {
    src: "/images/fuji-01.jpg",
    alt: "Placeholder Fujifilm frame.",
    category: "fujifilm",
    width: 1400,
    height: 1000,
  },
  {
    src: "/images/ig/ig-miami-a.jpg",
    alt: "Ameer Hosein photographing on Ocean Drive in Miami.",
    category: "travel",
    width: 3072,
    height: 4096,
  },
  {
    src: "/images/ig/ig-miami-b.jpg",
    alt: "Ameer Hosein on Ocean Drive in Miami.",
    category: "travel",
    width: 3072,
    height: 4096,
  },
  {
    src: "/images/published-01.jpg",
    alt: "Placeholder for a published photograph.",
    category: "published",
    width: 1200,
    height: 1500,
  },
];
