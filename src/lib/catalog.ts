import { deliveryAreas } from "@content/shop";
import { products, type Product } from "@content/products";
import type { checkoutSchema } from "@/lib/schemas";
import { variantLabel } from "@/lib/money";
import { createOrderId, type Order } from "@/lib/orders";
import type { z } from "zod";

type CheckoutInput = z.infer<typeof checkoutSchema>;

export function getProducts() {
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function featuredProducts() {
  return products.filter((product) => product.featured);
}

export function quoteOrder(input: CheckoutInput): { order: Order } | { error: string } {
  const items: Order["items"] = [];

  for (const line of input.items) {
    const product = products.find((entry) => entry.id === line.productId);
    const variant = product?.variants.find((entry) => entry.id === line.variantId);
    if (!product || !variant) return { error: "One of those products is no longer listed." };
    if (variant.stock < line.quantity) {
      return { error: `${product.name} does not have enough stock in that option.` };
    }
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: variant.id,
      variantLabel: variantLabel(variant),
      quantity: line.quantity,
      unitPrice: product.price,
      fulfilment: product.fulfilment,
    });
  }

  const physical = items.some((item) => item.fulfilment === "physical");
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  let fee = 0;
  let areaName: string | undefined;
  let method: Order["fulfilment"]["method"] = physical ? input.method : "digital";

  if (physical && input.method === "delivery") {
    if (!input.areaId || !input.address) {
      return { error: "Add a delivery area and address." };
    }
    const area = deliveryAreas.find((entry) => entry.id === input.areaId);
    if (!area) return { error: "Choose a delivery area." };
    fee = area.fee;
    areaName = area.name;
    method = "delivery";
  }

  if (physical && input.method === "pickup") method = "pickup";

  const total = subtotal + fee;
  const order: Order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    items,
    customer: { name: input.name, phone: input.phone, email: input.email },
    fulfilment: {
      method,
      areaId: input.areaId,
      areaName,
      address: input.address,
      fee,
    },
    paymentMethod: input.paymentMethod,
    subtotal,
    total,
    chargedTotal: total.toFixed(2),
    status: "pending",
  };

  return { order };
}

export function productJsonLd(product: Product, url: string) {
  const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    sku: product.id,
    brand: { "@type": "Brand", name: "AH" },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "TTD",
      price: product.price.toFixed(2),
      availability:
        stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}
