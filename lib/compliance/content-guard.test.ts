import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { PROHIBITED_CLAIM_PATTERNS } from "./copy-matrix";

const ROOT = join(process.cwd());

const SCAN_DIRS = [
  "app/(marketing)",
  "components/marketing",
  "components/compliance",
  "components/verify",
  "components/certificates",
  "lib/compliance",
];

const ALLOWLIST_SNIPPETS = [
  "copy-matrix.ts", // documents historical issues
  "launch-report.ts",
  "content-guard.test.ts",
  "Not for clinical or human use",
  "does not confirm product safety",
];

const RISKY_PHRASES = [
  ...PROHIBITED_CLAIM_PATTERNS,
  "24hr priority",
  "99.9% qc",
  "trusted by uk labs",
  "verify authenticity",
  "tamper-proof",
  "pass/fail certification",
  "bacteriostatic water",
  "you can trust",
  "verified customer",
  "5 out of 5 stars",
];

function collectFiles(dir: string): string[] {
  const abs = join(ROOT, dir);
  let entries: string[] = [];
  try {
    for (const name of readdirSync(abs)) {
      const path = join(abs, name);
      const rel = path.slice(ROOT.length + 1);
      if (statSync(path).isDirectory()) {
        entries = entries.concat(collectFiles(rel));
      } else if (/\.(tsx|ts)$/.test(name)) {
        entries.push(rel);
      }
    }
  } catch {
    // directory may not exist in all environments
  }
  return entries;
}

const SCAN_EXCLUDE_FILES = [
  "research-use-only/page.tsx",
  "copy-matrix.ts",
];

function containsRiskyPhrase(content: string, phrase: string): boolean {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(content);
}

describe("public marketing content guard", () => {
  it("does not contain high-risk prohibited claim phrases in scanned surfaces", () => {
    const files = SCAN_DIRS.flatMap(collectFiles);
    const violations: string[] = [];

    for (const file of files) {
      if (ALLOWLIST_SNIPPETS.some((snippet) => file.includes(snippet))) continue;
      if (SCAN_EXCLUDE_FILES.some((snippet) => file.includes(snippet))) continue;
      const content = readFileSync(join(ROOT, file), "utf8");
      for (const phrase of RISKY_PHRASES) {
        if (containsRiskyPhrase(content, phrase)) {
          violations.push(`${file}: "${phrase}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
