'use strict';

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sizes from 'rollup-plugin-sizes';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';

// Set this value to your Screeps client's "local folder" and it will be copied there after a successful build.
// This is found in the lower left of the client window with the console's "Script" tab open.
const SCREEPS_CLIENT_UPLOAD_FOLDER = '';

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: false
    },
    external: ['lodash'],

    plugins: [
        clear({ targets: ['dist'] }),
        // Provides clickable URLs in supporting editors and offending
        // outlines with arrows by default.
        // For just clickable URLs use "unix".
        eslint({ throwOnError: true, formatter: 'codeframe' }),
        resolve(),
        commonjs(),
        sizes(),
        ...(SCREEPS_CLIENT_UPLOAD_FOLDER
            ? [
                  copy({
                      targets: [
                          { src: 'dist/*', dest: SCREEPS_CLIENT_UPLOAD_FOLDER }
                      ],
                      hook: 'writeBundle'
                  })
              ]
            : [])
    ]
};
