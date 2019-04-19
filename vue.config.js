module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/oraitStatic": {
        target: "https://orait.oss-cn-hangzhou.aliyuncs.com",
        ws: true,
        changeOrigin: true
      }
    }
  },
  pages: {
    //这块可以用函数替换，循环输出页面
    login: {
      // page 的入口
      entry: "src/views/login/login.js",
      // 模板来源
      template: "src/views/login/login.html",
      // 在 dist/index.html 的输出
      filename: "login.html"
    },
    wpSimluate: {
      // page 的入口
      entry: "src/views/wpSimluate/wpSimluate.js",
      // 模板来源
      template: "src/views/wpSimluate/wpSimluate.html",
      // 在 dist/index.html 的输出
      filename: "wpSimluate.html"
    },
    network: {
      // page 的入口
      entry: "src/views/network/network.js",
      // 模板来源
      template: "src/views/network/network.html",
      // 在 dist/network.html 的输出
      filename: "network.html"
    },
    chartshow: {
      // page 的入口
      entry: "src/views/chartshow/chartshow.js",
      // 模板来源
      template: "src/views/chartshow/chartshow.html",
      // 在 dist/chartshow.html 的输出
      filename: "chartshow.html"
    },
    fileSystem: {
      // page 的入口
      entry: "src/views/fileSystem/fileSystem.js",
      // 模板来源
      template: "src/views/fileSystem/fileSystem.html",
      // 在 dist/fileSystem.html 的输出
      filename: "fileSystem.html"
    }
  }
};
