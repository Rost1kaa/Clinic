import type { PaymentGateway, PaymentIntentRequest } from "@/lib/payments/types";

export class ManualPaymentGateway implements PaymentGateway {
  key = "manual";

  async createIntent(input: PaymentIntentRequest) {
    return {
      providerKey: this.key,
      externalPaymentId: `manual_${input.referenceCode}`,
      redirectUrl: input.returnUrl,
      rawResponse: {
        mode: "manual",
      },
    };
  }
}
