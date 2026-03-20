export type PaymentIntentRequest = {
  bookingId: string;
  referenceCode: string;
  amount: number;
  currency: "GEL";
  returnUrl: string;
  cancelUrl: string;
};

export type PaymentIntentResponse = {
  providerKey: string;
  externalPaymentId: string;
  redirectUrl: string;
  rawResponse: Record<string, unknown>;
};

export interface PaymentGateway {
  key: string;
  createIntent(input: PaymentIntentRequest): Promise<PaymentIntentResponse>;
}
