'use strict';

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sizes from 'rollup-plugin-sizes';
import { eslint } from 'rollup-plugin-eslint';
import { ScreepsAPI } from 'screeps-api';
import fs from 'fs';
import path from 'path';

const DIST = './dist';

// Set to a truthy value to use your .screeps.yaml file and upload directly.
// NOTE: You'll need to update the call to `uploadToScreeps()` to match the servername
// you set in your .screeps.yaml. You can add multiple call to `uploadToScreeps()` to
// upload your code to multiple servers after building.
const USE_SCREEPS_API = !!process.env.UPLOAD;

/**
 * A simple plugin to get sourcemaps working with Screeps
 *
 * Screeps rejects files that aren't JS then trims the .js extension on upload.
 * Also, because the map is required on use, it must be a valid module so this
 * prepends `module.exports=` to the produced JSON.
 */
const prepareSourcemaps = () => {
    const src = path.join(DIST, 'main.js.map');
    const dest = path.join(DIST, 'main.js.map.js');
    return {
        name: 'prepare-sourcemaps',
        writeBundle: () => {
            fs.renameSync(src, dest);
            const map = fs.readFileSync(dest, 'utf8');
            const es6Map = 'module.exports=' + map;
            fs.writeFileSync(dest, es6Map);
        }
    };
};

/**
 * This is a simple plugin to upload your code and sourcemap to the Screeps server.
 * It uses the [ScreepsAPI](https://github.com/screepers/node-screeps-api) package to upload your code
 * after it's been built. Configure the .screeps.yaml file in your local filesystem and set UPLOAD=1 when running
 * rollup to use this. Don't forget to set the server and branch correctly.
 * @param server The server name in .screeps.yaml to upload to
 * @param branch The branch in that server to upload to. Should already exist.
 * @returns {{writeBundle: writeBundle, name: string}}
 */
const uploadToScreeps = (server, branch) => {
    const src = path.join(DIST, 'main.js');
    const srcMap = path.join(DIST, 'main.js.map.js');
    return {
        name: 'upload-to-screeps',
        writeBundle: () => {
            const doUpload = async () => {
                const api = await ScreepsAPI.fromConfig(server);
                return api.code.set(branch, {
                    ['main']: fs.readFileSync(src, 'utf8'),
                    ['main.js.map']: fs.readFileSync(srcMap, 'utf8')
                });
            };
            doUpload().then(r =>
                console.log(
                    `--------\nupload to ${server}/${branch}: ${JSON.stringify(
                        r
                    )}`
                )
            );
        }
    };
};

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true
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
        prepareSourcemaps(),
        ...(USE_SCREEPS_API ? [uploadToScreeps('main', 'default')] : [])
    ]
};
