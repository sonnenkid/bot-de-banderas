require('dotenv').config();
const BaseCommand = require('../utils/structures/BaseCommand');
const { getBotMessages } = require('../utils/Language');
const serverLanguages = process.env.SV_LANG.split(',');
const StateManager = require('../utils/StateManager');

module.exports = class LanguageCommand extends BaseCommand {
    constructor() {
        super('language', ['lang']);
    }
    async run(client, message, args) {
        if (!args.length) return message.channel.send("blabla");
        const serverConfig = client.config.get(message.guild.id);
        const { language } = serverConfig;
        const targetLanguage = args[0].norm();
        if (!serverLanguages.includes(targetLanguage)) return message.channel.send(getBotMessages(language, 'IDIOMA_VALIDO', targetLanguage));
        if (language !== targetLanguage) {
            try {
                await StateManager.connection.query(`UPDATE lang SET guildLang = '${targetLanguage}' WHERE guildId = '${message.guild.id}'`);
                serverConfig.language = targetLanguage;
                client.config.set(message.guild.id, serverConfig);
            }
            catch (err) {
                console.log(err);
            }
            message.channel.send(getBotMessages(targetLanguage, 'CAMBIOS_GUARDADOS'));
        } else message.channel.send(getBotMessages(language, 'IDIOMA_EN_USO', targetLanguage));
    }
}