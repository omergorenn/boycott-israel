import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: ['..', '.']
    }
  },
  assetsInclude: ['**/*.json'],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        apps: 'apps.html',
        submit: 'submit.html',
        admin: 'admin.html'
      }
    }
  }
}) 