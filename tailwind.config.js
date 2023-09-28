/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#f3f4f6",
        tex700: "#374151",
        tex400: "#94a3b8",
        tex500: "#64748b",
        tex100: "#f1f5f9",
        tex300: "#d1d5db",
        white: "#fff",
        primar700: "#4338ca",
        primar600: "#4f46e5",
        primar100: "#e0e7ff",
        rose500: "#f43f5e",
      },
      gridTemplateColumns: {
        gridAuto: "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
