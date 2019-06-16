#start


- entry: 申明webpack打包的入口文件地址
- output：申明webpack打包出的文件地址及文件名
- loaders: webpack只认识javascript、json文件，Loaders使webpack能够识别其他类型的文件
- mode: 模式（`production`、`development`、`none`）

**运行配置文件**  webpack --config [filename]

**引入文件时**
1. *expose-loader*  暴露到window对象上
2. *providePlugin*  给每个模块都注入相应对象
3. *externals*  引入不打包


**resolve配置（17）**
```js
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
```

**定义环境变量（18）**
```js
plugins:[
    new webpack.DefinePlugin({ // 将下面申明的变量定义到全局环境中
			DEV: JSON.stringify('dev'), // "'dev'" console.log('dev'),
			FLAG: 'true'
		}),
]
```

**区分不同环境（19）**
区分生产和开发环境，  新建配置文件`webpack.dev.js`和`webpack.prod.js`
```js
// webpack.prod.js
const {smart} = require('webpack-merge')
let base = require('./webpack.config.js')

module.exports = smart(base, {
    mode: 'production'
})
```
运行语句 `npm run build -- --config webpack.prod.js`


**webpacky优化**
- *noParse* :如下方示例， 当在文件中引用jquery时， 打包时不会解析webpack的依赖项
- *exclude/include*: 查找时排除某目录，或至在某目录下查找
```js
module:{
    noParse: /jquery/,
    rules:[
        {
            exclude: /node_module/,
            test:/.js$/,use:'babel-loader'
        }
    ]
}

```
