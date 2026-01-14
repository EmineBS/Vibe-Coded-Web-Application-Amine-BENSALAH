export default {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                amazon: {
                    dark: '#131921',
                    light: '#232f3e',
                    DEFAULT: '#131921',
                    hover: '#485769',
                },
                primary: {
                    DEFAULT: '#febd69', // Amazon yellow button
                    hover: '#f2a742',
                },
                secondary: {
                    DEFAULT: '#f0c14b',
                },
                link: {
                    DEFAULT: '#007185',
                    hover: '#c7511f',
                },
                gray: {
                    bg: '#f3f3f3', // Amazon light gray background
                }
            },
            fontFamily: {
                sans: ['Amazon Ember', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
