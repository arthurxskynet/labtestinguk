import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const FORBIDDEN_PEAK_NAME =
  /impurit|shoulder|trace|deamidat|aggregate|baseline|late eluent|early peak|glyco|polar trace|artefact|system peak|late fraction/i;

function readSql(fileName: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), fileName), "utf8");
}

function extractCodes(sql: string): string[] {
  const codes = [...sql.matchAll(/'(VP-[A-Z0-9-]+)'/g)].map((match) => match[1]);
  return [...new Set(codes)];
}

function sectionForCode(sql: string, code: string): string {
  const codeIndex = sql.indexOf(`'${code}'`);
  if (codeIndex === -1) return "";
  const objMarker = "jsonb_build_object(";
  const objIdx = sql.indexOf(objMarker, codeIndex);
  if (objIdx === -1 || objIdx - codeIndex > 800) return "";
  const end = findBalancedEnd(sql, objIdx + objMarker.length - 1);
  if (end === -1) return "";
  return sql.slice(objIdx, end + 1);
}

function findBalancedEnd(text: string, openParenIndex: number): number {
  let depth = 0;
  for (let i = openParenIndex; i < text.length; i++) {
    if (text[i] === "(") depth++;
    else if (text[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function countComponents(section: string): number {
  const marker = "'component_purity', jsonb_build_array(";
  const idx = section.indexOf(marker);
  if (idx === -1) return 0;
  const start = idx + marker.length - 1;
  const end = findBalancedEnd(section, start);
  if (end === -1) return 0;
  return [...section.slice(start, end + 1).matchAll(/jsonb_build_object\(/g)].length;
}

function extractPeakNames(section: string): string[] {
  const marker = "'peaks', jsonb_build_array(";
  const idx = section.indexOf(marker);
  if (idx === -1) return [];
  const start = idx + marker.length - 1;
  const end = findBalancedEnd(section, start);
  if (end === -1) return [];
  return [...section.slice(start, end + 1).matchAll(/'name',\s*'([^']+)'/g)].map((m) => m[1]);
}

function hasTestingDate(section: string): boolean {
  return /'testing_date',\s*'20\d{2}-\d{2}-\d{2}'/.test(section);
}

function hasCatalogueSource(section: string): boolean {
  return /'data_source',\s*'catalogue'/.test(section);
}

function auditPeakHygiene(sql: string, fileLabel: string): void {
  const violations: string[] = [];

  for (const code of extractCodes(sql)) {
      const section = sectionForCode(sql, code);
      const componentCount = countComponents(section);
      const peakNames = extractPeakNames(section);
      const expectedPeakCount = componentCount >= 2 ? componentCount : 1;

      if (peakNames.length !== expectedPeakCount) {
        violations.push(`${code}: expected ${expectedPeakCount} peak(s), found ${peakNames.length}`);
      }

      for (const name of peakNames) {
        if (FORBIDDEN_PEAK_NAME.test(name)) {
          violations.push(`${code}: forbidden peak name "${name}"`);
        }
      }

      if (!hasTestingDate(section)) {
        violations.push(`${code}: missing testing_date`);
      }

      if (!hasCatalogueSource(section)) {
        violations.push(`${code}: missing data_source catalogue`);
      }
    }

  expect(violations, fileLabel).toEqual([]);
}

describe("peak hygiene gate", () => {
  it("keeps seed peaks free of impurity labels and aligned to component count", () => {
    auditPeakHygiene(readSql("seed.sql"), "seed.sql");
  });

  it("keeps Apoulabs catalogue peaks aligned to component count", () => {
    auditPeakHygiene(readSql("migration_apoulabs_catalogue.sql"), "migration_apoulabs_catalogue.sql");
  });
});
