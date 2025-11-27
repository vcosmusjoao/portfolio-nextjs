const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        highlight: "var(--color-highlight)",
      },
      fontFamily: {
        "fira-code": ["var(--font-fira-code)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

export default config;
