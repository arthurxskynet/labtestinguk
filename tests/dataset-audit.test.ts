import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

type AuditRow = {
  code: string;
  componentCount: number;
  expectedDominantCount: number;
  savedPeakCount: number;
  pass: boolean;
};

function readSql(fileName: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), fileName), "utf8");
}

function extractCodes(sql: string): string[] {
  const codes = [...sql.matchAll(/'(VP-[A-Z0-9-]+)'/g)].map((match) => match[1]);
  return [...new Set(codes)];
}

function countJsonObjects(section: string | undefined): number {
  if (!section) return 0;
  return [...section.matchAll(/jsonb_build_object\(/g)].length;
}

function sectionForCode(sql: string, code: string): string {
  const codeIndex = sql.indexOf(`'${code}'`);
  if (codeIndex === -1) return "";
  return sql.slice(codeIndex, codeIndex + 2800);
}

function countComponents(sectionSource: string): number {
  const section = /'component_purity',\s*jsonb_build_array\(([\s\S]*?)\)\s*,/.exec(
    sectionSource,
  )?.[1];
  return countJsonObjects(section);
}

function countPeaks(sectionSource: string): number {
  const section = /'peaks',\s*jsonb_build_array\(([\s\S]*?)\)\s*(?:\)|,)/.exec(
    sectionSource,
  )?.[1];
  return countJsonObjects(section);
}

function buildAudit(sql: string): AuditRow[] {
  return extractCodes(sql).map((code) => {
    const section = sectionForCode(sql, code);
    const componentCount = countComponents(section);
    const expectedDominantCount = componentCount >= 2 ? componentCount : 1;
    const savedPeakCount = countPeaks(section);
    const pass = componentCount >= 2 ? savedPeakCount === componentCount : savedPeakCount >= 1;
    return { code, componentCount, expectedDominantCount, savedPeakCount, pass };
  });
}

describe("dataset audit gate", () => {
  it("reports strict component-count contract compliance in seed data", () => {
    const report = buildAudit(readSql("seed.sql"));
    const failingRows = report.filter((row) => !row.pass);

    expect(report.length).toBeGreaterThan(20);
    expect(failingRows).toEqual([]);
  });
});
