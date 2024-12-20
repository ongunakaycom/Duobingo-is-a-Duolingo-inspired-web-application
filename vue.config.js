const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        process: 'process/browser',  // Polyfill for process
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',  // Provide process polyfill for usage
      }),
    ],
  },
};
