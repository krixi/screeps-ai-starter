import { harvester } from './harvest';
import { upgrader } from './upgrade';

export const TASKS_BY_ROLE = {
    harvest: creep => harvester.run(creep),
    upgrade: creep => upgrader.run(creep),
};
