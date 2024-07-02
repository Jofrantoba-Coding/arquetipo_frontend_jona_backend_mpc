const autoprefixer = require("autoprefixer");
const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    postcssNormalize(),
    autoprefixer,
  ],
};