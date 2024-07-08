const HtmlWebPackPlugin = require("html-webpack-plugin");
//const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack'); // Para manejar variables de entorno

const configs = {
  appName: "microHome",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3001/",
    PORT: 3001,
  },
  production: {
    PUBLIC_PATH: "http://your.production.domain/",
    PORT: 3001,
  },
};

const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const config = configs[argv.mode] || configs.development;
  
  return {
    mode: argv.mode || 'development',  // Establecer el modo correctamente
    output: {
      publicPath: config.PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      hot: false,
      port: config.PORT,
      historyApiFallback: true,
      allowedHosts: "all",
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
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
          use: [
            "style-loader", 
            "css-loader", 
            "postcss-loader"
          ],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        exposes: {
          "./UiHome": "./src/views/uihome/UiHome.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
    ],
  };
};