const webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

module.exports = {
    entry: './app',
    target: 'node',
    output: {
        path: path.resolve(__dirname),
        filename: 'ssr.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals: fs.readdirSync(path.resolve(__dirname, './node_modules')).concat([
        'react-dom/server',
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext;
    }, {})
};