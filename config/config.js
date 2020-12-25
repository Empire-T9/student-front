import { defineConfig } from 'umi';
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  base: '/',
  theme: {
    '@primary-color': '#FF8A2B',
    '@input-placeholder-color': '#8A909A',
    '@form-item-margin-bottom': '16px',
    '@table-padding-vertical': '10px',
  },
  alias: {
    '@': './src',
  },
  targets: {
    ie: 11,
  },
  define: {
    'process.env.BUILD_TIME': new Date().getTime(),
    'process.env.API_HOST': 'http://127.0.0.1:7001',
  },
  hash: true,
  dva: {
    immer: true,
    hmr: false,
    skipModelValidate: true,
  },
  dynamicImport: { loading: '@/components/loading' },
  favicon: '/favicon.png',
  title: 'student-front',
  exportStatic: {},
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          reuseExistingChunk: true,
        },
        vendors: false,
      },
    });
    config.plugin('CompressionPlugin').use(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: productionGzipExtensions,
        // 只处理大于xx字节 的文件，默认：0
        threshold: 10240,
        // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
        minRatio: 0.8, // 默认: 0.8
        // 是否删除源文件，默认: false
        deleteOriginalAssets: false,
      }),
    );
    return config;
  },
});
