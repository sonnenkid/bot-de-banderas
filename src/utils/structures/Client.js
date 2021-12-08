const Discord = require('discord.js');
const { Client, Collection, Intents, Guild } = Discord;

module.exports = class DiscordClient extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS
            ]
        });
        this.languages = ['spanish', 'english'];
        this.defaultLanguage = 'spanish';
        this.commands = new Collection();
    }
}

Guild.prototype.language = null;