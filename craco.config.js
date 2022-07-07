const path = require("path")
module.exports = {
  ...require("dotenv/config"),
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
}
