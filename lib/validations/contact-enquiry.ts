import { z } from "zod";

export const contactEnquiryPayloadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  source: z.literal("lab_testing"),
  source_page_url: z.string().url().max(2048),
  external_id: z.string().uuid(),
  metadata: z.object({
    form: z.literal("contact"),
    locale: z.literal("en-GB"),
  }),
});

export type ContactEnquiryPayload = z.infer<typeof contactEnquiryPayloadSchema>;
