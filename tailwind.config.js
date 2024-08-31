/** @type {import('tailwindcss').Config} */

const colors = {
  accent: "#F22539",
  "accent-pressed": "#C00E20",
  primary: "#353535",
  secondary: "#5E5E5E",
  favourite: "#ECA539",
  white: "#ffffff",
  light: "#F9F9F9",
  disabled: "#BFBFBF",
  transparent: "transparent",
  current: "currentColor",
};

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
};
