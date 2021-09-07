import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginImp from '../../dist/index'
const vitePluginImp = require('../../dist/index')

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h } from 'vue'`
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            return `vant/es/${name}/index.css`
          }
        },
        {
          libName: 'element-plus',
          libDirectory: 'es/components',
          style: (name) => {
            if (['el-config-provider', 'effect'].includes(name)) return false;
            return `element-plus/es/components/${name.replace('el-', '')}/style/css.js`;
          },
        },
        {
          libName: 'ant-design-vue',
          style(name) {
            if (/popconfirm/.test(name)) {
              return `ant-design-vue/es/popover/style/index.css`
            }
            return `ant-design-vue/es/${name}/style/index.css`
          }
        }
      ]
    })
  ]
})
