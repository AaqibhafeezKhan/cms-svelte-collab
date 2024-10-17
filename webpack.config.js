const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    publicPath: "http://localhost:9004/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cmsSvelteCollab",
      filename: "remoteEntry.js",
      exposes: {
        "./CollabEditor": "./src/App.svelte",
      },
    }),
  ],
};
