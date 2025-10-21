/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                // Sophisticated neutral palette
                accent: '#E0E0E0',
                'accent-hover': '#FFFFFF',
                dark: '#0A0A0A',
                'dark-lighter': '#1A1A1A',
                'dark-card': '#121212',
                light: '#F5F5F5',
                muted: '#808080',
                'muted-dark': '#4A4A4A',
                border: '#2A2A2A',
                // Subtle accent for interactive elements
                'subtle-accent': '#D4D4D4',
                // Legacy colors
                primary: '#0A0A0A',
                secondary: '#aaa6c3',
                tertiary: '#151030',
                fortiary: '#05071a',
                'black-100': '#100d25',
                'black-200': '#090325',
                'white-100': '#f3f3f3',
            },
            boxShadow: {
                card: '0px 4px 24px rgba(0, 0, 0, 0.4)',
                'card-hover': '0px 8px 40px rgba(0, 0, 0, 0.6)',
                subtle: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            },
            screens: {
                xs: '450px',
            },
            backgroundImage: {
                'hero-pattern': "url('/src/assets/herobg.png')",
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
