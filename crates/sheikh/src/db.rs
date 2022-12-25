use anyhow::{Ok, Result};
use sqlx::{sqlite::SqlitePool, Pool, Sqlite};
use tracing::info;

pub async fn setup_db() -> Result<Pool<Sqlite>> {
    let pool = SqlitePool::connect("sqlite:./crates/sheikh/src/dev.db").await?;
    info!("DB SETUP SUCCESSFUL");
    Ok(pool)
}
