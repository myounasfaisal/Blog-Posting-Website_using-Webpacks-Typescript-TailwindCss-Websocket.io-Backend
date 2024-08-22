const config = require("./webpack.common.js");
const { merge } = require("webpack-merge");

const commonConfig = merge(config, {
  mode: "production",
});
