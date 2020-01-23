

// This is the main game loop function that gets called by Screeps to execute my AI's code.
import {logErr} from "./errors";

export const loop = function () {
    try {
        console.log('--[', Game.time, ' start]--');

        // TODO: do the things

        console.log('--[', Game.time, ' end  ]--');
    } catch (err) {
        logErr(err);
    }
};