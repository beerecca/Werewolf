var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Webpack = require('webpack');

var path = require('path');
var prod = process.argv.indexOf('--prod') !== -1;
var includeSourceMap = process.argv.indexOf('--sourceMap') !== -1;
var rootDir = path.join(__dirname, '..');

//TODO: make a prod config file
var config = {
	context: rootDir,
	devtool: 'eval',
	entry: [
		'./app.js'
	],
	output: {
		path: path.join(rootDir, 'dist'),
		filename: 'app.js',
		publicPath: '/dist/'
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
				test: /\.svg$/,
				loader: 'file-loader'
			},
			{
				test: /\.(gif|png|jpg|jpeg|woff|woff2)$/,
				loader: 'file?name=dist/[name].[ext]'
			},
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(rootDir, 'app')
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
		new ExtractTextPlugin('app.css'),
		new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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

if (!prod) {
	config.plugins.push(new Webpack.HotModuleReplacementPlugin());
}

if(includeSourceMap) {
	config.plugins.push(new Webpack.SourceMapDevToolPlugin());
	config.entry.push([
		'webpack-dev-server/client?http://localhost:3003',
    	'webpack/hot/only-dev-server'
	]);
}

module.exports = config;
