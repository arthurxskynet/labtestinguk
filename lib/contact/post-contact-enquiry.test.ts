import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { postContactEnquiry } from "./post-contact-enquiry";

const payload = {
  name: "Dr Jane Smith",
  email: "jane@example.com",
  subject: "Certificate verification",
  message: "Please advise on turnaround for sample XYZ.",
  source: "lab_testing" as const,
  source_page_url: "https://lab-testing.example.com/#contact",
  external_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  metadata: {
    form: "contact" as const,
    locale: "en-GB" as const,
  },
};

describe("postContactEnquiry", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_ENQUIRY_WEBHOOK_URL", "https://peptide.example.com/api/webhooks/contact-enquiries");
    vi.stubEnv("CONTACT_ENQUIRY_WEBHOOK_TOKEN", "test-token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends a Bearer-authenticated POST with the payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const result = await postContactEnquiry(payload);

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://peptide.example.com/api/webhooks/contact-enquiries",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
        body: JSON.stringify(payload),
      }),
    );
  });

  it("returns a generic error when the webhook rejects the request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const result = await postContactEnquiry(payload);

    expect(result).toEqual({
      ok: false,
      error: "We couldn't send your message. Please try again later.",
    });
  });

  it("returns a generic error when webhook env vars are missing", async () => {
    vi.stubEnv("CONTACT_ENQUIRY_WEBHOOK_URL", "");
    vi.stubEnv("CONTACT_ENQUIRY_WEBHOOK_TOKEN", "");

    const result = await postContactEnquiry(payload);

    expect(result).toEqual({
      ok: false,
      error: "We couldn't send your message. Please try again later.",
    });
  });

  it("does not leak the webhook URL when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Failed to fetch https://peptide.example.com/api/webhooks/contact-enquiries")),
    );

    const result = await postContactEnquiry(payload);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).not.toContain("peptide.example.com");
      expect(result.error).toBe(
        "We couldn't send your message. Please try again later.",
      );
    }
  });
});
