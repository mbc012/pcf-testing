/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/**/*.{ts,tsx}",
        "./**/*.{ts,tsx}",
        "!./node_modules/**/*.{ts,tsx}",
        "./ReactComponent/*.{ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    variants: {
        extend: {
            backgroundColor: ['last']
        }
    }
}