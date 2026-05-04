import { z } from "zod";

export const registerSchema = z.object({

    name: z
        .string()
        .min(1, "El nombre es obligatorio"),

    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Email inválido"),

    password: z
        .string()
        .min(6, "La contraseña debe tener mínimo 6 caracteres"),

    confirmPassword: z
        .string()

}).refine(

    (data) => data.password === data.confirmPassword,

    {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"]
    }

);


export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const verifyResetCodeSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Email inválido"),
    code: z
        .string()
        .min(6, "El código debe tener 6 dígitos")
        .max(6, "El código debe tener 6 dígitos")
        .regex(/^\d{6}$/, "El código debe contener solo números"),
});

export type VerifyResetCodeFormData = z.infer<typeof verifyResetCodeSchema>;

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Email inválido"),
    resetToken: z
        .string()
        .min(1, "Token inválido"),
    newPassword: z
        .string()
        .min(6, "La contraseña debe tener mínimo 6 caracteres"),
    confirmPassword: z
        .string(),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }
);

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;