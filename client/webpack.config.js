
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path')

const mode = process.env.NODE_ENV === 'production'

module.exports = {
    mode: mode ? 'production' : 'development',
    entry: {
        main: ['@babel/polyfill', './src/index.tsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
                use: {
                    loader: 'url-loader', // this need file-loader
                    options: {
                        limit: 50000
                    }
                }
            },
            {
                test: /\.(tsx|js|ts)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 7000,
        hot: !mode
    }

}
