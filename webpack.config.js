const path  = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./assets/js/main.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' // specify the loader
                } 
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    { 
                        loader: 'css-loader', 
                        options: { importLoaders: 1 } 
                    },
                    { 
                        loader:  "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                require("autoprefixer"),
                                require("postcss-import")
                            ]
                        }
                    }
                   
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "assets/output"),
        filename: "js/[name].js" // string
    },
    devServer: {
        port: 3000,
        publicPath: "/asset/output/",
        host: "0.0.0.0"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ]
}