require('dotenv').config();
const Client = require('./utils/structures/Client');
const client = new Client();
const { registerCommands, registerEvents, registerLanguages } = require('./utils/Register');
const unorm = require('unorm');
const combining = /[\u0300-\u036F]/g;

(async () => {
    await registerCommands(client, '../commands');
    await registerEvents(client, "../events");
    await registerLanguages(client, "../utils/localization/countries");
    client.login(process.env.BOT_TOKEN);
})();



String.prototype.norm = function () {
    return unorm.nfkd(this).replace(combining, '').toLowerCase();
};