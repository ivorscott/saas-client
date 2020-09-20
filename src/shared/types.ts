// async thunk loading states

export const idle = "idle";
export const pending = "pending";
export const succeeded = "succeeded";
export const failed = "failed";

export type loading = "idle" | "pending" | "succeeded" | "failed";
