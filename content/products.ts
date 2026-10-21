export const productCategories = [
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "prints", label: "Prints & Presets" },
  { id: "vouchers", label: "Course Gift Vouchers" },
] as const;

export type ProductCategory = (typeof productCategories)[number]["id"];
export type Fulfilment = "physical" | "download" | "voucher";

export type ProductVariant = {
  id: string;
  size?: string;
  colour?: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: { src: string; alt: string }[];
  variants: ProductVariant[];
  category: ProductCategory;
  fulfilment: Fulfilment;
  description: string;
  featured?: boolean;
  downloadFile?: string;
};

export const products: Product[] = [
  {
    id: "ah-tee",
    name: "AH Signature Tee",
    slug: "ah-signature-tee",
    price: 220,
    category: "apparel",
    fulfilment: "physical",
    featured: true,
    description:
      "A heavyweight tee with the AH monogram. The red is the same red as the suit. Edit the price, sizes, and stock in this file.",
    images: [
      { src: "/images/product-tee.jpg", alt: "Placeholder for the black AH signature tee." },
      { src: "/images/product-tee-red.jpg", alt: "Placeholder for the red AH signature tee." },
    ],
    variants: [
      { id: "tee-black-s", size: "S", colour: "Black", stock: 6 },
      { id: "tee-black-m", size: "M", colour: "Black", stock: 8 },
      { id: "tee-black-l", size: "L", colour: "Black", stock: 8 },
      { id: "tee-black-xl", size: "XL", colour: "Black", stock: 4 },
      { id: "tee-red-s", size: "S", colour: "Red", stock: 4 },
      { id: "tee-red-m", size: "M", colour: "Red", stock: 6 },
      { id: "tee-red-l", size: "L", colour: "Red", stock: 5 },
      { id: "tee-red-xl", size: "XL", colour: "Red", stock: 2 },
    ],
  },
  {
    id: "ah-hoodie",
    name: "AH Hoodie",
    slug: "ah-hoodie",
    price: 380,
    category: "apparel",
    fulfilment: "physical",
    featured: true,
    description: "An AH hoodie for class mornings and late edits. Swap the photo when the sample is shot.",
    images: [{ src: "/images/product-hoodie.jpg", alt: "Placeholder for the AH hoodie." }],
    variants: [
      { id: "hoodie-black-s", size: "S", colour: "Black", stock: 3 },
      { id: "hoodie-black-m", size: "M", colour: "Black", stock: 5 },
      { id: "hoodie-black-l", size: "L", colour: "Black", stock: 5 },
      { id: "hoodie-black-xl", size: "XL", colour: "Black", stock: 3 },
    ],
  },
  {
    id: "ah-cap",
    name: "AH Cap",
    slug: "ah-cap",
    price: 140,
    category: "apparel",
    fulfilment: "physical",
    description: "A cap with the AH mark on the crown.",
    images: [{ src: "/images/product-cap.jpg", alt: "Placeholder for the AH cap." }],
    variants: [
      { id: "cap-black", colour: "Black", stock: 12 },
      { id: "cap-red", colour: "Red", stock: 8 },
    ],
  },
  {
    id: "ah-tote",
    name: "AH Studio Tote",
    slug: "ah-studio-tote",
    price: 160,
    category: "accessories",
    fulfilment: "physical",
    description: "A tote for a body, a laptop, and the notes from Saturday class.",
    images: [{ src: "/images/product-print.jpg", alt: "Placeholder for the AH studio tote. Swap this image." }],
    variants: [{ id: "tote-natural", colour: "Natural", stock: 10 }],
  },
  {
    id: "ah-presets",
    name: "AH Lightroom Preset Pack",
    slug: "ah-lightroom-presets",
    price: 180,
    category: "prints",
    fulfilment: "download",
    featured: true,
    downloadFile: "ah-lightroom-presets.txt",
    description:
      "A digital preset pack. After payment is confirmed, the buyer receives a download link by email. Replace the file in private/downloads.",
    images: [{ src: "/images/product-preset.jpg", alt: "Placeholder cover for the AH Lightroom preset pack." }],
    variants: [{ id: "presets-digital", stock: 999 }],
  },
  {
    id: "ah-print",
    name: "AH Editorial Print",
    slug: "ah-editorial-print",
    price: 350,
    category: "prints",
    fulfilment: "physical",
    description: "A photographic print. Confirm the edition size in this description before you publish a real run.",
    images: [{ src: "/images/product-print.jpg", alt: "Placeholder for an AH photographic print." }],
    variants: [{ id: "print-12x16", size: "12×16", stock: 7 }],
  },
  {
    id: "fop-voucher",
    name: "FOP Gift Voucher",
    slug: "fop-gift-voucher",
    price: 2000,
    category: "vouchers",
    fulfilment: "voucher",
    description:
      "A gift voucher for The Fundamentals of Photography. When payment clears, the buyer receives a voucher code by email.",
    images: [{ src: "/images/product-voucher.jpg", alt: "Placeholder for an FOP gift voucher." }],
    variants: [{ id: "voucher", stock: 50 }],
  },
];
