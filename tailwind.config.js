/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                primary: '#FF6A00',
                secondary: '#f97316',
                textSecondary: '#666666',
            }
        },
    },
    plugins: [],
}