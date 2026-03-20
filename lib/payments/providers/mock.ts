import { absoluteUrl } from "@/lib/utils/metadata";
import type { PaymentGateway, PaymentIntentRequest } from "@/lib/payments/types";

export class MockPaymentGateway implements PaymentGateway {
  key = "mock";

  async createIntent(input: PaymentIntentRequest) {
    return {
      providerKey: this.key,
      externalPaymentId: `mock_${input.referenceCode}`,
      redirectUrl: absoluteUrl(`/payments/mock/${input.referenceCode}`),
      rawResponse: {
        simulated: true,
        referenceCode: input.referenceCode,
        amount: input.amount,
      },
    };
  }
}
