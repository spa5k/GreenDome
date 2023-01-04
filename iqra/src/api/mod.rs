use std::path::PathBuf;

use rspc::Config;
pub use rspc::RouterBuilder;

#[derive(Clone)]
pub struct Ctx {}

pub type Router = rspc::Router<Ctx>;

pub(crate) fn new() -> RouterBuilder<Ctx> {
    Router::new()
        .query("version", |t| t(|_, _: ()| env!("CARGO_PKG_VERSION")))
        .config(
            Config::new()
                // Doing this will automatically export the bindings when the `build` function is called.
                .export_ts_bindings(
                    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                        .join("../tanzil/src/utils/bindings.ts"),
                ),
        )
}
