import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Prompt-Generator/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
    },
})
