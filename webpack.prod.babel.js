/**
 * Webpack v4 production build config
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @version id$
 */

import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SentryPlugin from '@sentry/webpack-plugin';
import common from './webpack.common.babel.js';
import merge from 'webpack-merge';
import path from 'path';
import { version } from './package.json';

const resolve = (...pieces) => path.join(__dirname, ...pieces);

const ENABLE_SENTRY = /^1|y(es)?|true$/.test(process.env.ENABLE_SENTRY);
const build_version = `${version}-${Date.now()}`;

const plugins = [
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            ENABLE_SENTRY: Boolean(ENABLE_SENTRY),
        },
        __VERSION__: JSON.stringify(build_version),
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash:5].css',
        // SL says: needed to comment this to fix production build missing vendors.css!
        // chunkFilename: '[id].css',
    }),
];

if (ENABLE_SENTRY) {
    plugins.push(
        new SentryPlugin({
            include: '.',
            ignore: [
                'node_modules',
                '__mocks__',
                '.*.js',
                'postcss.config.js',
                'webpack.*.js',
                'vendor',
                'coverage',
            ],
            release: build_version,
            filenameTransform: filename => `~/build/${filename}`,
            deleteAfterCompile: true,
        }),
    );
}

module.exports = merge(common, {
    output: {
        chunkFilename: '[name].[contenthash:5].js',
        filename: '[name].[contenthash:5].js',
        path: resolve('public', 'build'),
        publicPath: '/build/',
    },
    optimization: {},
    devtool: ENABLE_SENTRY ? 'source-map' : false,
    mode: 'production',
    plugins,
});
