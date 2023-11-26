import {z} from 'zod';

export const passwordResetSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
});

export const forgotPasswordSchema = z.object({email: z.string()});
