use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};

use crate::db::DbResult;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Surahs {
    id: i64,
    revelation_order: i64,
    bismillah_pre: String,
    name_simple: String,
    name_complex: String,
    name_arabic: String,
    ayah_start: i64,
    ayah_end: i64,
    page_start: i64,
    page_end: i64,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SurahVector {
    surah: Vec<Surahs>,
}

pub(crate) async fn get_surah_list(pool: &SqlitePool) -> DbResult<Vec<Surahs>> {
    const SQL1: &str = "SELECT * FROM surahs ORDER BY id ASC";
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

pub(crate) async fn get_one_surah(pool: &SqlitePool, number: i32) -> DbResult<Surahs> {
    const SQL1: &str = "SELECT * FROM surahs where id = ?";
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
