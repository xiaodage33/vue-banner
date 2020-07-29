// const path = require('path');


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  lintOnSave: false,

    css:{
      extract: true,
      sourceMap: false,
      loaderOptions:{
          sass:{
              prependData:'@import"./src/styles/main.scss";'
          }
      }

    },

  devServer: {
      open: false, // 编译完成是否打开网页
      host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
      port: 8080, // 访问端口
      https: false, // 编译失败时刷新页面
      hot: true, // 开启热加载
      hotOnly: false,
      proxy: {
          '/__api__': {
              //测试集群环境
              // target: "http://auto-jenkins-djnago", //API服务器的地址  http://www.web-jshtml.cn/api

               //本地到集群连接方式
              // target: "http://scf-auto-jenkins-djnago", //API服务器的地址  http://www.web-jshtml.cn/api

              //本地环境
              target: "http://192.168.9.240:8989", //API服务器的地址  http://www.web-jshtml.cn/api

              // target: "http://www.web-jshtml.cn/productapi/token", //API服务器的地址  http://www.web-jshtml.cn/api
              changeOrigin: true,
              pathRewrite: {
                  '^/__api__': ''    //替换为空
              }
          }
      },
      overlay: { // 全屏模式下是否显示脚本错误
          warnings: true,
          errors: true
      },

  }

}
