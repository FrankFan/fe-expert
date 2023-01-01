import { defineConfig, loadEnv, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
import replace from '@rollup/plugin-replace'
import dayjs from 'dayjs'

const date = dayjs().format('YYYY_MM_DD_HH_mm_ss')

const isProd = process.env.NODE_ENV === 'production'
console.log('#isProd', isProd)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as any

  return {
    base: '/',
    resolve: {
      alias: [{ find: '@/', replacement: path.resolve(__dirname, 'src') + '/' }],
    },
    plugins: [
      svgr(),
      react(),
      replace({
        preventAssignment: true,
        __WC_VERSION__: date,
      }),
    ],
    esbuild: {
      // fix: https://github.com/vitejs/vite/issues/8644
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      drop: mode === 'prod' ? ['console', 'debugger'] : [],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
            grid: false,
          }),
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            exclude: [],
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
    },
    build: {
      sourcemap: true,
    },
    server: {
      //   proxy: {
      //     // from: http://localhost:5173/example/bitdapp/v1/public/worldcup/activity/guess
      //     // to:   http://localhost:7080/public/worldcup/activity/guess
      //     '^/example/bitdapp/v1': {
      //       // http://localhost:7080/public/worldcup/guess/myResult
      //       target: 'http://127.0.0.1:7080',
      //       changeOrigin: true,
      //       rewrite: (path) => {
      //         return path.replace(/^\/example\/bitdapp\/v1/, '')
      //       },
      //     },
      //   },
      fs: {
        allow: [
          // search up for workspace root
          searchForWorkspaceRoot(process.cwd()),
          // your custom rules
          '/Users/name/workspace/aaa/bbb',
        ],
      },
    },
    define: {
      'process.env': {
        ...env,
      },
    },
  }
})
