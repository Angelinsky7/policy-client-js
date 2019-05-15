const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              keep_fnames: true
            }
          })
        ]
  }
});