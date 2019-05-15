const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './test',
        hot: true,
        // http2: true,
        index: 'index.html'
    },
});