const Discord = require('discord.js');
const Intents = Discord.Intents;

module.exports = class Client extends Discord.Client {
    constructor(options) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
    }
}