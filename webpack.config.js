const { resolve } = require("path");

const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    context: path.join(__dirname),
    entry: {
        index: "./src/index.tsx",
    },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "index.js",
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|woff|woff2|eot)$/,
                use: ['file-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        port: 9000,
        open: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            inject: "body",
        }),
        new ESLintPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ]
};
