module.exports = {
    proxy: {
        '/apis': {
            target: 'http://m.airkx.com/mwork/',
            changeOrigin: true,
            pathRewrite: {
                '^/apis': ''
            }
        },
        '/apiw': {
            target: 'http://www.airkx.com/kaixing/',
            changeOrigin: true,
            pathRewrite: {
                '^/apiw': ''
            }
        }
    }
}
