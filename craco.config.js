const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  webpack: {
    configure: {
      experiments: { topLevelAwait: true },
      plugins: [new NodePolyfillPlugin()],
    },
  },
};
