const BaseCommand = require('../utils/structures/BaseCommand');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getBotMessages, getGeneralText, getCountries, getContinents } = require('../utils/Language');

module.exports = class FlagCommand extends BaseCommand {
    constructor() {
        super('flag', ['f']);
    }
    async run(client, message, args) {
        const { language } = client.config.get(message.guild.id);
        let paises = getCountries(language);
        if (args.length) {
            let argumento = args[0].norm();
            let continentes = getContinents(language).map(c => { return c.norm() });
            if (!continentes.includes(argumento)) return message.channel.send(getBotMessages(language, "CONTINENTE_INVALIDO", argumento));
            paises = paises.filter(c => c.continente.norm() === argumento);
        }
        let item = paises[Math.floor(Math.random() * paises.length)];
        let respuestas = [];
        respuestas.push(item.nombre.oficial, item.nombre.comun);
        try {
            let imagen = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
            let embed = new MessageEmbed();
            embed.setTitle(getGeneralText(language, "ADIVINA"));
            embed.setImage(`attachment://${item.cca2}.png`);
            message.channel.send({ embeds: [embed], files: [imagen] });
        }
        catch (err) {
            console.log(err);
        }
        const filter = response => { return respuestas.some(ans => ans.norm() === response.content.norm()) };
        await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
                try {
                    let imagen = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
                    let embed = new MessageEmbed();
                    embed.setAuthor(getGeneralText(language, 'HA_ADIVINADO', collected.first().member.displayName), collected.first().author.displayAvatarURL());
                    embed.setTitle(`${respuestas[0]}`);
                    embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [embed], files: [imagen] });
                }
                catch (err) {
                    console.log(err);
                }
            })
            .catch(() => {
                try {
                    let imagen = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
                    let embed = new MessageEmbed();
                    embed.setTitle(getGeneralText(language, 'NADIE_HA_ADIVINADO'));
                    embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [embed], files: [imagen] });
                }
                catch (err) {
                    console.log(err);
                }
            });
    }
}