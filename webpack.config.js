const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const entries = [];
const htmlFiles = [];

// read components directory

const componentsContents = fs.readdirSync(`${__dirname}/components`);

// read component directories

for (let i = 0; i < componentsContents.length; i++) {
  const componentDirectory = componentsContents[i];

  if (componentDirectory.match(/\./)) {
    // i'm a file don't try to readdir me

    console.log(`ignore me i'm a file - ${componentDirectory}`);
  } else {
    // i'm a directory readdir me

    const componentContents = fs.readdirSync(
      `${__dirname}/components/${componentDirectory}`
    );
    for (let i = 0; i < componentContents.length; i++) {
      const file = componentContents[i];
      if (file.match(/index\.js/)) {
        entries.push(`${componentDirectory}/${file}`);
      }
      if (file.match(/index\.html/)) {
        htmlFiles.push(`${componentDirectory}/${file}`);
      }
    }
  }
}

// generates component html files
const multipleHtmlFiles = htmlFiles.map((entryName) => {
  const [directory, fileName] = entryName.split("/");
  return new HtmlWebpackPlugin({
    filename: `components/${directory}/${fileName}`,
    template: `./components/${directory}/${fileName}`,
    chunks: [directory],
  });
});

// generates component entries
const multipleEntries = entries.reduce((acc, curr) => {
  const [directory, fileName] = curr.split("/");
  return { ...acc, [directory]: `./components/${directory}/${fileName}` };
}, {});

module.exports = {
  watch: true,
  entry: multipleEntries,
  output: {
    filename: "components/[name]/index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "components/[name]/index.css",
    }),
    new CleanWebpackPlugin(),
    ...multipleHtmlFiles,
  ],
};
