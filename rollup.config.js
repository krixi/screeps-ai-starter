"use strict";

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sizes from 'rollup-plugin-sizes';

module.exports = {
    input: "src/main.js",
    output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: false,
    },
    external: [ 'lodash' ],

    plugins: [
        clear({ targets: ["dist"] }),
        resolve(),
        commonjs(),
        sizes()
    ]
};
