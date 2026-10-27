import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name needs at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(2, "Subject needs at least 2 characters").max(140),
  message: z.string().trim().min(10, "Message needs at least 10 characters").max(4000),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
