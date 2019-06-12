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
