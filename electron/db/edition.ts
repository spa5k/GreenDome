import type { Kysely } from "kysely";
import { type Database } from "./schema";

/**
 * Fetch all editions where type is TRANSLATION.
 */
export async function getTranslations(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("type", "=", "TRANSLATION")
    .execute();
}
/**
 * Fetch all editions where type is QURAN.
 */
export async function getQuran(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("type", "=", "QURAN")
    .execute();
}

/**
 * Fetch all editions where type is TRANSLITERATION.
 */
export async function getTransliterations(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("type", "=", "TRANSLITERATION")
    .execute();
}

/**
 * Fetch all editions where type is QURAN_TRANSLITERATION.
 */
export async function getQuranTransliterations(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("type", "=", "QURAN_TRANSLITERATION")
    .execute();
}

/**
 * Fetch editions by type.
 * @param type - The type of the edition.
 */
export async function getEditionsByType(db: Kysely<Database>, type: string) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("type", "=", type)
    .execute();
}

/**
 * Fetch edition by ID.
 * @param id - The ID of the edition.
 */
export async function getEditionByID(db: Kysely<Database>, id: number) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
}

/**
 * Fetch edition by name.
 * @param name - The name of the edition.
 */
export async function getEditionByName(db: Kysely<Database>, name: string) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("name", "=", name)
    .executeTakeFirst();
}

/**
 * Fetch all editions.
 */
export async function getEditions(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .execute();
}

/**
 * Fetch all enabled editions.
 */
export async function getEnabledEditions(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("enabled", "=", 1)
    .execute();
}

/**
 * Fetch all disabled editions.
 */
export async function getDisabledEditions(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("enabled", "=", 0)
    .execute();
}

/**
 * Fetch editions by language.
 * @param language - The language of the edition.
 */
export async function getEditionsByLanguage(db: Kysely<Database>, language: string) {
  return db
    .selectFrom("edition")
    .selectAll()
    .where("language", "=", language)
    .execute();
}

/**
 * Fetch distinct languages.
 */
export async function getLanguages(db: Kysely<Database>) {
  return db
    .selectFrom("edition")
    .select("language")
    .groupBy("language")
    .execute();
}
