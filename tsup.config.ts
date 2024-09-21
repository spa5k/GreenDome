import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./electron/src", "./electron/db"],
  splitting: false,
  sourcemap: false,
  clean: true,
  cjsInterop: true,
  skipNodeModulesBundle: true,
  treeshake: true,
  outDir: "build",
  external: ["electron"],
  format: ["esm", "cjs"],
  bundle: false,
  target: "node22",
});
