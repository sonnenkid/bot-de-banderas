require('dotenv').config();
const BaseCommand = require('../utils/structures/BaseCommand');
const { getBotMessages } = require('../utils/Language');
const StateManager = require('../utils/StateManager');

module.exports = class LanguageCommand extends BaseCommand {
    constructor() {
        super('language', ['lang']);
    }
    async run(client, message, args) {
        const { language } = message.guild;
        if (!args.length) return message.channel.send(getBotMessages(language, "IDIOMA_ACTUAL", language));
        const targetLanguage = args[0].norm();
        if (!client.languages.includes(targetLanguage)) return message.channel.send(getBotMessages(language, 'IDIOMA_INVALIDO', targetLanguage));
        if (language !== targetLanguage) {
            try {
                await StateManager.connection.query(`UPDATE lang SET guildLang = '${targetLanguage}' WHERE guildId = '${message.guild.id}'`);
                message.guild.language = targetLanguage;
            }
            catch (err) {
                console.log(err);
            }
            message.channel.send(getBotMessages(targetLanguage, 'CAMBIOS_GUARDADOS'));
        } else message.channel.send(getBotMessages(language, 'IDIOMA_EN_USO', targetLanguage));
    }
}