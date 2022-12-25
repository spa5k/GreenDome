# Quran

## INFO -

### TS Based

1. Mushaf - quran page display
2. Salah - salah timings
3. Tanzil	- main quran app interacting with tauri
4. Tarteel - recitation of verses
5. Scraper - related to getting data from various apis. Need better name
6. eslint-config-custom - global eslint config
7. tsconfig - global tsconfig

## Rust Based

1. Iqra - Tauri backend
2. Sheikh - Related to managing database and data.

## 1. Instructions to prepare

1. Install rust.

2. Install NodeJS

3. Clone the repo

4. run `corepack enable` or install pnpm.

5. run `pnpm install`

6. run `cargo install tauri-cli`

## 2. How to run

### Run apps separately.

1. Check their name -
2. Do `pnpm APP_NAME dev`
3. This will run that app separately.
4. If it needs data from Tauri, it won't be available this way.

### Run full setup

1. In the main folder of repo do -
   1.1. `cargo tauri dev`, this will launch the full Tauri backend, so data that is needed will be available.
   1.2. It is wired to the `tanzil` package, which is our main package.

## 3. Goals

1. Get initial Qur'an data for display.
2. Setup SQLite and various stuff needed in rust backend.
3. Use dummy data in apps until the database is initially ready.
4. After it's all done, a NextJS website for the app.

## 4. Setup of editor.

1. Install eslint, dprint, tauri extension.

## 5. How to contribute.

Please check the issues.
