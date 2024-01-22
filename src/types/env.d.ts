declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERCEL_URL: string
      VERCEL_URL: string
      EMAIL_ADDRESS: string
      EMAIL_PASSWORD: string
      MONGODB_URI: string
      NEXT_PUBLIC_BACKEND_URL: string
    }
  }
}

export {}
