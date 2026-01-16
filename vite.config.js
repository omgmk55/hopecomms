import { defineConfig } from 'vite'

export default defineConfig({
    base: '/hopecomms/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                services: 'services.html',
                realisations: 'realisations.html',
                about: 'about.html',
                contact: 'contact.html',
            },
        },
    },
})
