import { wipay } from "@/lib/payments/wipay";
import type { PaymentProvider } from "@/lib/payments/types";

const providers: Record<string, PaymentProvider> = {
  wipay,
};

export function paymentProvider() {
  const name = process.env.PAYMENT_PROVIDER || "wipay";
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`);
  }
  return provider;
}
