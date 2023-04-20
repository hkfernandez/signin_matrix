const path = require("path");

module.exports = {
  entry: {
    signin: "/app/static/js/signupPage.js",
    quotes: "/app/static/js/quotes.js",
  },
  output: {
    path: path.resolve(__dirname, "app/static/dist"),
    filename: "[name].bundle.js",
  },
  module: {
    //rules: [{ test: /\.html$/, use: "html-loader" }],
  },
  // maps the built code back to the original source format when debugging
  devtool: "eval-source-map",
};
