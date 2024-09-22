import type { Kysely } from "kysely";
import type { Database } from "./schema";

/**
 * Retrieves the Ayahs (verses) by the given Surah number and Edition ID.
 * @param db - The database instance.
 * @param surahNumber - The Surah number.
 * @param editionId - The Edition ID.
 * @returns A Promise that resolves to the Ayahs matching the given Surah number and Edition ID.
 */
export async function getAyahsBySurahNumberAndEditionID(
  db: Kysely<Database>,
  surahNumber: number,
  editionId: number,
) {
  try {
    const ayahs = await db
      .selectFrom("ayah")
      .selectAll()
      .where("surahNumber", "=", surahNumber)
      .where("editionId", "=", editionId)
      .execute();

    return ayahs;
  } catch (error) {
    console.error("Error fetching ayahs:", error);
    throw new Error("Failed to fetch ayahs");
  }
}

/**
 * Retrieves the Ayahs (verses) by the given Surah number and Edition name.
 * @param db - The database instance.
 * @param surahNumber - The Surah number.
 * @param editionName - The Edition name.
 * @returns A Promise that resolves to the Ayahs matching the given Surah number and Edition name.
 */
export async function getAyahsBySurahNumberAndEditionName(
  db: Kysely<Database>,
  surahNumber: number,
  editionName: string,
) {
  try {
    const ayahs = await db
      .selectFrom("ayah as a")
      .innerJoin("edition as e", "a.editionId", "e.id")
      .innerJoin("ayahInfo as ai", (join) =>
        join
          .onRef("a.surahNumber", "=", "ai.surahNumber")
          .onRef("a.ayahNumber", "=", "ai.ayahNumber"))
      .selectAll()
      .where("a.surahNumber", "=", surahNumber)
      .where("e.name", "=", editionName)
      .orderBy("a.ayahNumber", "asc")
      .execute();

    return ayahs;
  } catch (error) {
    console.error("Error fetching ayahs:", error);
    throw new Error("Failed to fetch ayahs");
  }
}

/**
 * Retrieves the Translations (verses) by the given Surah number and Edition name.
 * @param db - The database instance.
 * @param surahNumber - The Surah number.
 * @param editionName - The Edition name.
 * @returns A Promise that resolves to the Ayahs matching the given Surah number and Edition name.
 */
export async function getTranslationsBySurahNumberAndEditionName(
  db: Kysely<Database>,
  surahNumber: number,
  editionName: string,
) {
  try {
    const ayahs = await db
      .selectFrom("translation as a")
      .innerJoin("edition as e", "a.editionId", "e.id")
      .innerJoin("ayahInfo as ai", (join) =>
        join
          .onRef("a.surahNumber", "=", "ai.surahNumber")
          .onRef("a.ayahNumber", "=", "ai.ayahNumber"))
      .selectAll()
      .where("a.surahNumber", "=", surahNumber)
      .where("e.name", "=", editionName)
      .orderBy("a.ayahNumber", "asc")
      .execute();

    return ayahs;
  } catch (error) {
    console.error("Error fetching ayahs:", error);
    throw new Error("Failed to fetch ayahs");
  }
}

/**
 * Retrieves the Ayah by the given Surah number, Ayah number, and Edition ID.
 * @param db - The database instance.
 * @param surahNumber - The Surah number.
 * @param ayahNumber - The Ayah number.
 * @param editionId - The Edition ID.
 * @returns A Promise that resolves to the Ayah matching the given Surah number, Ayah number, and Edition ID.
 */
export async function getAyahBySurahNumberAyahNumberAndEditionID(
  db: Kysely<Database>,
  surahNumber: number,
  ayahNumber: number,
  editionId: number,
) {
  return db
    .selectFrom("ayah")
    .selectAll()
    .where("surahNumber", "=", surahNumber)
    .where("ayahNumber", "=", ayahNumber)
    .where("editionId", "=", editionId)
    .execute();
}

/**
 * Retrieves the Ayahs by the specified edition ID.
 * @param db - The database instance.
 * @param editionId - The ID of the edition.
 * @returns A Promise that resolves to the Ayahs matching the specified edition ID.
 */
export async function getAyahsByEditionID(
  db: Kysely<Database>,
  editionId: number,
) {
  return db
    .selectFrom("ayah")
    .selectAll()
    .where("editionId", "=", editionId)
    .execute();
}
/**
 * Retrieves the ayahs by the specified surah number.
 *
 * @param surahNumber - The number of the surah.
 * @returns A promise that resolves to the ayahs matching the surah number.
 */
export async function getAyahsBySurahNumber(
  db: Kysely<Database>,
  surahNumber: number,
) {
  const statement = db
    .selectFrom("ayah")
    .selectAll()
    .where("surahNumber", "=", surahNumber);

  return statement.execute();
}
