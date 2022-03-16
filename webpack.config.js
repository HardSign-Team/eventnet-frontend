const { resolve } = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
module.exports = {
    context: path.join(__dirname),
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.html$/,
            //     use: ['html-loader'],
            //     exclude: /node_modules/
            // },
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
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new ESLintPlugin(),
        new ReactRefreshWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ]
};
