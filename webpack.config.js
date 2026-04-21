const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: process.env.NODE_ENV === 'production' ? '/cms-svelte-collab/' : '/',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: require('svelte-preprocess')(),
            emitCss: false,
            hotReload: false,
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: { fullySpecified: false },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: false,
    }),
  ],
  devServer: {
    port: 8083,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  externals: process.env.NODE_ENV === 'production' ? ['svelte'] : [],
};
