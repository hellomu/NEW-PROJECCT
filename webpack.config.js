const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')//引用该插件
const webpack=require('webpack')//引用webpack.difinePlugin的依赖
const ExtractPlugin=require('extract-text-webpack-plugin')//把非js的文件打包成单独的静态资源文件，在生产环境中，CSS文件要以在HTML头中引入的状态引入
const isDev=process.env.NODE_ENV==='development'//package.json中的设置都保存在process.env中
const config={
    target:'web',//因为开发的是浏览器项目，所以编译目标是web平台
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },//You may need an appropriate loader to handle this file type.Vue只支持ES5，要支持ES6需要引入帮主它处理这些语法的工具,增加module模块，增加规则，增加加载方式
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'//jsx用babel-loader操作
            },
            /*{//设置好如何编译图片和css后，再安装依赖的模块 style-loader url-loader file-loader,就可以在js代码里import非js的内容
                test:/\.css$/,
                //loader:'css-loader'//只是处理css文件，样式要么是外部文件，要么是内部，有不同的处理方式
                use:[
                    'style-loader',//在入口js文件中以一段js代码出现，然后写入到html中
                    'css-loader'//用于读取CSS的内容，是写到文件里，还是插入到HTML里，要定义方法
                ]
            },本项目没有用到CSS文件，所以可以去掉该配置*/
            /*{//css预处理器,可以使用模块化的方式写css,而且webpack也可以处理CSS预处理
                test:/\.styl$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',//可以生成sourcemap,如果有人生成了，可以直接采用
                        options:{
                            sourceMap:true//官方文档都有说明
                        }
                    },
                    'stylus-loader'//loader只处理自己关心的部分（styl代码读取出来），扔给上级去处理，可以生成sourcemap
                ]
            },要单独区分环境来做，所以不能这样写死*/
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use:[
                    {//使用对象是为了给loader进行选项配置，每一个loader都有选项可以配置
                        loader:'url-loader',//把小于limit的图片转换成base64的格式，写到入口Js的代码中。大于limit的图片用file-loader解析，把图片解析后换一个名字换一个地方存储
                        options:{//配置选项
                            limit:1024,//对于比较小的图片使用base64编码可以减少一次图片的网络请求，比较大的图片就不合适了，编码会和html混在一起，可读性差，html文件变大，得不偿失另一方面，base64编码的图片不能像正常的图片进行缓存，因此写进css文件里让浏览器对css文件进行缓存是个好方法
                            name:'[name]-aaa.[ext]'//定义图片名字，文件进来的名字+自定义的字符+。ext
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{//根据项目环境决定如何打包
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
//判断一下，因为这里的文件要同时用在正式环境和开发环境，配置要根据不同的环境做一个判断
if(isDev){//根据项目环境决定如何展示
    //生产环境下stylus的设置
    config.module.rules.push({
        //css预处理器,可以使用模块化的方式写css,而且webpack也可以处理CSS预处理
            test:/\.styl$/,
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',//可以生成sourcemap,如果有人生成了，可以直接采用
                    options:{
                        sourceMap:true//官方文档都有说明
                    }
                },
                'stylus-loader'//loader只处理自己关心的部分（styl代码读取出来），扔给上级去处理，可以生成sourcemap
            ]
    })
    config.devtool='#cheap-module-eval-source-map'//用于调试浏览器代码
    config.devServer={//package2加入的,关于package的配置都写在这个属性里
        port:8000,
        host:'0.0.0.0',//ip地址
        overlay:{//让错误在浏览器中显示
            errors:true,
        },
        hot:true//热加载,更改某个组件，就只刷新该组件
        /*historyFallback:{

        }单页面应用需要很多路由地址*/
        //open:true//启动dev时自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    //如果把类库代码和业务代码打包到一起，就必须一起更新，所以要拆分打包
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        //框架数组
        verdor:['vue']
    }
    //生产环境对出口文件也要进行重置
    config.output.filename="bundle.[chunkhash:8].js"
    //正式环境下对stylus文件另做设置
    config.module.rules.push(
        {//css预处理器,可以使用模块化的方式写css,而且webpack也可以处理CSS预处理
            test:/\.styl$/,
            use:ExtractPlugin.extract({//使用ExtractPlugin组件
                fallback:'style-loader',//依赖style-loader组件
                use:[
                'css-loader',
                {
                    loader:'postcss-loader',//可以生成sourcemap,如果有人生成了，可以直接采用
                    options:{
                        sourceMap:true//官方文档都有说明
                    }
                },
                'stylus-loader'//loader只处理自己关心的部分（styl代码读取出来），扔给上级去处理，可以生成sourcemap
            ]
        })
        }
    )
    config.plugins.push(
        new ExtractPlugin('stylus.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'//一定要和框架数组一样的名字
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })//单独打包webpack文件,规避新模块插入导致ID变化以至于浏览器无法缓存
    )
}
module.exports=config;//这样就可以随意更改配置