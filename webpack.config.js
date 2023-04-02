/* eslint-disable no-undef */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

module.exports = {
  plugins: [
    // Your existing plugins
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo "Starting build..."'],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ["npm test"], // or 'yarn test' if you're using Yarn
        blocking: false,
        parallel: true,
      },
    }),
  ],
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
