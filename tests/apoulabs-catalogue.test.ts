import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const MIGRATION = "migration_apoulabs_catalogue.sql";

const EXPECTED_CODES = [
  "VP-K8NM3R-7B2T",
  "VP-P4HW9L-5C6Y",
  "VP-J2VX7K-9M4N",
  "VP-R5YL8N-3K7P",
  "VP-T9QK4M-6H2W",
  "VP-F3NP8K-1L5R",
  "VP-W7BM2V-8J4Q",
  "VP-C6HT9L-2N5K",
  "VP-Y8PK3M-4R7V",
  "VP-L4NW6K-9T2H",
  "VP-D9MX5R-7P3J",
  "VP-H2VK8N-6Q4L",
] as const;

const MIN_PURITY = 99.11;
const MAX_PURITY = 99.92;

function readSql(fileName: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), fileName), "utf8");
}

function sectionForCode(sql: string, code: string): string {
  const codeIndex = sql.indexOf(`'${code}'`);
  if (codeIndex === -1) return "";
  return sql.slice(codeIndex, codeIndex + 3200);
}

describe("apoulabs catalogue migration", () => {
  const sql = readSql(MIGRATION);

  it("defines exactly twelve Apoulabs SKU codes", () => {
    for (const code of EXPECTED_CODES) {
      expect(sql).toContain(`'${code}'`);
    }
    const found = [...sql.matchAll(/'(VP-[A-Z0-9-]+)'/g)].map((m) => m[1]);
    const unique = [...new Set(found)];
    expect(unique).toHaveLength(12);
    expect(unique.sort()).toEqual([...EXPECTED_CODES].sort());
  });

  it("tags every row with partner_brand apoulabs and catalogue data_source", () => {
    for (const code of EXPECTED_CODES) {
      const section = sectionForCode(sql, code);
      expect(section).toMatch(/'partner_brand',\s*'apoulabs'/);
      expect(section).toMatch(/'data_source',\s*'catalogue'/);
      expect(section).toMatch(/'partner_sku',\s*'/);
      expect(section).toMatch(/APOL-LAB-2026-/);
    }
  });

  it("keeps summary purity within 99.11–99.92", () => {
    const purityMatches = [
      ...sql.matchAll(
        /\n\s*'(VP-[A-Z0-9-]+)',\n\s*'[^']+',\n\s*([\d.]+),/g,
      ),
    ];
    expect(purityMatches).toHaveLength(12);
    for (const [, , purityText] of purityMatches) {
      const purity = Number(purityText);
      expect(purity).toBeGreaterThanOrEqual(MIN_PURITY);
      expect(purity).toBeLessThanOrEqual(MAX_PURITY);
    }
  });

});
