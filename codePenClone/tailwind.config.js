/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {screens: {
      '2xs': '200px',   // Smallest screens (phones)
      'xs': '430px',   // Smaller screens (phones)
      'sm': '640px',   // Small screens (phones)
      'md': '768px',   // Medium screens (tablets)
      'lg': '1024px',  // Large screens (desktops)
      'xl': '1280px',  // Extra large screens (larger desktops)
      'desktop': '1440px', // Custom breakpoint for larger desktops
      '2xl': '1536px' // 2x Extra large screens (large monitors)

    },
},
  },
  plugins: [],
}