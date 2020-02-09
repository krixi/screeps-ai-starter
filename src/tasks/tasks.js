import { generateHarversterFSM } from './harvest';
import { upgrader } from './upgrade';
import { builder } from './builder';
import { roles } from '../roles';
import { fsm } from '../fsm';

export const TASKS_BY_ROLE = {
    [roles.HARVESTER]: creep => {
        const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        const states = generateHarversterFSM(creep, target);
        fsm.run(creep, states);
    },
    [roles.UPGRADER]: creep => upgrader.run(creep),
    [roles.BUILDER]: creep => builder.run(creep),
};

export const POPULATION_BY_ROLE = {
    [roles.HARVESTER]: 2,
    [roles.UPGRADER]: 3,
    [roles.BUILDER]: 1,
};
