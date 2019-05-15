const path = require('path');

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  devtool: "inline-source-map",
  output: {
    filename: 'policy-server.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget:'var',
    library:'Posc'
  }
};