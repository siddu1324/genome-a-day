import { describe, expect, test } from "vitest";
import { specimens } from "../../src/data/specimens";
import { getSpecimenForDate, getSpecimenNumber } from "../../src/lib/specimenUtils";
import { assertValidSpecimens } from "../../src/lib/specimenSchema";
import type { Specimen } from "../../src/types/specimen";

function cloneSpecimen(specimen: Specimen): Specimen {
  return structuredClone(specimen);
}

describe("specimen schema validation", () => {
  test("all specimens pass schema validation", () => {
    expect(() => assertValidSpecimens(specimens)).not.toThrow();
  });

  test("Stage 2B has five controlled specimen records", () => {
    expect(specimens).toHaveLength(5);
  });

  test("slugs are unique", () => {
    const slugs = specimens.map((specimen) => specimen.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("verified specimens have real source coverage", () => {
    for (const specimen of specimens) {
      if (specimen.contentStatus !== "verified") {
        continue;
      }

      expect(specimen.lastFactChecked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(specimen.sources.length).toBeGreaterThanOrEqual(2);
      expect(specimen.facts.every((fact) => fact.sourceIds.length > 0)).toBe(true);
    }
  });

  test("fact source references are valid", () => {
    for (const specimen of specimens) {
      const sourceIds = new Set(specimen.sources.map((source) => source.id));
      const referencedSourceIds = specimen.facts.flatMap((fact) => fact.sourceIds);

      expect(referencedSourceIds.every((sourceId) => sourceIds.has(sourceId))).toBe(true);
    }
  });

  test("specimens do not include uncertain accession text", () => {
    const serializedSpecimens = JSON.stringify(specimens);

    expect(serializedSpecimens).not.toMatch(/TODO|placeholder|fake|unknown accession|TBD/i);
  });

  test("daily rotation advances across the expanded specimen set", () => {
    expect(getSpecimenForDate(new Date("2026-06-26T12:00:00Z")).slug).toBe("axolotl-regeneration");
    expect(getSpecimenForDate(new Date("2026-06-27T12:00:00Z")).slug).toBe("petase-plastic-digestion");
    expect(getSpecimenForDate(new Date("2026-06-28T12:00:00Z")).slug).toBe("gfp-bioimaging");
    expect(getSpecimenForDate(new Date("2026-06-29T12:00:00Z")).slug).toBe("dsup-dna-protection");
    expect(getSpecimenForDate(new Date("2026-06-30T12:00:00Z")).slug).toBe("deinococcus-radiodurans-repair");
  });

  test("specimen numbering follows archive order", () => {
    specimens.forEach((specimen, index) => {
      expect(getSpecimenNumber(specimen)).toBe(index + 1);
    });
  });

  test("invalid source references fail", () => {
    const specimen = cloneSpecimen(specimens[0]);
    specimen.facts[0].sourceIds = ["missing-source"];

    expect(() => assertValidSpecimens([specimen])).toThrow(/unknown source/i);
  });

  test("duplicate slugs fail", () => {
    const first = cloneSpecimen(specimens[0]);
    const second = cloneSpecimen(specimens[0]);
    second.id = "second-axolotl";

    expect(() => assertValidSpecimens([first, second])).toThrow(/duplicates slug/i);
  });

  test("placeholder accession text fails", () => {
    const specimen = cloneSpecimen(specimens[0]);
    specimen.accession = "unknown accession";

    expect(() => assertValidSpecimens([specimen])).toThrow(/placeholder text/i);
  });

  test("verified specimen without sources fails", () => {
    const specimen = cloneSpecimen(specimens[0]);
    specimen.sources = [];

    expect(() => assertValidSpecimens([specimen])).toThrow(/at least 2 sources/i);
  });
});
