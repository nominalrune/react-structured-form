const path = require('path');
const glob = require('glob');
const basePath = path.resolve('src');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entries = glob.sync('**/index.+(js|ts|tsx)', { cwd: basePath }).reduce(
	(prev, file) => ({
		...prev,
		[path.dirname(file)]: path.resolve(basePath, file),
	}),
	{}
);

module.exports = {
	mode: "development",
	// context: path.resolve(__dirname, 'src'),
	// 	entry: {
	// 		index:path.resolve(__dirname, 'src', 'index.tsx'),
	// 		App: path.resolve(__dirname, 'src', 'App.tsx'),
	// },//
	entry: entries,//
	optimization: {
		nodeEnv: "development", // NODE_ENV環境変数の設定
		minimize: false, // 出力結果を1行にするかどうか
	},
	devtool: 'eval-cheap-source-map',
	resolve: {
		plugins: [new TsconfigPathsPlugin({
			configFile: "./tsconfig.json",
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
		})],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name]/index.js',
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		compress: true,
		port: 9000,
		watchFiles: ['src/**/*'],
		client: {
			overlay: true,
		},
	},
};
