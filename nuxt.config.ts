import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// CSP starts in Report-Only mode — verify the browser console shows no violations
// (GA/GTM, Google Fonts, review avatars) before switching the key to
// 'Content-Security-Policy' to enforce it.
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy-Report-Only': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
        "frame-src 'self' https://www.googletagmanager.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
        'upgrade-insecure-requests',
    ].join('; '),
}

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    app: {
        head: {
            link: [
                {rel: 'preload', as: 'image', href: '/video/poster.jpg', fetchpriority: 'high'},
                {rel: 'icon', href: '/favicon.ico', sizes: '48x48'},
                {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'},
                {rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
                {rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
                {rel: 'icon', href: '/favicon-48x48.png', sizes: '48x48', type: 'image/png'},
                {rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180'},
                {rel: 'manifest', href: '/site.webmanifest'},
            ],
            meta: [
                {name: 'theme-color', content: '#111111'},
            ],
            script: [
                {src: 'https://www.googletagmanager.com/gtag/js?id=G-1NK5731TW0', async: true},
                {
                    innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1NK5731TW0');`,
                },
            ],
        },
    },

    modules: ['@nuxtjs/i18n', '@nuxtjs/google-fonts', '@nuxtjs/sitemap'],

    site: {
        url: 'https://grizzlybarber.pl',
    },

    sitemap: {
        sitemapsPathPrefix: '/sitemap/',
    },

    googleFonts: {
        families: {
            Onest:    [300, 400, 500, 600, 700],
            Spectral: [300, 400, 500, 600, 700],
        },
        display: 'swap',
        preload: true,
    },

    css: ['~/assets/main.scss', 'swiper/css'],

    routeRules: {
        '/**': {headers: securityHeaders},
        '/img/**': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
        '/video/**': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
        '/favicon**': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
        '/android-chrome-**': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
        '/apple-touch-icon.png': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
    },

    runtimeConfig: {
        serpApiKey: process.env.SERPAPI_KEY ?? '',
        public: {
            apiBase: '',
        },
    },

    alias: {
        '@components': resolve(__dirname, 'app/components'),
        '@helpers': resolve(__dirname, 'app/constants-and-helpers'),
        '@api': resolve(__dirname, 'app/api'),
        '@assets': resolve(__dirname, 'assets'),
        '@appTypes': resolve(__dirname, 'app/types'),
    },

    i18n: {
        baseUrl: 'https://grizzlybarber.pl',
        // hreflang uses these codes as-is — keep them equal to `code` so the
        // <link rel="alternate"> tags and the sitemap emit one consistent set.
        locales: [
            {code: 'pl', language: 'pl', name: 'Polski', file: 'pl.json'},
            {code: 'en', language: 'en', name: 'English', file: 'en.json'},
            {code: 'uk', language: 'uk', name: 'Українська', file: 'uk.json'},
            {code: 'ru', language: 'ru', name: 'Русский', file: 'ru.json'},
        ],
        defaultLocale: 'pl',
        strategy: 'prefix',
        // `/` → `/pl` is a fixed rule (no browser detection) — make it permanent
        // so link equity consolidates on the prefixed URLs.
        redirectStatusCode: 301,
        lazy: true,
        langDir: 'locales/',
        detectBrowserLanguage: false,
    },

    vite: {
        plugins: [
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, 'assets/img/svg')],
                symbolId: '[name]',
                svgoOptions: {
                    plugins: [{name: 'convertColors', params: {currentColor: true}}],
                },
            }),
        ],
    },
})
