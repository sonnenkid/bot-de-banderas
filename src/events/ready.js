const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        const guilds = client.guilds.cache;
        await guilds.forEach(async guild => {
            await StateManager.connection.query(`INSERT IGNORE INTO lang VALUES ('${guild.id}', DEFAULT)`);
            const result = await StateManager.connection.query(`SELECT * FROM lang WHERE guildId = '${guild.id}'`);
            client.config.set(guild.id, { language: result[0][0].guildLang })
            guild.members.fetch();
        });
        console.log(`${client.user.tag} se ha logueado.`);
    }
}