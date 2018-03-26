# VUE-SSR-TECH
# NEW-PROJECT


打开vscode,打开VUE-SSR-TECH文件夹，在工作区域shift+右键选择“在命令提示符中打开”，右侧编辑区下方出现终端，然后在终端进行以下操作
1.npm init(初始化)
2.npm webpack@3.10 vue vue-loader
3.npm css-loader vue-template-compiler
4.新建src文件夹（所有的资源，文件都放在这里面）
5.src里新建app.vue,index.js两个文件
6.app.vue,index.js的内容见视频
7.根目录创建webpack.config.js，引入path（路径）模块,设置入口和出口，增加一个可以处理ES6语法的工具（该模块在老师遇到第二次错误后引入），详细见视频
8.package.json文件的scripts对象里增加一个"build"属性，值为"webpack --config webpack.config.js",详细见视频
注意：1.__dirname有两个下划线；2.语法错误在执行npm run build命令后出现的代码的第四行查看，有个尖箭头指着；

搭建环境2
webpack
npm i style-loader url-loader file-loader stylus-loader 用以处理各种非js文件
使用方法 
module:{
	rules:[
		{
			test:文件后缀名的正则表达式,
			1.loader:处理模块 或者
			use:[
				若干个处理模块
					options:{
							limit:1024模块的选项配置
						}
				]
		}
		]
	}
styl文件

npm i webpack-dev-server webpack的包，使用方法非常简单

package.json里设置"webpack-dev-server --config webpack.config.js"和“build”不一样的效果，专门用于开发环境

npm i cross-env 安装该node包，就可以设置环境变量以供我们区分环境

环境变量：（set:window前缀/cross-env:通用前缀）NODE_ENV=production

npm i html-webpack-plugin 让html提供接口

plugins:[
	new HTMLPlugin()
]

npm i post-css-loader(补全css浏览器兼容性前缀） autoprefixer（浏览器前缀） babel-loader（转化ES6代码） babel-core(Babel依赖)
配置.babelrc 存放在项目的根目录下。使用Babel的第一步.

npm i babel-preset-env babel-plugin-transform-vue-jsx
babel-preset-env 的工作方式类似 babel-preset-latest，唯一不同的就是 babel-preset-env 会根据配置的 env 只编译那些还不支持的特性。
babel-plugin-transform-vue-jsx用于编译Vue的jsx代码

npm i babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx

npm i extract-text-webpack-plugin  单独打包CSS文件（把非js的东西打包成一个单独的静态资源文件）