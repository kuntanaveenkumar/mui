const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname + '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry:
  { 
	app:'./src/index.js'  
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
	  {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: 
		{
            plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
	test: /\.(pdf|svg|ico)$/,
	use: [{loader: 'url-loader'},]
      }, 
	  {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'file-loader?limit=10000',
      },	
	  {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      }, 	  
      {
      test: /\.less$/,
      loader: 'less-loader' // compiles Less to CSS
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [HTMLWebpackPluginConfig,new webpack.HotModuleReplacementPlugin()],
  devServer: {
	historyApiFallback: true,
    contentBase: './',
    hot: true,
    devtool: "cheap-module-source-map",    
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};