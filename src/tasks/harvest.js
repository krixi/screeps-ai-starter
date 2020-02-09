import { fsm } from '../fsm';

export const generateHarversterFSM = (creep, target) => {
    // Define our FSM here.
    const states = {
        defaultState: 'harvest',
        harvest: {
            decide: creep => {
                if (creep.store.getFreeCapacity() === 0) {
                    fsm.transition(creep, states, 'full');
                }
            },
            run: creep => {
                creep.say('⚡');
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: { stroke: '#ffffff' },
                    });
                }
            },
            txs: {
                full: 'deliver',
            },
        },
        deliver: {
            decide: creep => {
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    fsm.transition(creep, states, 'empty');
                }
            },
            run: creep => {
                // TODO: abstract deliver into it's own task probably.
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: s =>
                        (s.structureType === STRUCTURE_EXTENSION ||
                            s.structureType === STRUCTURE_SPAWN ||
                            s.structureType === STRUCTURE_TOWER) &&
                        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
                });

                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {
                            visualizePathStyle: { stroke: '#ffffff' },
                        });
                    }
                }
            },
            txs: {
                empty: 'harvest',
            },
        },
    };

    return states;
};
