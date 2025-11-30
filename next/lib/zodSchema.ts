import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters' })
    .max(15, { message: 'Password must have at max 15 characters' })
    .trim(),
});
