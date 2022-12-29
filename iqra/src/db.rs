use std::{env, str::FromStr};

use anyhow::{Ok, Result};
use sqlx::{sqlite::SqliteConnectOptions, Pool, Sqlite, SqlitePool};
use tracing::info;

pub async fn setup_db() -> Result<DbPool> {
    print!("{:?}", env::current_dir());
    let db_file_path = env::current_dir().unwrap().join("data").join("quran.db");
    println!("{:?}", &db_file_path);
    let opts = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?;
    // .extension("sqlite_zstd")

    let conn = SqlitePool::connect_with(opts).await.unwrap();

    info!("DB SETUP SUCCESSFUL");
    Ok(conn)
}

pub type DbPool = Pool<Sqlite>;
