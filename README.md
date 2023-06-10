# Installation Guide for Quran App

## Tooling

Before proceeding with the installation, ensure that you have the following tools installed on your system:

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io/)

Please refer to the following guide for detailed instructions on installing the prerequisites for your specific operating system: [Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## Proceed to installation

```bash
git clone https://github.com/spa5k/quran
cd quran
pnpm install
```

## To run the full app

```bash
pnpm tauri dev
```

### Run in specific manner -

- to run vite SPA

```bash
pnpm vite dev
```

- to run nextjs ssr

```bash
pnpm next dev
```

# Component Structure -

- We are following bulletproof react project structure - https://reacthandbook.dev/project-structure

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

Make sure to follow this structure to maintain code organization and scalability.

If you have any further questions or need assistance with the installation, feel free to ask.

# How is project setup.

We've added wrappers for the @quran/core, in both nextjs and vite, making sure that it working with Tauri(vite) and when we need SSR, it can be done through nextjs. Check some examples here - [Next](apps/next/src/providers/EnvironmentProvider.tsx) [Vite](apps/vite/src/providers/EnvironmentProvider.tsx)

Basically we have mapped the platform specific features into generics so that it's not a problem when using same code.

# API Structure

The aim is to make sure that, it runs Offline during Tauri through the SQLite database, and when we need to run it on the web, we can use the API endpoints.

Check examples here -

1. Editions API - [here](common\core\src\features\editions\api\index.ts)
2. Mushaf API - [here](common\core\src\features\mushaf\api\index.ts)
3. Salah API - [here](common\core\src\features\salah\api\index.ts)
4. Surah API - [here](common\core\src\features\surah\api\index.ts)

These APIs wrappers switch to local/internet endpoints based on the platform.

Another focus is that we can add more providers like Salah APIs from other public APIs other than just the app.
