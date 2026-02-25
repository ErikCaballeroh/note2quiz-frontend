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