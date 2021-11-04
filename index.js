require('dotenv').config();
const Client = require('./src/utils/structures/Client');
const client = new Client();
const { registerCommands, registerEvents } = require('./src/utils/Register');

(async () => {
    client.config = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    client.login(process.env.BOT_TOKEN);
})();