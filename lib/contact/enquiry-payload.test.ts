import { describe, expect, it } from "vitest";

import { buildContactEnquiryPayload } from "./enquiry-payload";

describe("buildContactEnquiryPayload", () => {
  it("maps form values to the webhook payload shape", () => {
    const payload = buildContactEnquiryPayload(
      {
        name: "Dr Jane Smith",
        email: "jane@example.com",
        subject: "verification",
        message: "Please advise on turnaround for sample XYZ.",
      },
      {
        sourcePageUrl: "https://lab-testing.example.com/#contact",
        externalId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    );

    expect(payload).toEqual({
      name: "Dr Jane Smith",
      email: "jane@example.com",
      subject: "Certificate verification",
      message: "Please advise on turnaround for sample XYZ.",
      source: "lab_testing",
      source_page_url: "https://lab-testing.example.com/#contact",
      external_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      metadata: {
        form: "contact",
        locale: "en-GB",
      },
    });
  });

  it("uses human-readable subject labels for each enum value", () => {
    const subjects = [
      ["general", "General enquiry"],
      ["services", "Services & verification"],
      ["technical", "Technical support"],
      ["verification", "Certificate verification"],
      ["partnership", "Partnership opportunities"],
      ["other", "Other"],
    ] as const;

    for (const [subject, label] of subjects) {
      const payload = buildContactEnquiryPayload(
        {
          name: "Test User",
          email: "test@example.com",
          subject,
          message: "Test message content.",
        },
        {
          sourcePageUrl: "https://lab-testing.example.com/",
          externalId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        },
      );

      expect(payload.subject).toBe(label);
    }
  });
});
