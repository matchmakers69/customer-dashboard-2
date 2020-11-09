/**
 * Webpack v4 development build config
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @version id$
 */

import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import common from './webpack.common.babel';
import merge from 'webpack-merge';
import path from 'path';

const resolve = (...pieces) => path.join(__dirname, ...pieces);

module.exports = merge(common, {
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js',
        path: resolve('public', 'build'),
        publicPath: '/build/',
    },
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
        disableHostCheck: true,
        contentBase: './public',
        port: 8080,
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
            __VERSION__: `dev-${Date.now()}`,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            // SL says: needed to comment this to fix production build missing vendors.css!
            // chunkFilename: '[id].css',
        }),
    ],
});
