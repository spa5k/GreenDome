use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};

use crate::db::DbResult;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Surahs {
    id: i64,
    // revelation_order: String,
    // bismillah_pre: String,
    name_simple: String,
    // name_complex: String,
    // name_arabic: String,
    // ayah_start: String,
    // ayah_end: String,
    // surahs_type: String,
    // page_start: String,
    // page_end: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SurahVector {
    surah: Vec<Surahs>,
}

pub(crate) async fn get_surahs(pool: &SqlitePool) -> DbResult<Vec<Surahs>> {
    const SQL1: &str = "SELECT id,name_simple FROM surahs ORDER BY id ASC";
    let rows: Vec<Surahs> = sqlx::query_as(SQL1).fetch_all(pool).await?;
    let mut surah_vector = SurahVector { surah: Vec::new() };

    for surah in rows {
        surah_vector.surah.push(Surahs {
            name_simple: surah.name_simple,
            id: surah.id,
        })
    }
    Ok(surah_vector.surah)
}
