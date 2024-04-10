import path from 'path';
import vue from '@vitejs/plugin-vue';
import {VitePWA} from 'vite-plugin-pwa'


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, '../resources/META-INF/resources/',);
export default async () => {

    return {
        plugins: [
            vue({template: {compilerOptions: {isCustomElement: (tag) => tag.includes('swiper-')}}}),
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true
                },
                injectRegister: 'auto',
                workbox: {
                    globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}']
                },
                strategies: 'injectManifest',
                manifest: {
                    "name": "Smart-Flashcards",
                    "short_name": "Smart-Flashcards",
                    "description": "Smart-Flashcards",
                    "lang": "en-US",
                    "start_url": "/",
                    "display": "standalone",
                    "background_color": "#EE350F",
                    "theme_color": "#EE350F",
                    "icons": [
                        {
                            "src": "/icons/128x128.png",
                            "sizes": "128x128",
                            "type": "image/png"
                        },
                        {
                            "src": "/icons/144x144.png",
                            "sizes": "144x144",
                            "type": "image/png"
                        },
                        {
                            "src": "/icons/152x152.png",
                            "sizes": "152x152",
                            "type": "image/png"
                        },
                        {
                            "src": "/icons/192x192.png",
                            "sizes": "192x192",
                            "type": "image/png"
                        },
                        {
                            "src": "/icons/256x256.png",
                            "sizes": "256x256",
                            "type": "image/png"
                        },
                        {
                            "src": "/icons/512x512.png",
                            "sizes": "512x512",
                            "type": "image/png"
                        }
                    ]
                }
            })
        ],
        root: SRC_DIR,
        base: '',
        publicDir: PUBLIC_DIR,
        build: {
            outDir: BUILD_DIR,
            assetsInlineLimit: 0,
            emptyOutDir: true,
            rollupOptions: {
                treeshake: false,
            },
        },
        resolve: {
            alias: {
                '@': SRC_DIR,
            },
        },
        server: {
            host: true,
        },

    };
}
