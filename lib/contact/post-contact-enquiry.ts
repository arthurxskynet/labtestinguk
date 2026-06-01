import {
  contactEnquiryPayloadSchema,
  type ContactEnquiryPayload,
} from "@/lib/validations/contact-enquiry";

export type PostContactEnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

const GENERIC_ERROR =
  "We couldn't send your message. Please try again later.";

export async function postContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<PostContactEnquiryResult> {
  const url = process.env.CONTACT_ENQUIRY_WEBHOOK_URL?.trim();
  const token = process.env.CONTACT_ENQUIRY_WEBHOOK_TOKEN?.trim();

  if (!url || !token) {
    console.error("[contact-enquiry] missing webhook configuration", {
      external_id: payload.external_id,
    });
    return { ok: false, error: GENERIC_ERROR };
  }

  const parsed = contactEnquiryPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    console.error("[contact-enquiry] invalid payload", {
      external_id: payload.external_id,
    });
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact-enquiry] webhook rejected", {
        external_id: payload.external_id,
        status: response.status,
      });
      return { ok: false, error: GENERIC_ERROR };
    }

    return { ok: true };
  } catch {
    console.error("[contact-enquiry] webhook request failed", {
      external_id: payload.external_id,
    });
    return { ok: false, error: GENERIC_ERROR };
  }
}
