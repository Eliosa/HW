const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 清空文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 打包时拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry:{
		main: './src/main.js',
		other: './src/other.js'
	},
	output:{
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	// devtool: 'source-map', //会单独生成一个源码的映射文件soucemap，以便出错时快速定位出错点（显示行和列）
	// devtool: 'eval-source-map', //不会产出单独的映射文件，  代码出错时会显示出错点的行和列
	// devtool: 'cheap-module-source-map', // 会生成单独的映射文件 sourcemap，但是不会与文件相关联， 出错时显示出错行（没有列）
	devtool: 'cheap-module-eval-source-map', //不会产生单独的文件 集成在打包后的文件中  出错时不显示列
	// watch: true, //时时打包， 如果代码发生变动，会再次打新包
	// watchOptions:{ //监控选项
	// 	poll: 1000, //每秒问我1000次
	// 	aggreagateTimeout: 500, // 防抖，停止代码输入500ms之后 重新打包
	// 	ignored: /node_modules/, //忽略文件
	// },
	devServer:{
		// 1) 配置跨域问题 配置一个代理
		// proxy:{
		// 	'/api': {
		// 		target: 'http://localhost:3000',
		// 		pathRewrite: {
		// 			'/api': ''
		// 		}
		// 	}
		// }

		// 2) 前端模拟数据
		// before(app){
		// 	app.get('/user', (req,res) =>{
		// 		res.json({'name': 'hi'})
		// 	})
		// }
	},
	resolve:{ // 解析第三方包 commonJS 查找引用的模块 会从node_modules中查找，
		modules:[ //强制查找的目录
			path.resolve('node_modules')
		],
		mainFields: ['style', 'js'], //主入口， 先找style，若找不到，则找js
		mainFiles: [], //指定入口文件的名字， 默认index.js
 		alias: { //别名
			bootstrap: 'bootstrap/dist/css/bootstrap.css'
		},
		extensions:['.js','.css','.vue'], //当 import './style'  会按照 ./style.js,  ./style.css, ./style.vue的顺序寻找，直到找到
	},
	plugins:[
		new webpack.DefinePlugin({ // 将下面申明的变量定义到全局环境中
			DEV: JSON.stringify('dev'), // "'dev'" console.log('dev'),
			FLAG: 'true'
		}),
		new htmlWebpackPlugin({
			template: './view/index.html',
			filename: 'main.html',
			chunks: ['main'], // 引用相应模块
		}),
		new htmlWebpackPlugin({
			template: './view/index.html',
			filename: 'other.html',
			chunks: ['main', 'other']
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			// 打包时  将doc文件夹下的目录拷贝到打包文件下的doc目录
			{
				from: './doc',
				to: './doc'
			}
		]),
		// 在所有js首部注入相应内容 ，可做版权申明
		new webpack.BannerPlugin('copyright ***')
	]
}