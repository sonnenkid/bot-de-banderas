require('dotenv').config();
const Client = require('./utils/structures/Client');
const client = new Client();
const { registerCommands, registerEvents } = require('./utils/Register');

(async () => {
    client.config = new Map();
    client.commands = new Map();
    client.aliases = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, "../events");
    client.login(process.env.BOT_TOKEN);
})();

const unorm = require('unorm');
const combining = /[\u0300-\u036F]/g;

String.prototype.norm = function () {
    return unorm.nfkd(this).replace(combining, '').toLowerCase();
};