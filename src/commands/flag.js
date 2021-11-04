const BaseCommand = require('../utils/structures/BaseCommand');

module.exports = class FlagCommand extends BaseCommand {
    constructor() {
        super('flag', ['f'], 'Genera una bandera');
    }
    async run(client, message, args) {
        if (args.length) {
            if (!continentes.includes(args[0])) return message.channel.send("Continente invalido");
            //Filtrar paises por continente
            paises = paises.filter(c => c.continente.toLowerCase() === args[0]);
        }
        //Obtener pais aleatorio
        let item = paises[Math.floor(Math.random() * paises.length)];
        //Guardar respuestas en un array
        let respuestas = [];
        respuestas.push(item.nombre.comun, item.nombre.oficial);

        //Creacion y envio del embed
        try {
            let File = new MessageAttachment(`C:/Users/fabri/Desktop/A/flags-discord/assets/banderas/${item.cca2}.png`);
            let Embed = new MessageEmbed();
            Embed.setTitle('ADIVINA')
            Embed.setImage(`attachment://${item.cca2}.png`);
            message.channel.send({ embeds: [Embed], files: [File] });
        }
        catch (err) {
            console.log(err);
        }
        //Creacion del filtro y lectura de respuestas
        const filter = response => { return respuestas.some(ans => ans.toLowerCase() === response.content.toLowerCase()) };
        await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
                try {
                    let File = new MessageAttachment(`C:/Users/fabri/Desktop/A/flags-discord/assets/banderas/${item.cca2}.png`);
                    let Embed = new MessageEmbed();
                    Embed.setAuthor(`${collected.first().member.displayName} ha adivinado!`, collected.first().author.displayAvatarURL());
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
                    let File = new MessageAttachment(`C:/Users/fabri/Desktop/A/flags-discord/assets/banderas/${item.cca2}.png`);
                    let Embed = new MessageEmbed();
                    Embed.setTitle('Nadie ha adivinado');
                    Embed.setImage(`attachment://${item.cca2}.png`);
                    message.channel.send({ embeds: [Embed], files: [File] });
                }
                catch (err) {
                    console.log(err);
                }
            });
        console.log(`Comando ${this.name} ejecutado`);
    }
}