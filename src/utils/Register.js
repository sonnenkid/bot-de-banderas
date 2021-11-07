const fs = require('fs');
const path = require('path');
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir) {
    const filePath = path.join(__dirname, dir);
    const commandFiles = fs.readdirSync(filePath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const Command = require(path.join(filePath, file));
        if (Command.prototype instanceof BaseCommand) {
            try {
                const command = new Command();
                client.commands.set(command.name, command);
                if (command.aliases) {
                    command.aliases.forEach(alias => client.aliases.set(alias, command));
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

async function registerEvents(client, dir) {
    const filePath = path.join(__dirname, dir);
    const eventFiles = fs.readdirSync(filePath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const Event = require(path.join(filePath, file));
        if (Event.prototype instanceof BaseEvent) {
            try {
                const event = new Event();
                client.on(event.name, event.run.bind(null, client));
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = { registerCommands, registerEvents };