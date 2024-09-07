import { eq } from "drizzle-orm";
import { db } from ".";
import { edition } from "./schema";

// fetch all editions where type is translation
export function getTranslations() {
  return db.select().from(edition).where(eq(edition.type, "TRANSLATION")).all();
}

// fetch all editions where type is QURAN
export function getQuran() {
  return db.select().from(edition).where(eq(edition.type, "QURAN")).all();
}

// fetch all editions where type is TRANSLITERATION
export function getTransliterations() {
  return db
    .select()
    .from(edition)
    .where(eq(edition.type, "TRANSLITERATION"))
    .all();
}

// fetch all editions where type is QURAN_TRANSLITERATION
export function getQuranTransliterations() {
  return db
    .select()
    .from(edition)
    .where(eq(edition.type, "QURAN_TRANSLITERATION"))
    .all();
}

// fetch all editions where type is type
export function getEditionsByType(type: string) {
  return db.select().from(edition).where(eq(edition.type, type)).all();
}

// fetch edition by id
export function getEditionByID(id: number) {
  return db.select().from(edition).where(eq(edition.id, id)).get();
}

// fetch edition by name
export function getEditionByName(name: string) {
  return db.select().from(edition).where(eq(edition.name, name)).get();
}

// fetch all editions
export function getEditions() {
  return db.select().from(edition).all();
}

// fetch all enabled editions
export function getEnabledEditions() {
  return db.select().from(edition).where(eq(edition.enabled, 1)).all();
}

// fetch all disabled editions
export function getDisabledEditions() {
  return db.select().from(edition).where(eq(edition.enabled, 0)).all();
}

// fetch editions by language
export function getEditionsByLanguage(language: string) {
  return db.select().from(edition).where(eq(edition.language, language)).all();
}

// fetch languages
export function getLanguages() {
  return db
    .select({ language: edition.language })
    .from(edition)
    .groupBy(edition.language)
    .all();
}
