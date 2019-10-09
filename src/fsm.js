class FSM {

    constructor(config) {
        this.state = config;
        this.status = this.state.initial;
        this.und = '';
        this.history = ['normal'];
        this.historyState = 1;
    }

    getState() {
        return this.status
    }

    changeState(state) {
        for (let key in this.state.states) {
            if (key === state) {
                this.status = state;
                if (this.history.length > this.historyState) {
                    for (let i = 0; i <= this.history.length - this.historyState; i++) {
                    this.history.pop()
                    }
                }
                this.history.push(state);
                this.historyState++;
                console.log(this.history);
                return;
            }
        }
        throw new Error();
    }

    trigger(event) {
         for (let key in this.state.states[this.status].transitions) {
             if (key === event) {
                 this.status = this.state.states[this.status].transitions[event];
                 if (this.history.length > this.historyState) {
                     for (let i = 0; i <= this.history.length - this.historyState; i++) {
                     this.history.pop()
                     }
                 }
                 this.history.push(this.status);
                 this.historyState++;
                 console.log(this.history);
                 return;
             }
         }
         throw new Error();
    }

    reset() {
        this.status = 'normal';
    }

    getStates(event) {
        let array = [];
        if (event != 'get_up' && event != 'get_tired' && event != 'get_hungry' && event != 'eat' && event != 'study' && event !== undefined) return array;
        for (let key in this.state.states.normal.transitions) {
            if (key === event) {
                array.push('normal');
            }
        }    
        for (let key in this.state.states.busy.transitions) {
            if (key === event) {
                array.push('busy');
            }
        }
        for (let key in this.state.states.hungry.transitions) {
            if (key === event) {
                array.push('hungry');
            }
        }
        for (let key in this.state.states.sleeping.transitions) {
            if (key === event) {
                array.push('sleeping');
            }
        }
        if (array.length === 0) {array = ['normal', 'busy', 'hungry', 'sleeping']} 
        return array;

    }

    undo() {
        let different = this.history.length - this.historyState + 1;
        if (this.historyState === 1) return false;
        this.status = this.history[this.history.length - different - 1];
        this.historyState--;
        return true;

    }

    redo() {
        let different = this.history.length - this.historyState;
        if (different === 0) return false;
        this.status = this.history[this.history.length - different];
        this.historyState++;
        if (different === 0) return false;
        return true;


    }

    clearHistory() {
        this.history = ['normal'];
        this.historyState = 1;
    }
}

const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};

module.exports = FSM;

