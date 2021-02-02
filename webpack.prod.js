const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main[contenthash].abc.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
            ]
        }, {
            test: /\.css$/,
            exclude: /styles\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {

            test: /styles\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]

        }, {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                attributes: false,
                minimize: false
            }
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
            ignoreOrder: false
        }), new CopyWebPackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        }), new MinifyPlugin(), new CleanWebpackPlugin()
    ]
}