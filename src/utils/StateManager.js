const { EventEmitter } = require('events');
const connection = require('../../database/database');

class StateManager extends EventEmitter {
    constructor(opts) {
        super(opts);
        connection
            .then((connection) => {
                this.connection = connection;
                console.log('Conexion a la base de datos exitosa.')
            })
            .catch(err => console.log(err));
    }
}

module.exports = new StateManager();