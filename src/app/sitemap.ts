import type { MetadataRoute } from "next";
import { products } from "@content/products";
import { siteUrl } from "@content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = siteUrl();
  const paths = [
    "",
    "/courses/fundamentals",
    "/courses/pro",
    "/portfolio",
    "/testimonials",
    "/collaborations",
    "/about",
    "/contact",
    "/shop",
    "/shop/checkout",
    ...products.map((product) => `/shop/${product.slug}`),
  ];

  return paths.map((path) => ({
    url: `${root}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
