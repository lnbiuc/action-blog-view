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
    // base: 'https://static.vio.vin/blog/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
                entryFileNames: 'js/[name].[hash].js',
                chunkFileNames: 'js/[name].[hash].js',
                assetFileNames: '[ext]/[name].[hash].[ext]',
                element: ['element-plus'],
                unorm: ['unorm/lib/unorm.js'],
                axios: ['axios'],
                // 使用 resolveUrl 函数将相对路径转换为绝对路径
                assetUrl: (assetInfo) => {
                    const { name, ext } = assetInfo;
                    return `https://static.vio.vin/blog/${ext}/${name}.${ext}`;
                },
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
