#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::Manager;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_log::LogTracer;
use tracing_subscriber::{filter::EnvFilter, layer::SubscriberExt, Registry};

use std::env;

mod commands;
mod db;
mod queries;

use dotenvy::dotenv;

use crate::commands::surah::{get_surah, get_surahs};

use crate::api::Ctx;

mod api;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let router = api::new().build().arced();
    router.export_ts("../../tanzil/src/types/rspc.ts").unwrap();

    LogTracer::init().expect("Unable to setup log tracer!");
    let app_name = concat!(env!("CARGO_PKG_NAME"), "-", env!("CARGO_PKG_VERSION")).to_string();
    let (non_blocking_writer, _guard) = tracing_appender::non_blocking(std::io::stdout());
    let bunyan_formatting_layer = BunyanFormattingLayer::new(app_name, non_blocking_writer);
    let subscriber = Registry::default()
        .with(EnvFilter::new("INFO"))
        .with(JsonStorageLayer)
        .with(bunyan_formatting_layer);
    tracing::subscriber::set_global_default(subscriber).unwrap();

    let sqlite_pool = db::create_sqlite_pool().await.unwrap();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router, || Ctx {}))
        .invoke_handler(tauri::generate_handler![greet, get_surahs, get_surah])
        .setup(|app| {
            app.manage(sqlite_pool);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
