module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://oleinikovapolina.github.io/Weather/dist/'
        : '/',
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        name: 'Weather',
        msTileColor: '#fff',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#0c519e',
        manifestOptions: {
            start_url: "./",
            scope: ".",
            background_color: '#fff'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'public/sw.js',
        }
    }
}
