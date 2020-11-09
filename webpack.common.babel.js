/**
 * Webpack v4 common config
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @version id$
 */

import CleanWebpackPlugin from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const resolve = (...pieces) => path.join(__dirname, ...pieces);

module.exports = {
    context: resolve('src'),
    entry: {
        app: ['@babel/polyfill', './index.js'],
        styles: ['./styles/style.scss'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                // Match .sass, .scss and .css
                test: /\.((s[ac])|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                // Some image formats so you can import images, as well as woff
                test: /\.(png|gif|jpg|svg|woff)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(['public/build']),
        new ManifestPlugin({
            generate: (seed, files) => {
                const re = /(?:\.([^.]+))?$/;
                return files.reduce((manifest, { name, path, isInitial }) => {
                    const extension = re.exec(name)[1];
                    let result = {};
                    if (isInitial) {
                        if (manifest.hasOwnProperty(extension)) {
                            result = {
                                ...manifest,
                                [extension]: [...manifest[extension], { file: path }],
                            };
                        } else {
                            result = {
                                ...manifest,
                                [extension]: [{ file: path }],
                            };
                        }
                    } else {
                        result = {
                            ...manifest,
                        };
                    }
                    return result;
                }, seed);
            },
        }),
    ],
};
