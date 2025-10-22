/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                // Light mode color system - "Warm Brutalist Minimalism"
                'bg-primary': '#FAF9F6',
                'bg-secondary': '#FFF8F0',
                'bg-tertiary': '#F5F1E8',
                'text-primary': '#1A1A1A',
                'text-secondary': '#4A4A4A',
                'text-tertiary': '#6B6B6B',
                'accent-terracotta': '#E07A5F',
                'accent-sage': '#81B29A',
                'accent-navy': '#2D3142',
                'accent-amber': '#F3B664',
                'accent-orange': '#F4A261',

                // Legacy colors (keeping for gradual migration)
                primary: '#FAF9F6',
                secondary: '#4A4A4A',
                tertiary: '#FFF8F0',
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                soft: '0 8px 30px rgba(26, 26, 26, 0.08)',
                'soft-hover': '0 12px 40px rgba(26, 26, 26, 0.12)',
                card: '0 8px 30px rgba(26, 26, 26, 0.08)',
            },
            screens: {
                xs: '450px',
            },
            backgroundImage: {
                'hero-pattern': "url('/src/assets/herobg.png')",
            },
        },
    },
    plugins: [],
};
