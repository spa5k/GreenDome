use tauri::State;

use crate::{
    db,
    queries::surah::{get_surahs, Surahs},
};

#[tauri::command]
pub async fn get_surah(sqlite_pool: State<'_, sqlx::SqlitePool>) -> Result<Vec<Surahs>, String> {
    let columns = get_surahs(&*sqlite_pool).await.map_err(|e| e.to_string())?;
    Ok(columns)
}
