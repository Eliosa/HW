const webpack = require('webpack')
// 中间件
const middle = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

let compiler = webpack(config)

const express = require('express')

let app = express();

app.use(middle(compiler))

app.listen(3000 )
