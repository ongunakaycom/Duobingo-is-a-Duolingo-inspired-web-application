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
  devServer: {
    proxy: {
      '/api': {
        target: 'https://duolingo-vue-backend.vercel.app', // Your backend URL
        changeOrigin: true,  // Ensures the request origin is changed to the target URL
        secure: false,       // Disable SSL verification (if needed for local dev)
        pathRewrite: {
          '^/api': '',  // Removes the '/api' prefix from the request path
        },
      },
    },
  },
};
