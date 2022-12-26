use std::str::FromStr;

use anyhow::{Ok, Result};
use sqlx::{sqlite::SqliteConnectOptions, Connection, SqliteConnection};
use tracing::info;

pub async fn setup_db() -> Result<SqliteConnection> {
    let opts = SqliteConnectOptions::from_str("sqlite:crates/iqra/data/quran.db")?
        .extension("sqlite_zstd");

    let conn = SqliteConnection::connect_with(&opts).await?;

    info!("DB SETUP SUCCESSFUL");
    Ok(conn)
}
