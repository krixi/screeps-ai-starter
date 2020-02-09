import { roles } from './roles';
import { POPULATION_BY_ROLE } from './tasks/tasks';
import { info } from './debug-log';

export const spawnCreepsIfNeeded = spawn => {
    // don't spawn something new if already spawning something
    info(`spawning = ${JSON.stringify(spawn.spawning)}`);
    if (spawn.spawning) {
        spawn.room.visual.text(`🛠️ ${spawn.spawning.name}`, spawn.pos.x + 1, spawn.pos.y, {
            align: 'left',
            opacity: 0.8,
        });
        return;
    }

    const counts = _.countBy(Game.creeps, creep => creep.memory.role);
    for (let r in roles) {
        const role = roles[r];

        if (!(role in counts) || counts[role] < POPULATION_BY_ROLE[role]) {
            // spawn a new one of these roles

            // TODO: generate a more specific body type for this role.
            const name = `${role}-${Game.time}`;
            const spawnStatus = spawn.spawnCreep([WORK, CARRY, MOVE], name, {
                memory: { role: role },
            });
            if (spawnStatus === OK) {
                break; // done spawning this tick.
            }
        }
    }
};
