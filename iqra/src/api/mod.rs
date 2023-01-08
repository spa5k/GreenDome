use std::{path::PathBuf, sync::Arc};

use rspc::Config;
pub use rspc::RouterBuilder;

use crate::queries::surah::{get_surah_info, get_surah_list, get_surah_text};

#[derive(Clone)]
pub struct Ctx {
    pub db: Arc<sqlx::SqlitePool>,
}

pub type Router = rspc::Router<Ctx>;

pub(crate) fn new() -> RouterBuilder<Ctx> {
    Router::new()
        .query("version", |t| t(|_, _: ()| env!("CARGO_PKG_VERSION")))
        .query("surah_list", |t| {
            t(|ctx, _args: ()| async move {
                let surahs = get_surah_list(&ctx.db).await.unwrap();
                Ok(surahs)
            })
        })
        .query("surah_info", |t| {
            t(|ctx, input: i32| async move {
                let surahs = get_surah_info(&ctx.db, input).await.unwrap();
                Ok(surahs)
            })
        })
        .query("ayahs", |t| {
            t(|ctx, input: i32| async move {
                let surahs = get_surah_text(&ctx.db, input).await.unwrap();
                Ok(surahs)
            })
        })
        .config(
            Config::new()
                // Doing this will automatically export the bindings when the `build` function is called.
                .export_ts_bindings(
                    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                        .join("../tanzil/src/utils/bindings.ts"),
                ),
        )
}