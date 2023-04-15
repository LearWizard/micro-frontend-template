const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path")
const deps = require("./package.json").dependencies;
module.exports = {
  mode: 'production',
  //tells webpack to show error files correctly helps in debugging
  devtool: 'inline-source-map',
  output: {
    //file to which it has to generate bundiled code
    filename: 'main.bundle.js',
    publicPath: "http://localhost:8080/",
    path: path.resolve(__dirname, 'dist'),
     clean: true,

  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    //automatically refreshes page after doing changes
    port: 8080,
    static: './dist',
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [

    new HtmlWebPackPlugin({
      template: "./src/index.html",
      title: "Development",
    }),
  ],
};
