const path = require('path')
// 打包时，引入指定html 并将打包脚本插入其中
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

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
      filename: 'index.[hash].css'
    }),
    new webpack.ProvidePlugin({ // 在每个模块中注入$
      $: 'jquery'
    })
  ],
  externals:{ //以下申明的东西打包时不会被打包
    jquery: '$' // 
  },
  module: {
    // 当使用多个loader时， 其执行顺序默认从右向左
    // loader 可以写成对象，用于传入参数option {loader:'css-loader',option:''}
    rules: [
      // {
      //   test: require.resolve('jquery'), // 引用到jquery的地方
      //   use: 'expose-loader?$'
      // },
      {
        test:/(jpg|png)$/,
        use: 'file-loader'
      },
      {
        test:/(jpg|png)$/,
        // 当图片小于200K时 使用base64转换
        use: {
          loader: 'url-loader',
          options:{
            limit: 200*1024,
            outputPath: 'img/' //图片打包目录
          }
        }
      },
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
          'postcss-loader'
        ] // css-loader 主要解析css文件及其中import的语法，   style-loader将css插入到html的head位置
      },
      {
        test: /.less$/,
        // 可替代style-loader
        use: [ MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader'
          },
          'postcss-loader'
        ] // css-loader 主要解析css文件及其中import的语法，   style-loader将css插入到html的head位置
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'eslint-loader'
          // },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }

        ]
      }
    ]
  }
}
