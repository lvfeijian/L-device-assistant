module.exports = {
    publicPath: './',
    assetsDir: '',
    productionSourceMap: false,
    lintOnSave: true,
    devServer: {
        port: 8066,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://192.168.1.117:9800',
                changeOrigin: true
            }
        }
    }
}