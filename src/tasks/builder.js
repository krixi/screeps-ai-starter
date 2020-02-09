export class builder {
    static run(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'empty';
        } else if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'build';
        }

        if (creep.memory.state === 'build') {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length === 0) {
                return;
            }

            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: { stroke: '#ffffff' },
                });
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: { stroke: '#ffffff' },
                });
            }
        }
    }
}
