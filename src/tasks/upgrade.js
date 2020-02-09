export class upgrader {
    static run(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'empty';
        } else if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'upgrade';
        }

        if (creep.memory.state === 'upgrade') {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
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
