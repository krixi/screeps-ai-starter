import { ErrorMapper } from './errorMapper';
import { TASKS_BY_ROLE } from './tasks/tasks';
import { spawnCreepsIfNeeded } from './spawn-controller';
import { info } from './debug-log';
import { towers } from './towers';

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
    info(`--[ ${Game.time} start]--`);

    // Clear out the memory of dead creeps
    Object.keys(Memory.creeps).map(name => {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
            info(`💀 ${name} has died`);
        }
    });

    for (let name in Game.creeps) {
        const creep = Game.creeps[name];

        const role = creep.memory.role;
        if (!(role in TASKS_BY_ROLE)) {
            throw new Error(`Unable to find implementation for role: ${role}`);
        }

        const task = TASKS_BY_ROLE[role];
        task(creep);
    }

    const spawn = Object.values(Game.spawns)[0];
    spawnCreepsIfNeeded(spawn);

    towers.operate(spawn.room);

    info(`--[ ${Game.time} end  ]--`);
};
