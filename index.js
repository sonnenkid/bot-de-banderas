require('dotenv').config();
const Client = require('./src/utils/structures/Client');
const client = new Client();
const { registerCommands, registerEvents } = require('./src/utils/Register');
const unorm = require('unorm');
const combining = /[\u0300-\u036F]/g;

(async () => {
    client.config = new Map();
    String.prototype.norm = function () {
        return unorm.nfkd(this).replace(combining, '').toLowerCase();
    }
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    client.login(process.env.BOT_TOKEN);
})();