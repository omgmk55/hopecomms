import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/hopecomms/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                services: resolve(__dirname, 'services.html'),
                realisations: resolve(__dirname, 'realisations.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
})
