#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use anyhow::{Ok, Result};
use db::{setup_db, DbPool};
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_log::LogTracer;
use tracing_subscriber::{filter::EnvFilter, layer::SubscriberExt, Registry};

use crate::commands::get_surah_list::surah_list;

use std::{env, sync::Mutex};

mod commands;
mod db;
use dotenvy::dotenv;

struct Note(Mutex<DbPool>);

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    for (key, value) in env::vars() {
        println!("{}: {}", key, value);
    }

    LogTracer::init().expect("Unable to setup log tracer!");
    let app_name = concat!(env!("CARGO_PKG_NAME"), "-", env!("CARGO_PKG_VERSION")).to_string();
    let (non_blocking_writer, _guard) = tracing_appender::non_blocking(std::io::stdout());
    let bunyan_formatting_layer = BunyanFormattingLayer::new(app_name, non_blocking_writer);
    let subscriber = Registry::default()
        .with(EnvFilter::new("INFO"))
        .with(JsonStorageLayer)
        .with(bunyan_formatting_layer);

    let db_pool = setup_db().await?;

    tracing::subscriber::set_global_default(subscriber).unwrap();
    tauri::Builder::default()
        .manage(Note(db_pool.into()))
        .invoke_handler(tauri::generate_handler![surah_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}
