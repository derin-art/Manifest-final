module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Radio : ["RadioLand", "san-serif"],
        Digital : ["Digital", "san-serif"],
        DigitalAlt : ["DigitalAlt", "san-serif"], 
        SegmentLED: ["SegmentLED", "san-serif"],
        Poppins: ["Poppins", "san-serif"],
        Oswald: ["Oswald", "san-serif"]
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      }
    },
  },
  plugins: [],
}
