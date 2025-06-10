import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        apps: 'apps.html',
        submit: 'submit.html'
      }
    }
  }
}) 