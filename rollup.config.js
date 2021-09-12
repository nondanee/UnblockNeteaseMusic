import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

/**
 * @type {Partial<import('rollup').RollupOptions>}
 */
const commonConfig = {
	output: {
		dir: 'precompiled',
		format: 'cjs',
		banner: ['#!/usr/bin/node', ''].join('\n'),
	},
	plugins: [
		commonjs(),
		json(),
		babel({
			babelHelpers: 'bundled',
		}),
		nodeResolve(),
	],
};

/**
 * @type {import('rollup').RollupOptions}
 */
const appConfig = {
	input: './src/app.js',
	...commonConfig,
};

/**
 * @type {import('rollup').RollupOptions}
 */
const bridgeConfig = {
	input: './src/bridge.js',
	...commonConfig,
};

export default [appConfig, bridgeConfig];
