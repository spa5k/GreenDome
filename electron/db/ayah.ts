import { eq, sql } from "drizzle-orm";
import { db } from ".";
import { ayah } from "./schema";

/**
 * Retrieves the Ayahs (verses) by the given Surah number and Edition ID.
 * @param surahNumber - The Surah number.
 * @param editionId - The Edition ID.
 * @returns A Promise that resolves to the Ayahs matching the given Surah number and Edition ID.
 */
export function getAyahsBySurahNumberAndEditionID(
  surahNumber: number,
  editionId: number,
) {
  return db
    .select()
    .from(ayah)
    .where(
      sql`
    ${eq(ayah.surahNumber, surahNumber)} and ${eq(ayah.editionId, editionId)}
  `,
    )
    .all();
}

/**
 * Retrieves the Ayah by the given Surah number, Ayah number, and Edition ID.
 * @param surahNumber - The Surah number.
 * @param ayahNumber - The Ayah number.
 * @param editionId - The Edition ID.
 * @returns A Promise that resolves to the Ayah matching the given Surah number, Ayah number, and Edition ID.
 */
export function getAyahBySurahNumberAyahNumberAndEditionID(
  surahNumber: number,
  ayahNumber: number,
  editionId: number,
) {
  return db
    .select()
    .from(ayah)
    .where(
      sql`
    ${eq(ayah.surahNumber, surahNumber)} and ${
        eq(
          ayah.ayahNumber,
          ayahNumber,
        )
      } and ${eq(ayah.editionId, editionId)}
  `,
    )
    .all();
}

/**
 * Retrieves the Ayahs by the specified edition ID.
 * @param editionId - The ID of the edition.
 * @returns A Promise that resolves to the Ayahs matching the specified edition ID.
 */
export function getAyahsByEditionID(editionId: number) {
  return db
    .select()
    .from(ayah)
    .where(sql`${eq(ayah.editionId, editionId)}`)
    .all();
}

/**
 * Retrieves the ayahs by the specified surah number.
 *
 * @param surahNumber - The number of the surah.
 * @returns A promise that resolves to the ayahs matching the surah number.
 */
export async function getAyahsBySurahNumber(surahNumber: number) {
  const statement = db
    .select()
    .from(ayah)
    .where(sql`${eq(ayah.surahNumber, surahNumber)}`);

  const sqlStatement = statement.toSQL();
  console.log(sqlStatement);

  return statement.all();
}
