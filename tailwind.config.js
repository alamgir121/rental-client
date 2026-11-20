/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: { fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], display: ["Poppins", "Inter", "sans-serif"] } } },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      { light: { primary: "#d97706", "primary-content": "#ffffff", secondary: "#1f2937", accent: "#0f766e", neutral: "#1f2937", "base-100": "#ffffff", "base-200": "#f8f5f0", "base-300": "#e7e1d6" } },
      { dark: { primary: "#f59e0b", "primary-content": "#111827", secondary: "#e5e7eb", accent: "#2dd4bf", neutral: "#0b1220", "base-100": "#111827", "base-200": "#0b1220", "base-300": "#1f2937" } },
    ],
  },
};
