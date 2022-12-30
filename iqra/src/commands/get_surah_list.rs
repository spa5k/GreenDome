use tauri::State;

use crate::queries::surah::{get_surah_list, Surahs};

#[tauri::command]
pub async fn get_surah(sqlite_pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<Surahs>, String> {
    let columns = get_surah_list(&sqlite_pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(columns)
}
