const { profile } = require("console");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const config = {
  entry: {
    index: "./src/index.ts",
    login: "./src/Pages/Login Page/Login.ts",
    register: "./src/Pages/Registration Page/Register.ts",
    profile: "./src/Pages/Profile Page/Profile.ts",
    account: "./src/Pages/Account Page/Account.ts",
    blog: "./src/Pages/Blog Page/Blog.ts",
    viewBlog: "./src/Pages/viewBlog Page/viewBlog.ts",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/Profile Page/Profile.html",
      filename: "Profile.html",
      chunks: ["profile"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/Account Page/Account.html",
      filename: "Account.html",
      chunks: ["account"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/Registration Page/Register.html",
      filename: "Register.html",
      chunks: ["register"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/Login Page/Login.html",
      filename: "Login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/Blog Page/Blog.html",
      filename: "Blog.html",
      chunks: ["blog"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/Pages/viewBlog Page/viewBlog.html",
      filename: "viewBlog.html",
      chunks: ["viewBlog"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        type: "asset/resource",
        include: path.resolve(__dirname, "src/assets"),
      },
    ],
  },
};

module.exports = config;
