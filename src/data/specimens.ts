import type { Specimen } from "@/types/specimen";

export const specimens: Specimen[] = [
  {
    id: "axolotl-regeneration",
    slug: "axolotl-regeneration",
    commonName: "Axolotl limb regeneration",
    scientificName: "Ambystoma mexicanum",
    type: "organism",
    taxonomyLabel: "Amphibia / Caudata / Ambystomatidae",
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
    tags: ["regeneration", "blastema", "developmental biology", "amphibian", "wound repair"],
    silhouette: "axolotl",
  },
];

export const activeSpecimen = specimens[0];
