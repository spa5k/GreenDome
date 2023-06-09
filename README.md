 # Installation Guide for Quran App

## Tooling

Install [rust](https://www.rust-lang.org/tools/install), [node](https://nodejs.org) and [pnpm](https://pnpm.io/)

Follow this guide for all OS.
[Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
</details>



## Proceed to installation 

```bash
git clone https://github.com/spa5k/quran
cd quran
pnpm install
```
## To run the app
```
pnpm tauri dev 
```
runs the whole app

### Specific way
```bash
pnpm vite dev
```
to run vite SPA
or 

```bash
pnpm next dev
```
to run nextjs ssr


## Component Structure - 

We are following bulletproof react project structure - https://reacthandbook.dev/project-structure

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
