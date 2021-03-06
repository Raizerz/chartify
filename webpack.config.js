var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var mixins       = require('postcss-mixins');

var appContext = path.join(__dirname, '/');

module.exports = {
  context: appContext,
  entry: './src/Chartify.js',
  output: {
    filename: "./chartify.js",
    sourceMapFilename: './chartify.js.map',
    library: 'Chartify',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader?stage=0&optional=runtime'],
      exclude: /node_modules/,
      include: path.join(__dirname, '/src')
    }, {
      test: /\.css?$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=[path][name].[ext]?[hash]'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function () {
    return [autoprefixer, precss, mixins];
  }
};