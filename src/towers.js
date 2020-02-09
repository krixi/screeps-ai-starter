export class towers {
    static operate(room) {
        const towers = room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_TOWER,
        });

        Object.values(towers).map(tower => {
            const damaged = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: s => s.hits < s.hitsMax,
            });
            if (damaged) {
                tower.repair(damaged);
            }

            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        });
    }
}
