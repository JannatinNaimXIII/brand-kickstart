import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary-color)",
                background: "var(--background-color)",
            },
        },
    },
    plugins: [],
};
export default config;
