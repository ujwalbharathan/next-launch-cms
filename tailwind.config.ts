import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4169E1",
                secondary: "#F8F9FA",
                accent: "#FF6B6B",
            },
            fontFamily: {
                sans: ["Manrope", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
