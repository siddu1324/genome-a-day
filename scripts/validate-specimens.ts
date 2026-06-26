import { specimens } from "../src/data/specimens";
import { SpecimenValidationError, validateSpecimens } from "../src/lib/specimenSchema";

try {
  const validatedSpecimens = validateSpecimens(specimens);
  const verifiedCount = validatedSpecimens.filter((specimen) => specimen.contentStatus === "verified").length;

  console.log(`Validated ${validatedSpecimens.length} specimen record(s); ${verifiedCount} verified.`);
} catch (error) {
  if (error instanceof SpecimenValidationError) {
    console.error(error.message);
    process.exit(1);
  }

  throw error;
}
