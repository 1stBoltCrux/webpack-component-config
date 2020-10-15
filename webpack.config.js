const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const components = ['testOne', 'testTwo']

const multipleHtmlFiles = components.map((entryName) => {
  return new HtmlWebpackPlugin({
    filename: `components/${entryName}/index.html`,
    template: `./${entryName}/index.html`,
    chunks: [entryName]
  })
})

console.log(__dirname + '/dist/components')

module.exports = {
  watch: true,
  entry: {
    testOne: "./testOne/testOne.js",
    testTwo: "./testTwo/testTwo.js",
  },
  output: {
    filename: "components/[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'components/[name]/[name].css'
    }),
    new CleanWebpackPlugin(),
    ...multipleHtmlFiles
  ]
};
