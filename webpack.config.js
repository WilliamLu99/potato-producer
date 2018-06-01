module.exports = {
  entry: ['./app/index.js'],
  output: {
    path: __dirname + '/docs',
    filename: 'bundle.js',
    libraryTarget: 'this'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    port: 3000,
    contentBase: './docs',
    inline: true
  }
}
