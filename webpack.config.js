const path = require('path')

module.exports = {
	// indicate which module webpack should use to begin building out its internal dependency graph
	entry: './app/app.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	/**
	 * 开发服务器配置
	 */
	devServer:{
		port: "3000",
		progress: true,
		contentBase: './dist'
	}
}