const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor() {
        super('guildCreate');
    }
    async run(client, guild) {
        const { defaultLanguage } = client;
        try {
            await StateManager.connection.query(`INSERT INTO lang VALUES ('${guild.id}', DEFAULT)`);
            guild.language = defaultLanguage;
        }
        catch (err) {
            console.log(err);
        }
    }
}