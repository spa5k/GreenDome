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

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features          # feature based modules
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

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/features/awesome-feature
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
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

Everything from a feature should be exported from the `index.ts` file which behaves as the public API of the feature.

You should import stuff from other features only by using:

```js
import { AwesomeComponent } from '@/features/awesome-feature';
```

and not

```js
import { AwesomeComponent } from '@/features/awesome-feature/components/AwesomeComponent';
```

## 6. Things to check -

- [ahooks](https://ahooks.js.org/)
- [react-query](react-query-v3.tanstack.com/)
- [legend-state](https://legendapp.com/open-source/state/)

## 7. Themes.

1. Primary
2. Secondary
3. Text
4. Other
5. Background

### 1. Default theme.

- #152C5D
- #1A2744
- #FCFCFD
- #090B13
- #121B31

### 2. Other (WIP)

- #152C5D
- #1A2744
- #FCFCFD
- #090B13
- #121B31

### 3. Other (WIP)

- #152C5D
- #1A2744
- #FCFCFD
- #090B13
- #121B31
