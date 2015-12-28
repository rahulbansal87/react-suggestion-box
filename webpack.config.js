  var port = process.env.PORT || 3574;
  var path = require('path');
module.exports = {
  context: path.join(__dirname, '.'),
  entry: {
    javascript: "./app/App.js",
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, '.'),
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    port: port,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
       test:  /\.html/, loader: 'file?name=[name].[ext]'
      },
      {
        test:  /\.css/, loader: 'file?name=[name].[ext]'
      }
    ]
  }
}