import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "general",
  "services",
  "technical",
  "verification",
  "partnership",
  "other",
] as const;

export const CONTACT_SUBJECT_LABELS: Record<
  (typeof CONTACT_SUBJECTS)[number],
  string
> = {
  general: "General enquiry",
  services: "Services & verification",
  technical: "Technical support",
  verification: "Certificate verification",
  partnership: "Partnership opportunities",
  other: "Other",
};

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a longer message")
    .max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
