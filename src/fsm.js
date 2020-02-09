export class fsm {
    static getCurrentStateName(creep, states) {
        if (!('state' in creep.memory)) {
            creep.memory.state = states.defaultState;
        }
        return creep.memory.state;
    }

    static getCurrentState(creep, states) {
        const name = fsm.getCurrentStateName(creep, states);
        if (name in states) {
            return states[name];
        }
        throw new Error(`${creep.name} has state ${name} but no implementation was found`);
    }

    static transition(creep, states, eventName) {
        const state = fsm.getCurrentState(creep, states);
        if (!state || !state.txs || !(eventName in state.txs)) {
            throw new Error(`${creep.name} tried to send event ${eventName} but no transition exists for that event!`);
        }

        const nextStateName = state.txs[eventName];
        if (!(nextStateName in states)) {
            throw new Error(`${creep.name} -> next state ${nextStateName} does not exist`);
        }

        // leave the current state and enter the new state.
        if ('onExit' in state && typeof state.onExit === 'function') {
            state.onExit(creep);
        }

        const nextState = states[nextStateName];
        creep.memory.state = nextStateName;

        if ('onEnter' in nextState && typeof nextState.onEnter === 'function') {
            nextState.onEnter(creep);
        }
    }

    static run(creep, states) {
        const decideState = fsm.getCurrentState(creep, states);
        decideState.decide(creep);

        const runState = fsm.getCurrentState(creep, states);
        runState.run(creep);
    }
}
