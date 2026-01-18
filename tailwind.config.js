/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.{html,js}", "./public/js/*.js"],
    theme: {
        extend: {
            colors: {
                'hope-dark': '#0c3a2d',
                'hope-green': '#4CAF50',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
