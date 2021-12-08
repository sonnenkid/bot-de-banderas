require('dotenv').config();
require('./utils/Norm');
const DiscordClient = require('./utils/structures/Client');
const client = new DiscordClient();
const { registerCommands, registerEvents } = require('./utils/Register');

(async () => {
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    client.login(process.env.BOT_TOKEN);
})();