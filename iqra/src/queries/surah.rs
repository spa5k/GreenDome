use rspc::Type;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};

use crate::db::DbResult;

#[derive(Debug, Serialize, Deserialize, FromRow, Type)]
#[serde(rename_all = "camelCase")]
pub struct Surahs {
    id: i32,
    revelation_order: i32,
    bismillah_pre: String,
    name_simple: String,
    name_complex: String,
    name_arabic: String,
    ayah_start: i32,
    ayah_end: i32,
    page_start: i32,
    page_end: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Type)]
#[serde(rename_all = "camelCase")]
pub struct Ayah {
    ayah: i32,
    surah: i32,
    text: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SurahVector {
    surah: Vec<Surahs>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct AyahVector {
    ayahs: Vec<Ayah>,
}

pub(crate) async fn get_surah_list(pool: &SqlitePool) -> DbResult<Vec<Surahs>> {
    const SQL1: &str = r#"
		SELECT * FROM surahs ORDER BY id ASC;
		"#;
    let rows: Vec<Surahs> = sqlx::query_as(SQL1).fetch_all(pool).await?;
    let mut surah_vector = SurahVector { surah: Vec::new() };

    for surah in rows {
        surah_vector.surah.push(Surahs {
            name_simple: surah.name_simple,
            id: surah.id,
            ayah_end: surah.ayah_end,
            ayah_start: surah.ayah_start,
            bismillah_pre: surah.bismillah_pre,
            name_arabic: surah.name_arabic,
            name_complex: surah.name_complex,
            page_end: surah.page_end,
            page_start: surah.page_start,
            revelation_order: surah.revelation_order,
        })
    }
    Ok(surah_vector.surah)
}

pub(crate) async fn get_surah_info(pool: &SqlitePool, number: i32) -> DbResult<Surahs> {
    const SQL1: &str = r#"
		SELECT * FROM surahs where id = ?;
		"#;
    let surah: Surahs = sqlx::query_as(SQL1).bind(number).fetch_one(pool).await?;

    Ok(Surahs {
        name_simple: surah.name_simple,
        id: surah.id,
        ayah_end: surah.ayah_end,
        ayah_start: surah.ayah_start,
        bismillah_pre: surah.bismillah_pre,
        name_arabic: surah.name_arabic,
        name_complex: surah.name_complex,
        page_end: surah.page_end,
        page_start: surah.page_start,
        revelation_order: surah.revelation_order,
    })
}

pub(crate) async fn get_surah_text(
    pool: &SqlitePool,
    number: i32,
    edition: String,
) -> DbResult<Vec<Ayah>> {
    const SQL1: &str = r#"
		SELECT * FROM quran where surah = ? and key= ?"#;
    let rows: Vec<Ayah> = sqlx::query_as(SQL1)
        .bind(number)
        .bind(edition)
        .fetch_all(pool)
        .await?;
    let mut ayah_vector = AyahVector { ayahs: Vec::new() };

    for ayah in rows {
        ayah_vector.ayahs.push(Ayah {
            ayah: ayah.ayah,
            surah: ayah.surah,
            text: ayah.text,
        })
    }
    Ok(ayah_vector.ayahs)
}

pub(crate) async fn get_translation_with_edition(
    pool: &SqlitePool,
    number: i32,
    edition: String,
) -> DbResult<Vec<Ayah>> {
    const SQL1: &str = r#"
		SELECT * FROM quran where surah = ? and key=?"#;
    let rows: Vec<Ayah> = sqlx::query_as(SQL1)
        .bind(number)
        .bind(edition)
        .fetch_all(pool)
        .await?;

    let mut ayah_vector = AyahVector { ayahs: Vec::new() };

    for ayah in rows {
        ayah_vector.ayahs.push(Ayah {
            ayah: ayah.ayah,
            surah: ayah.surah,
            text: ayah.text,
        })
    }
    Ok(ayah_vector.ayahs)
}
