const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        await fetchDatabase(client.guilds.cache);
        await updateDatabase(client.guilds.cache);
        console.log(`${client.user.tag} se ha logueado.`);
    }
}

async function fetchDatabase(guilds) {
    await guilds.forEach(async guild => {
        await StateManager.connection.query(`INSERT IGNORE INTO lang VALUES ('${guild.id}', DEFAULT)`);
        const result = await StateManager.connection.query(`SELECT * FROM lang WHERE guildId = '${guild.id}'`);
        guild.language = result[0][0].guildLang;
        guild.members.fetch();
    });
}

async function updateDatabase(guilds) {
    const clientGuilds = guilds.map(g => { return g.id });
    const result = await StateManager.connection.query(`SELECT guildId FROM lang`);
    const databaseGuilds = result[0].map(g => { return g.guildId });
    databaseGuilds.forEach(async g => {
        if (!clientGuilds.includes(g)) {
            try {
                await StateManager.connection.query(`DELETE FROM lang WHERE guildId = '${g}'`);
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}