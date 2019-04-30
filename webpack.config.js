const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolve = file => path.join(__dirname, file)

module.exports = {
  mode: 'development',
  entry: {
    analyzer: resolve('src/analyzer.js'),
    send: resolve('src/send.js'),
  },
  output: {
    path: resolve('dist'),
    // filename: "analyzer.js",
    // library: 'analyzer',
    libraryTarget: 'umd',
    // globalObject: 'typeof self !== \'undefined\' ? self : this'
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
