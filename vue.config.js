const path = require("path");
// const TerserPlugin = require('terser-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const defaultSettins = require("./src/settings");

const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  /* 是否需要看情况 */
  js: [
    // 'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    // 'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
  ]
};
// const productionGzipExtensions = ['js', 'css'];
const timestamp = new Date().getTime();
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/styl/mixin.styl"),
        path.resolve(__dirname, "./src/assets/styl/variable.styl")
      ]
    });
}
const port = 9000;
module.exports = {
  // runtimeCompiler: true
  // transpileDependencies: ['vuex-persist'],
  productionSourceMap: false,
  // pwa: {
  //   iconPaths: {
  //     favicon32: 'favicon.ico',
  //     favicon16: 'favicon.ico',
  //     appleTouchIcon: 'favicon.ico',
  //     maskIcon: 'favicon.ico',
  //     msTileImage: 'favicon.ico',
  //   },
  // },
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        // eslint-disable-next-line
        // 'vue': 'Vue',
        //  'vue-router': 'VueRouter',
      };
      // 优化 去除console.log vue/cli-service 配置源码使用了 terser-webpack-pulgin 插件
      //  /node_modules/@vue/cli-service/lib/prod.js
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true; // 去掉console
      // config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false;
      // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
      //   "console.log"
      // ];
      // config.plugins.push(new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
      //   threshold: 10240,
      //   minRatio: 0.8,
      // }));
    }
    return {
      entry: ["babel-polyfill", "./src/main.js"],
      name: defaultSettins.title
    };
  },
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
    if (isProduction) {
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
    config.resolve.alias
      .set("assets", path.join(__dirname, "src/assets"))
      .set("views", path.join(__dirname, "src/views"))
      .set("components", path.join(__dirname, "src/components"))
      .set("utils", path.join(__dirname, "src/utils"));
    config.plugins.delete("preload"); // preload 去除预加载
    config.plugins.delete("prefetch");
  },
  devServer: {
    port,
    // host: '192.168.101.141',
    // disableHostCheck: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `https://api.lwzzr.com`,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ""
        }
      },
      [process.env.VUE_APP_BASE_MOCK_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_MOCK_API}`]: ""
        }
      },
      [process.env.VUE_APP_BASE_ORIGIN_API]: {
        target: `http://192.144.129.220/img`,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_ORIGIN_API}`]: ""
        }
      }
    },
    after: require("./mock/mock-server.js")
  }
  // publicPath: './',
};
