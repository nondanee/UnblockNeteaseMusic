import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

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
		commonjs({
			ignoreTryCatch: false,
		}),
		json(),
		babel({
			babelHelpers: 'bundled',
		}),
		nodeResolve({
			preferBuiltins: true,
		}),
		replace({
			preventAssignment: true,
			delimiters: ['', ''],
			values: {
				// Replace `readable-stream` to `stream.Transform` as
				// a workaround to the circular dependency issue.
				// https://github.com/rollup/rollup/issues/1507#issuecomment-340550539
				"require('readable-stream/transform')":
					"require('stream').Transform",
				'require("readable-stream/transform")':
					'require("stream").Transform',
				'readable-stream': 'stream',
			},
		}),
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
