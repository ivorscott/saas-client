import { PaymentMethod } from "@stripe/stripe-js";

export interface SubscriptionInfo {
  subscription: Subscription;
  transactions: Transaction[];
  defaultPaymentMethod: PaymentMethod;
}

export interface Subscription {
  id: string;
  plan: string;
  transactionId: string;
  statusId: string;
  amount: number;
  tenantId: string;
  customerId: string;
  updatedAt: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  lastFour: string;
  bankReturnCode: string;
  statusId: number;
  expirationMonth: number;
  expirationYear: number;
  subscriptionId: string;
  paymentIntent: string;
  paymentMethod: string;
  tenantId: string;
  updatedAt: string;
  createdAt: string;
}

export interface StripePayload {
  plan: string;
  currency: string;
  productId: string;
  firstName: string;
  lastName: string;
  paymentMethod: string | undefined;
  email: string;
  amount: number;
  lastFour: string | undefined;
  cardBrand: string | undefined;
  expirationMonth: number | undefined;
  expirationYear: number | undefined;
}
