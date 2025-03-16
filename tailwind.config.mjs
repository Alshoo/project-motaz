/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        primary: "var(--primary)",
        perpel: "var(--perpel)",
        green: "var(--green)",
        greenWhite: "var(--greenWhite)",
        greenOpacity: "var(--greenOpacity)",
        blackOpacity: "var(--blackOpacity)",
        blue: "var(--blue)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
