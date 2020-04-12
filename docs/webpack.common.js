const iCrushLoaderPlugin = require('icrush/webpack/icrush-loader-plug');

module.exports = {
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'dist/main.js',
        chunkFilename: 'dist/bundle.[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.iCrush$/,
            loader: ['icrush/webpack/icrush-loader.js'],
            exclude: /node_modules/
        }, {
            test: /\.(css|scss)$/,
            loader: ['style-loader', 'icrush/webpack/icrush-style-loader.js', 'css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: [{
                loader: "url-loader",
                options: {
                    name: "dist/[name].[ext]",
                    context: "src/asset",
                    limit: 5000
                }
            }]
        }]
    },
    plugins: [
        new iCrushLoaderPlugin()
    ]
};
