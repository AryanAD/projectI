import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBgColor: "#98BDFF",
        colBgColor: "#98BDFF90",
      },
    },
  },
  plugins: [],
} satisfies Config;
