const BaseCommand = require('../utils/structures/BaseCommand');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getBotMessages, getGeneralText, getContinents } = require('../utils/Language');

module.exports = class FlagCommand extends BaseCommand {
    constructor() {
        super('flag', ['f']);
    }
    async run(client, message, args) {
        const { language } = message.guild;
        let paises = require(`../utils/localization/${language}/countries.json`);
        if (args.length) {
            let argumento = args[0].norm();
            let continentes = getContinents(language).map(c => { return c.norm() });
            if (!continentes.includes(argumento)) return message.channel.send(getBotMessages(language, 'CONTINENTE_INVALIDO', argumento));
            paises = paises.filter(c => c.continente.norm() === argumento);
        }
        let item = paises[Math.floor(Math.random() * paises.length)];
        let respuestas = [item.nombre.oficial, item.nombre.comun];
        try {
            let imagen = new MessageAttachment(`src/assets/banderas/${item.cca2}.png`);
            let embed = new MessageEmbed();
            embed.setTitle(getGeneralText(language, 'ADIVINA'));
            embed.setImage(`attachment://${item.cca2}.png`);
            message.channel.send({ embeds: [embed], files: [imagen] });
        }
        catch {
            console.error();
        }
        const filter = response => { return respuestas.some(r => r.norm() === response.content.norm()) };
        await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
                try {
                    let imagen = new MessageAttachment(`src/assets/banderas/${item.cca2}.png`);
                    let embed = new MessageEmbed();
                    embed.setAuthor(getGeneralText(language, 'HA_ADIVINADO', collected.first().member.displayName), collected.first().author.displayAvatarURL());
                    embed.setTitle(`${respuestas[0]}`);
                    embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [embed], files: [imagen] });
                }
                catch {
                    console.error();
                }
            })
            .catch(() => {
                try {
                    let imagen = new MessageAttachment(`src/assets/banderas/${item.cca2}.png`);
                    let embed = new MessageEmbed();
                    embed.setTitle(getGeneralText(language, 'NADIE_HA_ADIVINADO'));
                    embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [embed], files: [imagen] });
                }
                catch {
                    console.error();
                }
            });
    }
}