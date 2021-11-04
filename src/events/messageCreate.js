const BaseEvent = require('../utils/structures/BaseEvent');
const prefix = '$';

module.exports = class MessageCreateEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }
    async run(client, message) {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) {
            const [commandName, ...commandArgs] = message.content.toLowerCase().slice(prefix.length).split(/\s+/);
            const command = client.commands.get(commandName);
            if (command) {
                command.run(client, message, commandArgs);
                return;
            }
            const alias = client.aliases.get(commandName);
            if (alias) {
                alias.run(client, message, commandArgs);
                return;
            }
        }
    }
}