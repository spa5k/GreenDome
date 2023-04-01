# Quran

## INFO -

1. Tanzil - Vite based app.
2. Iqra - Tauri backend

## 1. Instructions to prepare

1. Install rust.

2. Install NodeJS

3. Clone the repo, install pnpm.

4. run `pnpm install`

5. run `cargo install tauri-cli`

## 2. How to run

### Run apps separately.

1. Check their name -
2. Do `pnpm tanzil dev`
3. This will run that app separately.
4. If it needs data from Tauri, it won't be available this way.

### Run full setup

1. In the main folder of repo do -
   1.1. `cargo tauri dev`, this will launch the full Tauri backend, so data that is needed will be available.
   1.2. It is wired to the `tanzil` package, which is our main package.

## 3. Setup of editor.

1. Install eslint, dprint, tauri extension.

## 4. How to contribute.

Please check the issues.

# 6. 🗄️ Project Structure

```
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features          # feature based modules

    /awesome-feature
    |
    +-- api         # exported API request declarations and api hooks related to a specific feature
    |
    +-- assets      # assets folder can contain all the static files for a specific feature
    |
    +-- components  # components scoped to a specific feature
    |
    +-- hooks       # hooks scoped to a specific feature
    |
    +-- routes      # route components for a specific feature pages
    |
    +-- stores      # state stores for a specific feature
    |
    +-- types       # TypeScript types for TS specific feature domain
    |
    +-- utils       # utility functions for a specific feature
    |
    +-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature

|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```
