use std::env;

use crate::db::DbPool;

#[tauri::command]
pub async fn surah_list(pool: tauri::State<'_, DbPool>) -> Result<String, String> {
    println!("{:?}", env::current_dir());

    let mut connection = pool.acquire().await.unwrap();
    let rows_affected = sqlx::query!(
        r#"
    select * from surahs limit 1
            "#,
    )
    .fetch_one(&mut connection)
    .await
    .unwrap();
    println!("{:?}", rows_affected);
    Ok("nice".to_string())
}
