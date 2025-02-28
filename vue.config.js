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
        target: 'https://duolingo-clone-server.vercel.app/api/proxy',  // Proxy URL (Vercel Proxy)
        changeOrigin: true,  // Ensures the request origin is changed to the target URL
        secure: false,       // Disable SSL verification for development
        pathRewrite: {
          '^/api': '',  // Removes '/api' prefix from the request path
        },
      },
    },
  },
};
