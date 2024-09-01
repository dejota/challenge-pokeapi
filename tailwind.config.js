/** @type {import('tailwindcss').Config} */

const colors = {
  accent: "#F22539",
  "accent-pressed": "#C00E20",
  primary: "#353535",
  secondary: "#5E5E5E",
  favorite: "#ECA539",
  white: "#ffffff",
  light: "#F9F9F9",
  soft: "#F5F5F5",
  gray: "#E8E8E8",
  disabled: "#BFBFBF",
  transparent: "transparent",
  current: "currentColor",
};

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      boxShadow: {
        center: '0 -4px 6px 0 rgba(0, 0, 0, 0.1)',
        input: '0px 2px 10px 0px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
