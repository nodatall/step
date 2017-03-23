const WebpackErrorNotificationPlugin = require('webpack-error-notification')

module.exports = {
  entry: './source/root.js',
  output: {
    filename: './public/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: [new WebpackErrorNotificationPlugin()]
}
