import {
  CONTACT_SUBJECT_LABELS,
  type ContactInput,
} from "@/lib/validations/contact";
import type { ContactEnquiryPayload } from "@/lib/validations/contact-enquiry";

export function buildContactEnquiryPayload(
  form: ContactInput,
  options: { sourcePageUrl: string; externalId: string },
): ContactEnquiryPayload {
  return {
    name: form.name,
    email: form.email,
    subject: CONTACT_SUBJECT_LABELS[form.subject],
    message: form.message,
    source: "lab_testing",
    source_page_url: options.sourcePageUrl,
    external_id: options.externalId,
    metadata: {
      form: "contact",
      locale: "en-GB",
    },
  };
}
