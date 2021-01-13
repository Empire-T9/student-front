import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.BUILD_TIME': new Date().getTime(),
    'process.env.API_HOST': 'http://121.196.153.182:3000',
  },
});
