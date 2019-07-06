const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'shared', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        loader: 'css-loader',
      }
    ]
  }
};