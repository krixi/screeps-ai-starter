import { SourceMapConsumer } from 'source-map';
import { info } from './debug-log';

// This just reloads the source map when the script is loaded into memory 🤷
const consumer = new SourceMapConsumer(require('./main.js.map'));

// Cache previously mapped traces to improve performance
// { [key: string]: string }
const cache = {};

// NOTE: this is originally from
// https://github.com/screepers/screeps-typescript-starter/blob/master/src/utils/ErrorMapper.ts
export class ErrorMapper {
    // Used in main to wrap the update.
    static wrapLoop(loop) {
        return () => {
            try {
                loop();
            } catch (e) {
                ErrorMapper.report(e);
            }
        };
    }

    // Used to map an error to its source and print the trace for debugging.
    static report(e) {
        if (e instanceof Error) {
            if ('sim' in Game.rooms) {
                const message = `Source maps don't work in the simulator - displaying original error`;
                info(`${message}\n${_.escape(e.stack)}`, 'red');
            } else {
                info(
                    `${_.escape(ErrorMapper.sourceMappedStackTrace(e))}`,
                    'red'
                );
            }
        } else {
            // can't handle it
            throw e;
        }
    }

    /**
     * Generates a stack trace using a source map generate original symbol names.
     *
     * WARNING - EXTREMELY high CPU cost for first call after reset - >30 CPU! Use sparingly!
     * (Consecutive calls after a reset are more reasonable, ~0.1 CPU/ea)
     *
     * @param {Error | string} error The error or original stack trace
     * @returns {string} The source-mapped stack trace
     */
    static sourceMappedStackTrace(error) {
        const stack = error instanceof Error ? error.stack : error;
        if (stack in cache) {
            return cache[stack];
        }

        const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\/]+):(\d+):(\d+)\)?$/gm;
        let match;
        let outStack = error.toString();

        while ((match = re.exec(stack))) {
            if (match[2] === 'main') {
                const pos = consumer.originalPositionFor({
                    column: parseInt(match[4], 10),
                    line: parseInt(match[3], 10)
                });

                if (pos.line != null) {
                    if (pos.name) {
                        outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
                    } else {
                        if (match[1]) {
                            // no original source file name known - use file name from given trace
                            outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
                        } else {
                            // no original source file name known or in given trace - omit name
                            outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
                        }
                    }
                } else {
                    // no known position
                    break;
                }
            } else {
                // no more parseable lines
                break;
            }
        }

        cache[stack] = outStack;
        return outStack;
    }
}
