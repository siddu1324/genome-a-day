import type { Specimen } from "@/types/specimen";

export const specimens: Specimen[] = [
  {
    id: "axolotl-regeneration",
    slug: "axolotl-regeneration",
    commonName: "Axolotl limb regeneration",
    scientificName: "Ambystoma mexicanum",
    type: "organism",
    taxonomyLabel: "Amphibia / Caudata / Ambystomatidae",
    ncbiTaxonomyId: "8296",
    discoveryDate: "Regeneration studied across modern developmental biology",
    habitat: "Lake Xochimilco canal system, Mexico City",
    weirdnessScore: 96,
    story: [
      "Some organisms heal. Axolotls negotiate with injury.",
      "Lose a limb, and the wound does not simply close. Cells gather into a blastema, a temporary living construction site.",
      "That blastema rebuilds bone, muscle, vessels, nerves, and skin with instructions adult mammals mostly silence.",
      "The animal keeps the map of the missing limb, then follows it with unnerving calm.",
      "In its body, regeneration is not a miracle. It is a program that never fully shuts down.",
    ],
    hookLine: "The strangest part is not that the limb returns. It is that it returns in the right shape.",
    whyItMatters:
      "Axolotl regeneration gives researchers a living model for how adult tissue can re-enter growth, coordinate immune response, reconnect nerves, and rebuild structure without scarring. Understanding that choreography could reshape how we think about wound repair, fibrosis, organ damage, and future regenerative medicine.",
    linkedInPost:
      "Axolotls do something biology keeps trying to explain: they can rebuild a lost limb.\n\nAfter injury, cells gather into a blastema, a temporary living construction site that can remake bone, muscle, nerves, vessels, and skin. Instead of simply sealing damage with scar tissue, the animal reopens a developmental program and rebuilds the missing structure.\n\nThat matters because regeneration is not only a strange animal trick. It is a clue about immune response, tissue memory, scarring, and the instructions adult bodies usually lock away.\n\nThe question is not whether biology can rebuild. Axolotls prove it can. The question is how much of that logic can be understood, translated, and used responsibly.\n\n#Biology #RegenerativeMedicine #Genomics #Biotech #ScienceCommunication",
    facts: [
      {
        id: "axolotl-taxonomy",
        claim: "The featured organism is the axolotl, Ambystoma mexicanum, an amphibian classified within Caudata and Ambystomatidae.",
        sourceIds: ["ncbi-taxonomy-8296"],
        confidence: "high",
      },
      {
        id: "limb-blastema-rebuilds-tissues",
        claim: "After limb injury, axolotl cells form a blastema that contributes to rebuilding multiple limb tissues.",
        sourceIds: ["kragl-2009-tissue-origin-memory"],
        confidence: "high",
      },
      {
        id: "scar-free-skin-repair",
        claim: "Adult axolotl skin wounds can regenerate skin architecture with reduced scarring compared with typical mammalian repair.",
        sourceIds: ["seifert-2012-scar-free-skin"],
        confidence: "high",
      },
      {
        id: "published-genome-resource",
        claim: "A published axolotl genome resource supports organism-level genomic work on regeneration biology.",
        sourceIds: ["nowoshilow-2018-axolotl-genome"],
        confidence: "high",
      },
    ],
    sources: [
      {
        id: "ncbi-taxonomy-8296",
        title: "Ambystoma mexicanum",
        type: "taxonomy_database",
        publisher: "NCBI Taxonomy",
        url: "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=8296",
        accessedDate: "2026-06-26",
        supports: ["Taxonomy and organism identity for Ambystoma mexicanum."],
      },
      {
        id: "kragl-2009-tissue-origin-memory",
        title: "Cells keep a memory of their tissue origin during axolotl limb regeneration",
        type: "journal_article",
        publisher: "Nature",
        year: 2009,
        url: "https://pubmed.ncbi.nlm.nih.gov/19571878/",
        accessedDate: "2026-06-26",
        supports: ["Blastema cells contribute to regenerated limb tissues while retaining tissue-origin memory."],
      },
      {
        id: "seifert-2012-scar-free-skin",
        title: "Skin regeneration in adult axolotls: a blueprint for scar-free healing in vertebrates",
        type: "journal_article",
        publisher: "PLOS ONE",
        year: 2012,
        url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0032875",
        accessedDate: "2026-06-26",
        supports: ["Adult axolotl wound repair can restore skin architecture with reduced scar formation."],
      },
      {
        id: "nowoshilow-2018-axolotl-genome",
        title: "The axolotl genome and the evolution of key tissue formation regulators",
        type: "genome_resource",
        publisher: "Nature",
        year: 2018,
        url: "https://www.nature.com/articles/nature25458",
        accessedDate: "2026-06-26",
        supports: ["A published axolotl genome resource supports future regeneration and genome biology work."],
      },
    ],
    contentStatus: "verified",
    lastFactChecked: "2026-06-26",
    shareStyle: "mini-essay",
    tags: ["regeneration", "blastema", "developmental biology", "amphibian", "wound repair"],
    silhouette: "axolotl",
  },
];

export const activeSpecimen = specimens[0];
