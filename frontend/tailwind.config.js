/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                surface: "rgba(20, 20, 20, 0.6)",
                surfaceBorder: "rgba(255, 255, 255, 0.08)",
                primary: "#7e22ce", // Vivid violet
                secondary: "#06b6d4" // Neon cyan
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }
        },
    },
    plugins: [],
}
