"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { buildContactEnquiryPayload } from "@/lib/contact/enquiry-payload";
import { postContactEnquiry } from "@/lib/contact/post-contact-enquiry";
import { contactSchema } from "@/lib/validations/contact";

const GENERIC_ERROR =
  "We couldn't send your message. Please try again later.";
const MIN_SUBMIT_MS = 3000;

const submitInputSchema = contactSchema.extend({
  sourcePageUrl: z.string().trim().max(2048),
  website: z.string().optional(),
  formReadyAt: z.number().optional(),
});

export type SubmitContactEnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

async function validateSourcePageUrl(sourcePageUrl: string): Promise<boolean> {
  try {
    const parsed = new URL(sourcePageUrl);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (siteUrl) {
      return parsed.origin === new URL(siteUrl).origin;
    }

    const requestHeaders = await headers();
    const host =
      requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    if (!host) return false;

    const proto = requestHeaders.get("x-forwarded-proto") ?? "http";
    const requestOrigin = `${proto}://${host.split(",")[0]?.trim()}`;
    return parsed.origin === new URL(requestOrigin).origin;
  } catch {
    return false;
  }
}

export async function submitContactEnquiry(
  input: unknown,
): Promise<SubmitContactEnquiryResult> {
  const parsed = submitInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form",
    };
  }

  const { sourcePageUrl, website, formReadyAt, ...form } = parsed.data;

  if (website?.trim()) {
    return { ok: true };
  }

  if (formReadyAt != null && Date.now() - formReadyAt < MIN_SUBMIT_MS) {
    return { ok: false, error: GENERIC_ERROR };
  }

  if (!(await validateSourcePageUrl(sourcePageUrl))) {
    return { ok: false, error: GENERIC_ERROR };
  }

  const externalId = crypto.randomUUID();
  const payload = buildContactEnquiryPayload(form, {
    sourcePageUrl,
    externalId,
  });

  return postContactEnquiry(payload);
}
