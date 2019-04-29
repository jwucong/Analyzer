const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolve = file => path.join(__dirname, file)

module.exports = {
  mode: 'production',
  entry: resolve('src/analyzer.js'),
  output: {
    path: resolve('dist'),
    filename: "analyzer.js",
    // library: 'analyzer',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
