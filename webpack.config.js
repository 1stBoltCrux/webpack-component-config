const fs = require("fs");
const path = require("path");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const entries = [];
const htmlFiles = [];

// read components directory

const componentsContents = fs.readdirSync(`${__dirname}/components`);

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

    // grab index.html and index.js files

    for (let i = 0; i < componentContents.length; i++) {
      const file = componentContents[i];
      if (file.match(/index\.js/))
        entries.push(`${componentDirectory}/${file}`);
      if (file.match(/index\.html/))
        htmlFiles.push(`${componentDirectory}/${file}`);
    }
  }
}

// generates component html files
const multipleHtmlFiles = htmlFiles.map((entryName) => {
  const [directory, fileName] = entryName.split("/");
  return new HtmlWebpackPlugin({
    filename: `components/${directory}/${fileName}`,
    template: `components/${directory}/${fileName}`,
    chunks: [directory]
  });
});

// generates component entries
const multipleEntries = entries.reduce((acc, curr) => {
  const [directory, fileName] = curr.split("/");
  return {
    ...acc,
    [directory]: [`./components/${directory}/${fileName}`, './scss/global.scss']
  };
}, {});

module.exports = {
  mode: "development",
  entry: multipleEntries,
  devtool: "inline-source-map",
  output: {
    filename: "components/[name]/index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.s[ac]ss$/i,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        exclude: "/node_modules/",
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["precss", "autoprefixer"]
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    port: 9000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
    new MiniCssExtractPlugin({
      filename: "./UIToolkit.css",
    }),
    new CleanWebpackPlugin(),
    ...multipleHtmlFiles,
    new HtmlWebpackTagsPlugin({
      tags: [
        "assets/jquery/jquery.js",
        "assets/popper/popper.js",
        "assets/bootstrap/js/bootstrap.min.js",
        "assets/devbridge-autocomplete/devbridge-autocomplete.js",
        "assets/bootstrap/css/bootstrap-reboot.css",
        "assets/bootstrap/css/bootstrap.min.css",
      ],
      append: false,
    }),
  ],
};
