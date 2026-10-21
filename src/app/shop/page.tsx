import { shopCopy } from "@content/shop";
import { PageIntro } from "@/components/page-intro";
import { ProductBrowser } from "@/components/shop/product-browser";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shop AH",
  description: "AH Store: apparel, accessories, prints, Lightroom presets, and Fundamentals of Photography gift vouchers.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageIntro eyebrow={shopCopy.name} title={shopCopy.heading} lede={shopCopy.lede} />
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ProductBrowser />
      </div>
    </>
  );
}
