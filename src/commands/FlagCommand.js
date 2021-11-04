const BaseCommand = require('../utils/structures/BaseCommand');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { getBotMessages, getContinents } = require('../utils/Language');
let paises = require('../../assets/paises/spanish.json');

module.exports = class FlagCommand extends BaseCommand {
    constructor() {
        super('flag', ['f']);
    }
    async run(client, message, args) {
        let language = "spanish";
        if (args.length) {
            let argumento = args[0].norm();
            let continentes = getContinents(language).map(c => { return c.norm() });
            if (!continentes.includes(argumento)) return message.channel.send(getBotMessages(language, "CONTINENTE_INVALIDO", argumento));
            paises = paises.filter(c => c.continente.norm() === argumento);
        }
        //Obtener pais aleatorio
        let item = paises[Math.floor(Math.random() * paises.length)];
        //Guardar respuestas en un array
        let respuestas = [];
        respuestas.push(item.nombre.oficial, item.nombre.comun);
        //Creacion y envio del embed
        try {
            let File = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
            let Embed = new MessageEmbed();
            Embed.setTitle(getBotMessages(language, "ADIVINA"));
            Embed.setImage(`attachment://${item.cca2}.png`);
            message.channel.send({ embeds: [Embed], files: [File] });
        }
        catch (err) {
            console.log(err);
        }
        //Creacion del filtro y lectura de respuestas
        const filter = response => { return respuestas.some(ans => ans.norm() === response.content.norm()) };
        await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
                try {
                    let File = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
                    let Embed = new MessageEmbed();
                    Embed.setAuthor(getBotMessages(language, 'HA_ADIVINADO', collected.first().member.displayName), collected.first().author.displayAvatarURL());
                    Embed.setTitle(`${respuestas[0]}`);
                    Embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [Embed], files: [File] });
                }
                catch (err) {
                    console.log(err);
                }
            })
            .catch(() => {
                try {
                    let File = new MessageAttachment(`C:/Users/fabri/Desktop/Git/bot-de-banderas/assets/banderas/${item.cca2}.png`);
                    let Embed = new MessageEmbed();
                    Embed.setTitle(getBotMessages(language, 'NADIE_HA_ADIVINADO'));
                    Embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [Embed], files: [File] });
                }
                catch (err) {
                    console.log(err);
                }
            });
    }
}