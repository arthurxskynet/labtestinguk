import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

function readSql(fileName: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), fileName), "utf8");
}

function extractProfile(sql: string, code: string): string | null {
  const whereToken = `code = '${code}'`;
  const whereIndex = sql.indexOf(whereToken);
  if (whereIndex >= 0) {
    const lookbehind = sql.slice(Math.max(0, whereIndex - 1200), whereIndex);
    const updateMatches = [...lookbehind.matchAll(/'chromatogram_profile',\s*'([^']+)'/g)];
    const updateProfile = updateMatches.at(-1)?.[1];
    if (updateProfile) return updateProfile;
  }

  const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const insertPattern = new RegExp(
    `\\(\\s*'${escapedCode}'[\\s\\S]*?'chromatogram_profile',\\s*'([^']+)'`,
    "m",
  );
  const insertMatch = insertPattern.exec(sql);
  return insertMatch?.[1] ?? null;
}

function extractComponentCount(sql: string, code: string): number {
  const codeIndex = sql.indexOf(`'${code}'`);
  if (codeIndex === -1) return 0;
  const window = sql.slice(codeIndex, codeIndex + 2800);
  const start = window.indexOf("'component_purity'");
  const end = window.indexOf("'additional_tests'");
  if (start === -1 || end === -1 || end <= start) return 0;
  const section = window.slice(start, end);
  return [...section.matchAll(/'analyte',/g)].length;
}

function extractPeakCount(sql: string, code: string): number {
  const codeIndex = sql.indexOf(`'${code}'`);
  if (codeIndex === -1) return 0;
  const window = sql.slice(codeIndex, codeIndex + 2800);
  const start = window.indexOf("'peaks'");
  const end = window.indexOf(")", start);
  if (start === -1 || end === -1 || end <= start) return 0;
  const section = window.slice(start, Math.min(window.length, start + 800));
  return [...section.matchAll(/'name',/g)].length;
}

describe("seed and migration consistency", () => {
  it("keeps overlapping certificate profile definitions aligned", () => {
    const seedSql = readSql("seed.sql");
    const migrationSql = readSql("migration_seed_certificate_sync.sql");
    const overlappingCodes = [
      "VP-X4T8N3-ZWLP",
      "VP-R4M9YL-W3BT",
      "VP-T2V6KQ-P8NM",
      "VP-Z7H4JN-4QR9",
    ];

    for (const code of overlappingCodes) {
      const seedProfile = extractProfile(seedSql, code);
      const migrationProfile = extractProfile(migrationSql, code);
      expect(seedProfile, `${code} seed profile`).not.toBeNull();
      expect(migrationProfile, `${code} migration profile`).not.toBeNull();
      expect(migrationProfile).toBe(seedProfile);
    }
  });

  it("enforces blend peak count to equal component count", () => {
    const seedSql = readSql("seed.sql");
    const blendCodes = ["VP-T2V6KQ-P8NM", "VP-W3NP8K-7M2R", "VP-Q9KL4T-5H8Y"];

    for (const code of blendCodes) {
      const componentCount = extractComponentCount(seedSql, code);
      const peakCount = extractPeakCount(seedSql, code);
      expect(componentCount).toBeGreaterThanOrEqual(2);
      expect(peakCount).toBe(componentCount);
    }
  });
});
