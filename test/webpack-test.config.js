var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Webpack = require('webpack');

var path = require('path');
var rootDir = path.join(__dirname, '..');

var config = {
	context: __dirname,
	entry: 'mocha!./test.js',
	output: {
		path: __dirname,
		filename: 'tests.compiled.js'
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
				test: /\.svg$/, loader: 'raw-loader'
			},
			{
				test: /\.(gif|png|jpg|jpeg)$/,
				loader: 'file?hash=sha512&digest=hex&name=[name][hash].[ext]'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					stage: 0
				},
				include: [
					path.join(rootDir, 'test'),
					path.join(rootDir, 'app'),
					path.join(rootDir, 'bower_components', 'xhq-moremenu', 'src', 'XHQMoreMenu.js'),
					path.join(rootDir, 'bower_components', 'xui-base-component', 'src', 'XUIBaseComponent.js'),
					path.join(rootDir, 'bower_components', 'icon', 'src', 'Icon.js'),
					path.join(rootDir, 'bower_components', 'xui-sidebarfilters', 'index.js'),
					path.join(rootDir, 'bower_components', 'xui-sidebarfilters', 'src')
				]
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

module.exports = config;
