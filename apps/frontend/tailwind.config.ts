import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary, #dddddd)",
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                code: ["var(--font-code)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
