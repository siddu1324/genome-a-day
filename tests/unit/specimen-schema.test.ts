import { describe, expect, test } from "vitest";
import { specimens } from "../../src/data/specimens";
import { assertValidSpecimens } from "../../src/lib/specimenSchema";
import type { Specimen } from "../../src/types/specimen";

function cloneSpecimen(specimen: Specimen): Specimen {
  return structuredClone(specimen);
}

describe("specimen schema validation", () => {
  test("axolotl passes schema validation", () => {
    expect(() => assertValidSpecimens(specimens)).not.toThrow();
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
