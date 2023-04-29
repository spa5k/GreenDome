use std::{env, str::FromStr};

use anyhow::Error;
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous},
    SqlitePool,
};
pub type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub(crate) async fn create_sqlite_pool() -> Result<SqlitePool, Error> {
    let sqlite_pool = SqlitePoolOptions::new()
        .connect_with(connection_options()?)
        .await?;

    Ok(sqlite_pool)
}

#[cfg(target_os = "linux")]
fn connection_options() -> Result<SqliteConnectOptions, Error> {
    // Get the path to the database file.
    let db_file_path = env::current_dir().unwrap().join("data").join("quran.db");
    // Create the options that will be used to connect to the database.
    let connection_options = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?
        // If the database file does not exist, create it.
        .create_if_missing(true)
        // Use the Zstandard compression algorithm to compress the database.
        .extension("data/libsqlite_zstd.so")
        // Disable journaling because this improves write performance.
        .journal_mode(SqliteJournalMode::Off)
        // Enable synchronous writes because this improves write performance.
        .synchronous(SqliteSynchronous::Normal);

    Ok(connection_options)
}

#[cfg(target_os = "macos")]
fn connection_options() -> Result<SqliteConnectOptions, Error> {
    // Get the path to the database file.
    let db_file_path = env::current_dir().unwrap().join("data").join("quran.db");

    // Create the options that will be used to connect to the database.
    let connection_options = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?
        // If the database file does not exist, create it.
        .create_if_missing(true)
        // Use the Zstandard compression algorithm to compress the database.
        .extension("data/libsqlite_zstd")
        // Disable journaling because this improves write performance.
        .journal_mode(SqliteJournalMode::Off)
        // Enable synchronous writes because this improves write performance.
        .synchronous(SqliteSynchronous::Normal);

    Ok(connection_options)
}

#[cfg(windows)]
fn connection_options() -> Result<SqliteConnectOptions, Error> {
    // Get the path to the database file.
    let db_file_path = env::current_dir().unwrap().join("data").join("quran.db");

    // Create the options that will be used to connect to the database.
    let connection_options = SqliteConnectOptions::from_str(db_file_path.to_str().unwrap())?
        // If the database file does not exist, create it.
        .create_if_missing(true)
        // Use the Zstandard compression algorithm to compress the database.
        .extension("data/sqlite_zstd")
        // Disable journaling because this improves write performance.
        .journal_mode(SqliteJournalMode::Off)
        // Enable synchronous writes because this improves write performance.
        .synchronous(SqliteSynchronous::Normal);

    Ok(connection_options)
}
