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
        target: 'https://duolingo-clone-server.vercel.app/api/proxy', // Proxy to the Vercel server
        changeOrigin: true,  // Ensure the origin of the request is rewritten to match the target URL
        secure: true,        // Enable SSL verification for production (set to false if you're working in a dev environment with self-signed certs)
        pathRewrite: {
          '^/api': '',       // Remove the '/api' prefix before forwarding the request
        },
        onProxyReq: (proxyReq, req, res) => {
          // Optionally, log the request or add custom headers before forwarding
          console.log('Request sent to target:', req.url);
        },
        onError: (err, req, res) => {
          // Optionally, handle errors in the proxying process
          res.status(500).send('Proxy Error: ' + err.message);
        },
      },
    },
  },
};
