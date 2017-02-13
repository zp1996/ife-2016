const webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    port = process.NODE_PORT || 3000;

new WebpackDevServer(webpack(config), {
       publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
}).listen(port, 'localhost', (err, res) => {
    if (err) console.log(err);
    console.log(`server is on port ${port}`);
});