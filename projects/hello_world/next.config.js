const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isPackageProd = process.env.package_env === 'production'

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.resolve(__dirname, './node_modules/compass-mixins/lib')]
    },
    assetPrefix: isProd ? 'https://cnd.xxxxx.com/hello_world' : '',
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.DefinePlugin({
            __IS_ENV_PRODUCTION__: isProd,
        }))

        return config
    }
}
