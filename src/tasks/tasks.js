import { harvester } from './harvest';
import { upgrader } from './upgrade';
import { builder } from './builder';
import { roles } from '../roles';

export const TASKS_BY_ROLE = {
    [roles.HARVESTER]: creep => harvester.run(creep),
    [roles.UPGRADER]: creep => upgrader.run(creep),
    [roles.BUILDER]: creep => builder.run(creep),
};

export const POPULATION_BY_ROLE = {
    [roles.HARVESTER]: 2,
    [roles.UPGRADER]: 3,
    [roles.BUILDER]: 1,
};
