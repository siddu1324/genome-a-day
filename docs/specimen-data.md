# Specimen Data

Genome of the Day treats each specimen as a narrative record with traceable scientific evidence. Stage 2A keeps the collection intentionally small: the axolotl remains the only active specimen while the data contract hardens around it.

## Model

Each `Specimen` must include the public story fields used by the site plus explicit evidence fields:

- `facts`: short factual claims that the story depends on.
- `sources`: citable records, journal articles, databases, or genome resources.
- `contentStatus`: `draft` or `verified`.
- `lastFactChecked`: required when `contentStatus` is `verified`.
- `shareStyle`: optional style guidance for LinkedIn copy variation.
- optional accession fields: `accession`, `refseq`, `genbank`, and `uniprot`.

Accessions should be omitted when they are not known. Do not fill uncertainty with prose like "unknown accession" or temporary IDs.

## Source Rules

Every source needs a stable `id`, `title`, `type`, `publisher`, `url`, and at least one `supports` sentence. Every fact must reference one or more valid `sourceIds` from the same specimen.

Use the narrowest source that supports the claim:

- taxonomy claims should point to taxonomy databases.
- regeneration claims should point to peer-reviewed articles or their indexed PubMed records.
- genome claims should point to genome papers, datasets, or database records.

## Draft vs Verified

Use `draft` when a specimen has narrative copy but incomplete evidence. Draft specimens still need valid facts and sources so the page can render consistently.

Use `verified` only when the specimen has at least two sources, all fact source references resolve, and `lastFactChecked` records the review date in `YYYY-MM-DD` format.

## Validation

Run:

```bash
npm run validate:specimens
```

The validator checks:

- unique specimen IDs and slugs.
- story length between 3 and 6 lines.
- non-empty `hookLine`, `whyItMatters`, and `linkedInPost`.
- `hookLine` capped at 160 characters.
- `weirdnessScore` from 1 to 100.
- unique source IDs inside each specimen.
- every fact source reference resolves to a source.
- verified specimens have at least two sources and `lastFactChecked`.
- accession-like fields do not contain uncertain placeholder text.
- no specimen field contains `TODO`, `placeholder`, `fake`, `unknown accession`, or `TBD`.

`npm run verify` includes specimen validation, unit tests, lint, and TypeScript checks.

## Future Specimens

Add one new specimen at a time. Start as `draft` if the story is ready before the citations are complete, then promote to `verified` only after source review.

Keep LinkedIn posts source-aware but not citation-heavy. Use `shareStyle` to vary tone across future entries without changing the evidence model:

- `mini-essay`
- `field-note`
- `question-hook`
- `founder-reflection`
- `research-thread`
