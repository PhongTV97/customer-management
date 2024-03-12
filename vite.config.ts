import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_APP_BASE_URL,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'process.env.VITE_APP_API_URL': JSON.stringify(env.VITE_APP_API_URL),
      'process.env.VITE_APP_LOCALES': JSON.stringify(env.VITE_APP_LOCALES)
    }
  }
})
