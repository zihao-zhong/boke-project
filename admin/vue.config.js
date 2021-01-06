const path = require('path') 
const env = require('./env')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;


function resolve(dir){
  return path.join(__dirname,dir) 
}

module.exports = {
  chainWebpack:(config)=>{
    const cdn = {
      css: ['https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'],
      js: []
    };
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn;
      return args;
    });

    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@api', resolve('./src/api'))
      //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  configureWebpack: config => {
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 5000,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    open: true, // 是否打开浏览器
    host: 'localhost',
    port: '8081', // 代理断就
    // https: false,
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: env.BASE_URL + env.BASE_API, // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        // pathRewrite: {
        //   "^/api": "/"
        // }
      }
    }
  }
}