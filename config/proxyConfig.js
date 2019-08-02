module.exports = {
    proxy: {
        '/apis': {
            target: 'http://localhost:63844/api/',
            changeOrigin: true,
            pathRewrite: {
                '^/apis': ''
            }
        },
        '/apio': {
            target: 'http://m.airkx.com/mwork/',
            changeOrigin: true,
            pathRewrite: {
                '^/apio': ''
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
