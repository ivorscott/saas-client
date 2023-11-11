import { PaymentMethod } from "@stripe/stripe-js";

export enum SubscriptionStatus {
  // Subscription Status Cleared represents a successfully cleared subscription.
  Cleared,
  // Subscription Status Refunded represents a refunded subscription.
  Refunded,
  // Subscription Status Cancelled represents a cancelled subscription.
  Cancelled,
}

export interface SubscriptionInfo {
  subscription: Subscription;
  transactions: Transaction[];
  paymentMethod: PaymentMethod;
}

export interface Subscription {
  id: string;
  plan: string;
  transactionId: string;
  statusId: number;
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
