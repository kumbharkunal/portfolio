/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#000000',
                    surface: '#050505',
                    card: 'rgba(255,255,255,0.03)',
                    primary: '#00E5C1',
                    accent: '#63E6FF',
                    text: '#E6F7FF',
                    'subtle-text': '#A8B7C5',
                },
                light: {
                    bg: '#F7FBFF',
                    surface: '#FFFFFF',
                    card: 'rgba(0,0,0,0.04)',
                    primary: '#0BAF97',
                    accent: '#00B7FF',
                    text: '#1A1F27',
                    'subtle-text': '#51606F',
                },
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { opacity: '0.5' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
