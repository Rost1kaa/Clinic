import { ManualPaymentGateway } from "@/lib/payments/providers/manual";
import { MockPaymentGateway } from "@/lib/payments/providers/mock";
import { env } from "@/lib/utils/env";

export function getOnlinePaymentGateway() {
  switch (env.paymentProvider) {
    case "manual":
      return new ManualPaymentGateway();
    case "mock":
    default:
      return new MockPaymentGateway();
  }
}
