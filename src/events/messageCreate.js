const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');

module.exports = class MessageCreateEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }
    async run(client, message) {
        if (message.author.bot) return;
        if (message.content.startsWith('$')) {
            const [commandName, ...commandArgs] = message.content.toLowerCase().slice(1).split(/\s+/);
            const command = client.commands.get(commandName);
            if (command) {
                command.run(client, message, commandArgs);
                return;
            }
        }
    }
}