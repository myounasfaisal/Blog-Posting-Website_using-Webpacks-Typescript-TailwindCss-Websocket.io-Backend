const config = require("./webpack.common.js");
const { merge } = require("webpack-merge");

const commonConfig = merge(config, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },
});

module.exports = commonConfig;
