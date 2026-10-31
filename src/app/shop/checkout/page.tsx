import { CheckoutForm } from "@/components/shop/checkout-form";
import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Checkout",
  description: "Checkout for AH Store. Pay by card, bank transfer, or on pickup.",
  path: "/shop/checkout",
});

export default function CheckoutPage() {
  return (
    <>
      <PageIntro eyebrow="AH Store" title="Checkout" lede="Your details, how you want it delivered, and how you want to pay." />
      <div className="shell pb-20">
        <CheckoutForm />
      </div>
    </>
  );
}
