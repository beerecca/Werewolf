var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Webpack = require('webpack');

var path = require('path');
var prod = process.argv.indexOf('--prod') !== -1;
var includeSourceMap = process.argv.indexOf('--sourceMap') !== -1;
var rootDir = path.join(__dirname, '..');

var config = {
	context: rootDir,
	entry: {
		app: './app.js'
	},
	output: {
		path: path.join(rootDir, 'dist'),
		filename: prod ? '[name].min.js' : '[name].js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: [
					'node_modules',
					'bower_components'
				],
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.scss$/,
				loaders: [
					ExtractTextPlugin.extract('style-loader'),
					'css-loader',
					'postcss-loader',
					'sass-loader?includePaths[]=' + path.join(rootDir, 'bower_components')
				]
			},
			{
				test: /\.svg$/, loader: 'file-loader'
			},
			{
				test: /\.(gif|png|jpg|jpeg)$/,
				loader: 'file?hash=sha512&digest=hex&name=[name][hash].[ext]'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {stage:0}
			}
		]
	},
	postcss: function() {
		return [autoprefixer];
	},
	plugins: [
		new Webpack.ResolverPlugin([
			new Webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
		], ["normal", "loader"]),
		new ExtractTextPlugin('[name].css')
	],
	resolve: {
		modulesDirectories: ['node_modules'],
		root: [path.join(rootDir, 'bower_components')],
		fallback: path.join(rootDir, 'bower_components')
	},
	eslint: {
		configFile: '.eslintrc',
		quiet: false,
		failOnError: true
	}
};

if(prod) {
	config.plugins.push(new Webpack.optimize.UglifyJsPlugin());

	config.plugins.push(new Webpack.optimize.DedupePlugin());

	config.plugins.push(new Webpack.DefinePlugin({
		"process.env": {
			"NODE_ENV": JSON.stringify('production')
		}
	}));
}

if(includeSourceMap) {
	config.plugins.push(new Webpack.SourceMapDevToolPlugin());
}

module.exports = config;
