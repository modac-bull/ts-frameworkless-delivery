const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true, // SPA 사용시 모든 404 응답을 index.html로 리다이렉트
  },
};
