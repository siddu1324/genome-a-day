import { z } from "zod";
import type { Specimen } from "@/types/specimen";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const bannedTextPattern = /\b(TODO|placeholder|fake|unknown accession|TBD)\b/i;

const nonEmptyString = z.string().trim().min(1);

export const sourceTypeSchema = z.enum(["taxonomy_database", "journal_article", "genome_resource", "database_record"]);

export const specimenSourceSchema = z.object({
  id: nonEmptyString,
  title: nonEmptyString,
  type: sourceTypeSchema,
  publisher: nonEmptyString,
  year: z.number().int().min(1500).max(2100).optional(),
  url: z.string().url(),
  accessedDate: z.string().regex(isoDatePattern, "Expected YYYY-MM-DD").optional(),
  supports: z.array(nonEmptyString).min(1),
});

export const specimenFactSchema = z.object({
  id: nonEmptyString,
  claim: nonEmptyString,
  sourceIds: z.array(nonEmptyString).min(1),
  confidence: z.enum(["high", "medium", "low"]),
});

export const specimenSchema = z.object({
  id: nonEmptyString,
  slug: nonEmptyString,
  commonName: nonEmptyString,
  scientificName: nonEmptyString,
  type: z.enum(["gene", "organism", "pathway", "microbe", "protein"]),
  taxonomyLabel: nonEmptyString,
  ncbiTaxonomyId: z.string().regex(/^\d+$/, "Expected an NCBI taxonomy numeric ID").optional(),
  accession: nonEmptyString.optional(),
  refseq: nonEmptyString.optional(),
  genbank: nonEmptyString.optional(),
  uniprot: nonEmptyString.optional(),
  discoveryDate: nonEmptyString,
  habitat: nonEmptyString,
  weirdnessScore: z.number().int().min(1).max(100),
  story: z.array(nonEmptyString).min(3).max(6),
  hookLine: nonEmptyString.max(160),
  whyItMatters: nonEmptyString,
  linkedInPost: nonEmptyString,
  facts: z.array(specimenFactSchema).min(1),
  sources: z.array(specimenSourceSchema),
  contentStatus: z.enum(["draft", "verified"]),
  lastFactChecked: z.string().regex(isoDatePattern, "Expected YYYY-MM-DD").optional(),
  shareStyle: z.enum(["mini-essay", "field-note", "question-hook", "founder-reflection", "research-thread"]).optional(),
  tags: z.array(nonEmptyString).min(1),
  silhouette: nonEmptyString,
});

export class SpecimenValidationError extends Error {
  constructor(readonly issues: string[]) {
    super(`Specimen validation failed:\n${issues.map((issue) => `- ${issue}`).join("\n")}`);
    this.name = "SpecimenValidationError";
  }
}

function formatZodIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "specimens";
    return `${path}: ${issue.message}`;
  });
}

function rejectBannedText(value: unknown, path: string, issues: string[]) {
  if (typeof value === "string") {
    if (bannedTextPattern.test(value)) {
      issues.push(`${path} contains banned placeholder text`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => rejectBannedText(item, `${path}[${index}]`, issues));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => rejectBannedText(item, `${path}.${key}`, issues));
  }
}

function validateEvidenceLinks(specimen: Specimen, path: string, issues: string[]) {
  const sourceIds = new Set<string>();
  const factIds = new Set<string>();

  specimen.sources.forEach((source, index) => {
    if (sourceIds.has(source.id)) {
      issues.push(`${path}.sources[${index}].id duplicates source id "${source.id}"`);
    }
    sourceIds.add(source.id);
  });

  specimen.facts.forEach((fact, factIndex) => {
    if (factIds.has(fact.id)) {
      issues.push(`${path}.facts[${factIndex}].id duplicates fact id "${fact.id}"`);
    }
    factIds.add(fact.id);

    fact.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        issues.push(`${path}.facts[${factIndex}].sourceIds references unknown source "${sourceId}"`);
      }
    });
  });
}

function validateStatusRules(specimen: Specimen, path: string, issues: string[]) {
  if (specimen.contentStatus !== "verified") {
    return;
  }

  if (specimen.sources.length < 2) {
    issues.push(`${path}.contentStatus verified specimens require at least 2 sources`);
  }

  if (!specimen.lastFactChecked) {
    issues.push(`${path}.lastFactChecked is required for verified specimens`);
  }
}

function validateSpecimenInternals(specimen: Specimen, path: string, issues: string[]) {
  validateEvidenceLinks(specimen, path, issues);
  validateStatusRules(specimen, path, issues);
  rejectBannedText(specimen, path, issues);
}

export function validateSpecimen(value: unknown): Specimen {
  const parsed = specimenSchema.safeParse(value);

  if (!parsed.success) {
    throw new SpecimenValidationError(formatZodIssues(parsed.error));
  }

  const issues: string[] = [];
  validateSpecimenInternals(parsed.data, "specimen", issues);

  if (issues.length > 0) {
    throw new SpecimenValidationError(issues);
  }

  return parsed.data;
}

export function validateSpecimens(value: unknown): Specimen[] {
  const parsed = z.array(specimenSchema).safeParse(value);

  if (!parsed.success) {
    throw new SpecimenValidationError(formatZodIssues(parsed.error));
  }

  const issues: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  parsed.data.forEach((specimen, index) => {
    if (ids.has(specimen.id)) {
      issues.push(`specimens[${index}].id duplicates specimen id "${specimen.id}"`);
    }
    ids.add(specimen.id);

    if (slugs.has(specimen.slug)) {
      issues.push(`specimens[${index}].slug duplicates slug "${specimen.slug}"`);
    }
    slugs.add(specimen.slug);

    validateSpecimenInternals(specimen, `specimens[${index}]`, issues);
  });

  if (issues.length > 0) {
    throw new SpecimenValidationError(issues);
  }

  return parsed.data;
}

export function assertValidSpecimens(value: unknown): asserts value is Specimen[] {
  validateSpecimens(value);
}
