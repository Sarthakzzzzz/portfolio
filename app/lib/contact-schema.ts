
import { z } from "zod";

export const contactSchema = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .max(100),

    email: z.string()
        .trim()
        .email()
        .max(254),

    subject: z.string()
        .trim()
        .min(3)
        .max(150),

    message: z.string()
        .trim()
        .min(10)
        .max(5000),

    captchaToken: z.string()
        .min(1)
        .max(2048),
});

export type ContactFormData = z.infer<typeof contactSchema>;
