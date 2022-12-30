// use std::{env, str::FromStr};

// use anyhow::{Ok, Result};
// use sqlx::{sqlite::SqliteConnectOptions, Pool, Sqlite, SqlitePool};

// pub async fn setup_db() -> Result<Pool<Sqlite>> {
//     let db_file_path = env::current_dir()
//         .unwrap()
//         .join("iqra")
//         .join("data")
//         .join("quran.db");
//     // .extension("sqlite_zstd")
//     println!("{:?}", db_file_path);

//     let opts = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?.clone();

//     let pool = SqlitePool::connect_with(opts).await?;
//     Ok(pool)
// }

use std::{env, str::FromStr};

use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    SqlitePool,
};
pub type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub(crate) async fn create_sqlite_pool() -> DbResult<SqlitePool> {
    let db_file_path = env::current_dir().unwrap().join("data").join("quran.db");

    let connection_options = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Off)
        .synchronous(SqliteSynchronous::Normal);

    let sqlite_pool = SqlitePoolOptions::new()
        .connect_with(connection_options)
        .await?;

    Ok(sqlite_pool)
}
