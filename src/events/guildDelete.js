const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');

module.exports = class GuildDeleteEvent extends BaseEvent {
    constructor() {
        super('guildDelete');
    }
    async run(client, guild) {
        try {
            await StateManager.connection.query(`DELETE FROM lang WHERE guildId = '${guild.id}'`);
        }
        catch (err) {
            console.log(err);
        }
    }
}