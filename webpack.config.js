const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let components = ['testOne', 'testTwo']

let multipleHtmlFiles = components.map((entryName) => {
  return new HtmlWebpackPlugin({
    filename: `components/${entryName}/index.html`,
    template: `./${entryName}/index.html`,
    chunks: [entryName]
  })
})

module.exports = {
  entry: {
    testOne: "./testOne/testOne.js",
    testTwo: "./testTwo/testTwo.js",
  },
  output: {
    filename: "components/[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'components/[name]/[name].css'
    }),
    new CleanWebpackPlugin(),
    ...multipleHtmlFiles
  ]
};
