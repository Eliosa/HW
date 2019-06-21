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
- **noParse** :如下方示例， 当在文件中引用jquery时， 打包时不会解析webpack的依赖项
- **exclude/include**: 查找时排除某目录，或至在某目录下查找
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
- **happypack** 多线程打包
```js
const Happypack = require('happypack')
module:{
	rules:[
		{
			test: /.js$/,
			use: 'Happypack/loader?id=js',

		}
	]
},
plugins:[
	new Happypack({
		id: 'js',
		{

		}
	})
]
```

- **tree-shaking**（webpack自动实现）  在使用import语法时，会使用tree-shaking，打包时没有引用的代码不会被打包，    （使用require 引入的代码不支持）
- **scope host** （webpack3+自动实现）作用域提升  webpack3开始
```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log(d)


打包后的代码
console.log(6) //在wepack中会自动省略一些可以简化的代码
```

- **抽离公共代码**  多页面打包抽离公共代码
```js
optimization:{ // 以前用的commonChunkPlugins webpack4使用optimization配置
	splitChunks:{  //分隔代码块
		cacheGroups:{ //缓存组
			common:{ //公共的模块
				chunks:'initial', // 入口
				minSize: 0, //超过多大时
				minChunks: 1, // 引用次数超过多少次
			},
			vendor:{ //第三方
				priority: 1, //权重
				test: /node_modules/,
				chunks:'initial', // 入口
				minSize: 0, //超过多大时
				minChunks: 1, // 引用次数超过多少次
			}
		}
	}
}

```

- **懒加载的应用**
```js
let button = document.createElement('button');
button.innerHTML = 'hello'

button.addEventListener('click', function(){
	// es6草案语法 jsonp实现动态加载文件
	import('./srouce.js').then(data=>{
		console.log(121)
	})
});
document.body.appendChild(button)
```

- **热更新**
```js
devServer:{
	hot: true
},
plugins:[
	// 打印更新的模块路径
	new webpack.NamedModulesPlugin({}),
	// 热更新插件
	new webpack.HotModuleReplacementPlugin({

	})
]
```

- **Tapable**
webpack 本质上是一种事流机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，Tapable类似于nodejs的events库，核心原理也依赖于发布订阅模式