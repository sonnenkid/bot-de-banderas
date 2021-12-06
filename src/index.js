require('dotenv').config();
require('./utils/Norm');
const Client = require('./utils/structures/Client');
const client = new Client();
const { registerCommands, registerEvents } = require('./utils/Register');

(async () => {
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    client.login(process.env.BOT_TOKEN);
})();