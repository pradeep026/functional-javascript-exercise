const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

console.log(`process env :: [${process.env.NODE_ENV}]`);
module.exports = {
    mode: process.env.NODE_ENV === 'development' ? `development` : `production`,
    
    entry: './src/js/index.js',

    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: 'js/[name].[chunkhash].js',
    },
    
    devtool: 'cheap-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { minimize:  process.env.NODE_ENV !== 'production' }
                }]
            },
            {
                test: /\.png|.jpeg|.jpg|.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images', // Create and copy images into assets/images subdirectory
                    }
                }]
            }
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebPackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html'  // Copy the index.html template to dist
        })
    ]
}