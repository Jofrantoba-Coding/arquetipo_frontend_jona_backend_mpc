const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack'); // Para manejar variables de entorno

const configs = {
  appName: "remote",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    MICRO_HOME_PATH: "microHome@http://localhost:3001/remoteEntry.js",
    MICRO_HOME_SESION_PATH: "microHomeSesion@http://localhost:3002/remoteEntry.js",
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://your.production.domain/",
    CONTAINER_PATH: "container@http://your.production.domain/remoteEntry.js",
    MICRO_HOME_PATH: "microHome@http://your.production.domain/remoteEntry.js",
    MICRO_HOME_SESION_PATH: "microHomeSesion@http://your.production.domain/remoteEntry.js",
    PORT: 3000,
  },
};

const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const config = configs[argv.mode] || configs.development;
  
  return {
    output: {
      publicPath: config.PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      hot: true,
      port: config.PORT,
      historyApiFallback: true,
      allowedHosts: "all",
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
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          microHome: config.MICRO_HOME_PATH,
          microHomeSesion: config.MICRO_HOME_SESION_PATH,
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