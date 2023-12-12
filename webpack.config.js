const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    globalObject: "this",
    clean: true,
    library: {
      name: "tinymce-paste-from-word-plugin",
      type: "umd",
    },
  },
  externals: {
    tinymce: {
      commonjs: "tinymce",
      commonjs2: "tinymce",
      amd: "tinymce",
      root: "tinymce",
    },
  },
};
