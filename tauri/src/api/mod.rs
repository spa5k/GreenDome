use std::{path::PathBuf, sync::Arc};

use rspc::Config;
pub use rspc::RouterBuilder;

use crate::queries::surah::{
    get_editions, get_surah_info, get_surah_list, get_surah_text, get_translation_with_edition,
};

use rspc::Type;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

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
            t(|ctx, input: TranslationEdition| async move {
                let surahs = get_surah_text(&ctx.db, input.number, input.edition)
                    .await
                    .unwrap();
                Ok(surahs)
            })
        })
        .query("translations", |t| {
            t(|ctx, input: TranslationEdition| async move {
                let surahs = get_translation_with_edition(&ctx.db, input.number, input.edition)
                    .await
                    .unwrap();
                Ok(surahs)
            })
        })
        .query("editions", |t| {
            t(|ctx, input: EditionsType| async move {
                let surahs = get_editions(&ctx.db, input.edition).await.unwrap();
                Ok(surahs)
            })
        })
        .config(
            Config::new()
                // Doing this will automatically export the bindings when the `build` function is called.
                .export_ts_bindings(
                    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                        .join("../common/core/src/utils/bindings.ts"),
                ),
        )
}
#[derive(Debug, Serialize, Deserialize, FromRow, Type)]
pub struct TranslationEdition {
    edition: String,
    number: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Type)]
pub struct EditionsType {
    edition: EditionsEnum,
}

#[derive(Debug, Serialize, Deserialize, Type)]
pub enum EditionsEnum {
    Quran,
    Translation,
    Transliteration,
}
