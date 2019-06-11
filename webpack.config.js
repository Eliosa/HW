const path = require('path')
// 打包时，引入指定html 并将打包脚本插入其中
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // indicate which module webpack should use to begin building out its internal dependency graph
  entry: './app/app.js',
  mode: 'development', // development or production
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js' // 添加hash戳，使每次打包都生成新的文件，已解决缓存问题;  :8 指只显示8位的hash戳
  },
  /**
   * 开发服务器配置
   */
  devServer: {
    port: '3000',
    progress: true,
    contentBase: './dist',
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板文件地址
      filename: 'index.html',
      hash: true, // 给引用的文件添加hash戳，已解决缓存问题
      minify: { // 压缩、最小化
        removeAttributeQuotes: true, // 移除属性的双引号
        collapseWhitespace: true // 折叠空行
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
  module: {
    // 当使用多个loader时， 其执行顺序默认从右向左
    // loader 可以写成对象，用于传入参数option {loader:'css-loader',option:''}
    rules: [
      {
        test: /.css$/,
        // 可替代style-loader
        use: [ MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              browser: ['last 2 versions'],
              'cascade': true,
              'remove': true
            }
          }] // css-loader 主要解析css文件及其中import的语法，   style-loader将css插入到html的head位置
      },
      {
        test: /.js$/,
        use:[
          {
            loader: 'babel-loader',
            options:{
              presets:['@babel/preset-env'],
            }
          }
        ]
      }
    ]
  }
}
