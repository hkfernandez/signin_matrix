const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: {
      main: "./static/js/index.js",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
      //adds the static path to the bundle.js path in the index.html when copied to dist
      publicPath: "./static",
    },
    target: "web", // needed or live reload fails
    devtool:
      argv.mode === "production" ? "cheap-source-map" : "inline-source-map",
    devServer: {
      contentBase: "dist",
      publicPath: "/",
      open: true,
      hot: false,
      liveReload: true,
      historyApiFallback: true, // SPA
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.html$/i,
          use: ["raw-loader"],
        },
        {
          test: /\.css$/i,
          use: ["raw-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./static/html/index.html", // template file
        filename: "index.html", // output file
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "./static"), to: "" },
          //    { from: "src/assets", to: "assets" },
          //    { from: "src/styles.css", to: "styles.css" },
          //    { from: "src/index.css", to: "index.css" },
          //    { from: "src/normalize.css", to: "normalize.css" },
        ],
      }),
    ],
    optimization: {
      minimize: argv.mode === "production",
    },
  };
};
