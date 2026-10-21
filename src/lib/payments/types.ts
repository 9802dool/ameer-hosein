export type CardCheckoutInput = {
  orderId: string;
  total: string;
  email: string;
  name: string;
  phone: string;
  data: string;
  responseUrl: string;
};

export type CardCheckout = {
  url: string;
  transactionId: string;
};

export interface PaymentProvider {
  name: string;
  createCheckout(input: CardCheckoutInput): Promise<CardCheckout>;
  verifySuccess(input: {
    transactionId: string;
    hash: string;
    originalTotal: string;
  }): boolean;
}
