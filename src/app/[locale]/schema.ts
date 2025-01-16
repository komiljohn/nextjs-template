import { z } from "zod";

export const LoginSchema = z.object({
  phone: z
    .string()
    .min(5, "Iltimos telefon raqam kiriting")
    .refine((val) => val.replaceAll("-", "").replaceAll(" ", "").length === 13, "errors.phone_invalid"),
});

export type LoginFormType = z.infer<typeof LoginSchema>;

export const LoginConfirmSchema = LoginSchema.extend({
  otp: z.string().length(6, "OTP soni 6 ta raqamdan iborat bo'lishi kerak"),
});

export type LoginConfirmFormType = z.infer<typeof LoginConfirmSchema>;
