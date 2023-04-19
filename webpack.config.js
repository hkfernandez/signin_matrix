const path = require("path");

module.exports = {
  entry: "/app/static/js/signupPage.js",
  output: {
    path: path.resolve(__dirname, "app/static"),
    filename: "bundle.js",
  },
  module: {
    rules: [{ test: /\.html$/, use: "html-loader" }],
  },
  // maps the built code back to the original source format when debugging
  devtool: "eval-source-map",
};

//module.exports = {
//  target: "web",
//  entry: {
//    app: ["./app/static"],
//  },
//  output: {
//    path: path.resolve(__dirname, "./app/build"),
//    filename: "bundle-front.js",
//  },
//  devServer: {
//    publicPath: "/assets/",
//    contentBase: path.resolve(__dirname, "./views"),
//    watchContentBase: true,
//    compress: true,
//    port: 9001,
//  },
//  devtool: "inline-source-map",
//};
