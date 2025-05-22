import { z } from "zod";
import { requiredString } from "../utils/utils";

export const resetPasswordSchema = z
  .object({
    newPassword: requiredString("newPassword"),
    confirmPassword: requiredString("confirmPassword"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
