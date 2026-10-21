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
    src: "/images/portrait-01.jpg",
    alt: "Placeholder portrait. Replace with a model or portrait sitting.",
    category: "portraits",
    width: 1000,
    height: 1400,
  },
  {
    src: "/images/portrait-02.jpg",
    alt: "Placeholder portrait, square crop.",
    category: "portraits",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/portrait-03.jpg",
    alt: "Placeholder portrait, vertical crop.",
    category: "portraits",
    width: 900,
    height: 1300,
  },
  {
    src: "/images/fashion-01.jpg",
    alt: "Placeholder fashion frame. Replace with a haute look.",
    category: "fashion",
    width: 1000,
    height: 1500,
  },
  {
    src: "/images/fashion-02.jpg",
    alt: "Placeholder fashion frame, wide crop.",
    category: "fashion",
    width: 1500,
    height: 1000,
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
    src: "/images/travel-01.jpg",
    alt: "Placeholder travel photograph, wide.",
    category: "travel",
    width: 1600,
    height: 1000,
  },
  {
    src: "/images/travel-02.jpg",
    alt: "Placeholder travel photograph, vertical.",
    category: "travel",
    width: 1000,
    height: 1400,
  },
  {
    src: "/images/published-01.jpg",
    alt: "Placeholder for a published photograph.",
    category: "published",
    width: 1200,
    height: 1500,
  },
];
