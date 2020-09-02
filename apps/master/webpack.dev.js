const { name } = require("./package.json");
const { resolve } = require("path");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require("../webpack.common.js");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: resolve(__dirname, "./src/index.tsx"),
  output: {
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    port: 7000,
    contentBase: "./dist",
    clientLogLevel: "warning",
    disableHostCheck: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: resolve(__dirname, "./mockServiceWorker.js") }],
    }),
  ],
});