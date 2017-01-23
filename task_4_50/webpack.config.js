const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    exec = require('child_process').exec,
    isProduction = process.env.NODE_ENV === 'production',
    htmlWebpackPlugins = [];


// 首先删除之前打包文件
exec('rm -r -f ./build', () => {
    console.log('delete old output file, now is to bundle');
});

module.exports = {
    entry: {
        app: [
            './src/app',
            `webpack-dev-server/client?http://localhost:${3000}`,
            'webpack/hot/only-dev-server'
        ],
        lib: [
            "react",
            "react-dom",
            "react-redux",
            "redux",
            "react-router",
            "react-router-redux",
            "classnames"
        ]
    },
    devtool: isProduction ? '' : 'cheap-module-eval-source-map',  // 生产环境中用
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass')
        }, {
            test: /\.(gif|jpg|png)$/,
            loader: 'url-loader?limit=8192&name=[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.bundle.js'),
        new ExtractTextPlugin('css/[name].style.css'),
        new webpack.NoErrorsPlugin()
    ]
};