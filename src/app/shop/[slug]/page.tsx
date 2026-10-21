import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@content/products";
import { siteUrl } from "@content/site";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { getProduct, productJsonLd } from "@/lib/catalog";
import { JsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMeta({
    title: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
  });
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="px-5 pt-32 text-muted">Loading the piece…</div>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <JsonLd data={productJsonLd(product, `${siteUrl()}/shop/${product.slug}`)} />
      <ProductPurchase product={product} />
    </div>
  );
}
