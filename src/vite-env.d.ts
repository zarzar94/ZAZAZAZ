/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLINIC_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}