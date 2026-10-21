import { createHash, timingSafeEqual } from "crypto";
import type { CardCheckoutInput, PaymentProvider } from "@/lib/payments/types";

function accountNumber() {
  const value = process.env.WIPAY_ACCOUNT_NUMBER;
  if (!value) return null;
  const asNumber = Number(value);
  return Number.isSafeInteger(asNumber) ? asNumber : value;
}

function configured() {
  return Boolean(process.env.WIPAY_ACCOUNT_NUMBER && process.env.WIPAY_API_KEY);
}

export function wipayReady() {
  return configured();
}

export const wipay: PaymentProvider = {
  name: "wipay",

  async createCheckout(input: CardCheckoutInput) {
    const account = accountNumber();
    if (!account) {
      throw new Error("WiPay is not configured. Add WIPAY_ACCOUNT_NUMBER and WIPAY_API_KEY.");
    }

    const response = await fetch("https://tt.wipayfinancial.com/plugins/payments/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        account_number: account,
        country_code: "TT",
        currency: "TTD",
        environment: process.env.WIPAY_ENVIRONMENT === "live" ? "live" : "sandbox",
        fee_structure: process.env.WIPAY_FEE_STRUCTURE || "customer_pay",
        method: process.env.WIPAY_METHOD || "credit_card_co",
        order_id: input.orderId,
        origin: "AH | Ameer Hosein",
        response_url: input.responseUrl,
        total: input.total,
        email: input.email,
        name: input.name,
        phone: input.phone,
        data: input.data,
      }),
    });

    const payload = (await response.json()) as {
      url?: string;
      message?: string;
      transaction_id?: string;
    };

    if (!response.ok || !payload.url || payload.url.includes("status=error")) {
      throw new Error(payload.message || "WiPay could not start the card payment.");
    }

    return {
      url: payload.url,
      transactionId: payload.transaction_id || "",
    };
  },

  verifySuccess({ transactionId, hash, originalTotal }) {
    const apiKey = process.env.WIPAY_API_KEY;
    if (!apiKey || !transactionId || !hash) return false;
    const expected = createHash("md5")
      .update(`${transactionId}${originalTotal}${apiKey}`)
      .digest("hex");
    const left = Buffer.from(hash.toLowerCase());
    const right = Buffer.from(expected.toLowerCase());
    return left.length === right.length && timingSafeEqual(left, right);
  },
};
