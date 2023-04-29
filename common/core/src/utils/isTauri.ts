// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../global.d.ts" />

export const isClient = typeof window !== 'undefined';

export const isTauri = isClient && window?.__TAURI_METADATA__ ? true : false;
