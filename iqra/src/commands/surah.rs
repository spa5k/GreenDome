use tauri::State;

use crate::queries::surah::{get_one_surah, get_surah_list, Surahs};

#[tauri::command]
pub async fn get_surahs(sqlite_pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<Surahs>, String> {
    let columns = get_surah_list(&sqlite_pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(columns)
}

#[tauri::command]
pub async fn get_surah(
    sqlite_pool: State<'_, sqlx::SqlitePool>,
    number: i32,
) -> Result<Surahs, String> {
    let columns = get_one_surah(&sqlite_pool, number)
        .await
        .map_err(|e| e.to_string())?;
    Ok(columns)
}
