// vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ✅ Declare the Gemini API key property
  readonly VITE_GEMINI_API_KEY: string
  
  // Add any other custom environment variables you use here
  // readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}