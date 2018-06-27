const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = process.env.WEBPACK_SERVE ? 'development' : 'production';
const HOST = process.env.HOST || 'localhost';

let options = {

  mode: MODE,

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/templates/index.html',
                            filename: 'index.html' })
  ],

  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader',
               options: { presets: ['babel-preset-env'] }}]},
      { test: /\.(scss|sass)$/,
        use: [{loader: 'style-loader' },
              {loader: 'css-loader'   },
              {loader: 'sass-loader'  }]}]
  },

  serve: {

    // Enable additional features or change how webpack-serve works.
    //
    // see https://github.com/webpack-contrib/webpack-serve#add-on-features
    //
    add: (app, middleware, options) => {
      middleware.webpack();
      middleware.content();
    },

    // The path, or array of paths, from which static content will be served.
    //
    // see https://github.com/webpack-contrib/webpack-serve#content
    //
    content: path.join(__dirname, 'content'),

    // Sets the host that the server will listen on. Uses the value of the HOST
    // environment variable.
    //
    // `export HOST=your.local.domain.name`
    //
    // see https://github.com/webpack-contrib/webpack-serve#https
    //
    host: HOST,

    // Enable HTTP2 support.
    //
    // see https://github.com/webpack-contrib/webpack-serve#http2
    //
    http2: true,

    // For this to work, you must first generate certificates by running
    // `npx devcert $HOST`
    //
    // see https://github.com/webpack-contrib/webpack-serve#https
    //
    https: {
      key: fs.readFileSync(HOST + '.key'),
      cert: fs.readFileSync(HOST + '.cert')
    },

    // Change logging threshold; trace, debug, info, warn, error.
    //
    // see https://github.com/webpack-contrib/webpack-serve#loglevel
    //
    logLevel: 'error',

    // Prepend log output with timestamp.
    //
    // see https://github.com/webpack-contrib/webpack-serve#logtime
    //
    logTime: true,

    // Handle events from the module's event bus.
    //
    // see https://github.com/webpack-contrib/webpack-serve#on
    //
    on: {
      'listening': () => { console.log('listening'); }
    },

    // Open the given path using the given app.
    //
    // see https://github.com/webpack-contrib/webpack-serve#open
    //
    open: true,
    // {
    //   app: '/Applications/Firefox.app',
    //   path: 'index.html'
    // },

    // Listen on the given port.
    //
    // see https://github.com/webpack-contrib/webpack-serve#port
    //
    port: 8080
  }

};

module.exports = options;
