export type SpecimenType = "gene" | "organism" | "pathway" | "microbe" | "protein";

export type SourceType = "taxonomy_database" | "journal_article" | "genome_resource" | "database_record";

export type SourceConfidence = "high" | "medium" | "low";

export type ShareStyle = "mini-essay" | "field-note" | "question-hook" | "founder-reflection" | "research-thread";

export type SpecimenSource = {
  id: string;
  title: string;
  type: SourceType;
  publisher: string;
  year?: number;
  url: string;
  accessedDate?: string;
  supports: string[];
};

export type SpecimenFact = {
  id: string;
  claim: string;
  sourceIds: string[];
  confidence: SourceConfidence;
};

export type Specimen = {
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;
  type: SpecimenType;
  taxonomyLabel: string;
  ncbiTaxonomyId?: string;
  accession?: string;
  refseq?: string;
  genbank?: string;
  uniprot?: string;
  discoveryDate: string;
  habitat: string;
  weirdnessScore: number;
  story: string[];
  hookLine: string;
  whyItMatters: string;
  linkedInPost: string;
  facts: SpecimenFact[];
  sources: SpecimenSource[];
  contentStatus: "draft" | "verified";
  lastFactChecked?: string;
  shareStyle?: ShareStyle;
  tags: string[];
  silhouette: string;
};
