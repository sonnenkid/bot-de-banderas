const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            await registerCommands(client, path.join(dir, file));
        }
        else {
            if (file.endsWith('.js')) {
                let cmdName = require(path.join(filePath, file));
                if (cmdName.prototype instanceof BaseCommand) {
                    try {
                        const cmd = new cmdName();
                        await client.commands.set(cmd.name, cmd);
                        if (cmd.aliases) {
                            await cmd.aliases.forEach(alias => client.aliases.set(alias, cmd));
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }
}

async function registerEvents(client, dir = '') {
    const filePath = path.join(__dirname, dir)
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) {
            registerEvents(client, path.join(dir, file));
        }
        else {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const event = new Event();
                    client.on(event.name, event.run.bind(null, client));
                }
            }
        }
    }
}

module.exports = { registerCommands, registerEvents };