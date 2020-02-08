import { ErrorMapper } from './errorMapper';

// This is the main game loop function that gets called by Screeps to execute my AI's code.
// It is called by the screeps game engine once per tick.
export const loop = () => {
    // Here we wrap the entirety of the game logic in a try/catch, in case any uncaught exceptions are thrown.
    // This error mapper supports source maps, meaning the stack trace printed in the screeps client will show you
    // the path to the actual source file (rather than everything appearing in dist/main.js).
    ErrorMapper.wrapLoop(update)();
};

// This is where you'll want to add your code.
const update = function() {
    console.log('--[', Game.time, ' start]--');

    // TODO: do the things

    console.log('--[', Game.time, ' end  ]--');
};
