import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        vue(),
        visualizer(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        splitVendorChunkPlugin(),
        viteCompression(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                // manualChunks: {
                //     tdesign: ['tdesign-vue-next/es'],
                //     tdesign_2: ['@popperjs/core/dist/index.mjs'],
                //     element: ['element-plus'],
                //     emoji: ['markdown-it-emoji'],
                //     markdownIt: ['markdown-it'],
                //     ant: ['ant-design-vue/es'],
                //     unorm: ['unorm/lib/unorm.js'],
                //     uslug: ['uslug'],
                //     route: ['vue-router/dist/vue-router.mjs'],
                //     ant_icon: ['@ant-design/icons-svg'],
                //     axios: ['axios'],
                //     hljs: ['highlight.js'],
                // },
                // 最小化拆分包
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
                entryFileNames: 'js/[name].[hash].js',
                chunkFileNames: 'js/[name].[hash].js',
                assetFileNames: '[ext]/[name].[hash].[ext]',
                element: ['element-plus'],
                emoji: ['markdown-it-emoji'],
                markdownIt: ['markdown-it'],
                unorm: ['unorm/lib/unorm.js'],
                uslug: ['uslug'],
                route: ['vue-router/dist/vue-router.mjs'],
                axios: ['axios'],
                hljs: ['highlight.js'],
            },
        },
    },
    define: {
        'process.env': {},
    },
    presets: [
        [
            '@vue/app',
            {
                polyfills: ['es.promise', 'es.symbol'],
            },
        ],
    ],
    css: {
        postcss: {
            plugins: [
                require('autoprefixer')({
                    overrideBrowserslist: [
                        'Android 4.1',
                        'iOS 7.1',
                        'Chrome > 31',
                        'ff > 31',
                        '> 1%',
                        'last 1 chrome version',
                        'last 1 firefox version',
                        'last 1 safari version',
                        'last 1 ie version',
                    ],
                    grid: true,
                }),
            ],
        },
    },
});
