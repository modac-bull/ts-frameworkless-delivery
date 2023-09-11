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
      {
        test: /\.scss$/,
        exclude: /styles\/global\.scss$/, // global.scss를 제외한 모든 SCSS 파일 대상
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /styles\/global\.scss$/, // 전역 스타일(global.scss)만 대상
        use: ["style-loader", "css-loader", "sass-loader"],
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
