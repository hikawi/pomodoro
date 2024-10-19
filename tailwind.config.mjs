/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        red: "#F87070",
        aqua: "#70F3F8",
        purple: "#D881F8",
        "light-blue": "#D7E0FF",
        "dark-blue": "#1E213F",
        "almost-white": "#EFF1FA",
        "darker-blue": "#161932",
      },
      fontFamily: {
        "kumbh-sans": ["Kumbh Sans", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
        "space-mono": ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
