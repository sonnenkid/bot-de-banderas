const file = require('./languages/localization.json');

function getBotMessages(language, id, ...repl) {
    const { bot_messages } = file[language];
    if (!bot_messages[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    bot_messages[id] = bot_messages[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : "%REPL%");
    return bot_messages[id];
}

function getBotCommands(language, id, ...repl) {
    const { bot_commands } = file[language];
    if (!bot_commands[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    bot_commands[id] = bot_commands[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : "%REPL%");
    return bot_commands[id];
}

function getGeneralText(language, id, ...repl) {
    const { general_text } = file[language];
    if (!general_text[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    general_text[id] = general_text[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : "%REPL%");
    return general_text[id];
}

function getCountries(language) {
    //
    let paises = require(`../../assets/paises/${language}.json`);
    return paises;
}

function getContinents(language) {
    const { continents } = file[language];
    return continents;
}

module.exports = { getBotMessages, getBotCommands, getGeneralText, getCountries, getContinents };