function getBotMessages(serverLanguage, id, ...repl) {
    const { bot_messages } = require(`./localization/${serverLanguage}/localization.json`);
    if (!bot_messages[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    bot_messages[id] = bot_messages[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : '%REPL%');
    return bot_messages[id];
}

function getBotCommands(serverLanguage, id, ...repl) {
    const { bot_commands } = require(`./localization/${serverLanguage}/localization.json`);
    if (!bot_commands[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    bot_commands[id] = bot_commands[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : '%REPL%');
    return bot_commands[id];
}

function getGeneralText(serverLanguage, id, ...repl) {
    const { general_text } = require(`./localization/${serverLanguage}/localization.json`);
    if (!general_text[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    general_text[id] = general_text[id].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : '%REPL%');
    return general_text[id];
}

function getContinents(serverLanguage) {
    const { continents } = require(`./localization/${serverLanguage}/localization.json`);
    return continents;
}

module.exports = { getBotMessages, getBotCommands, getGeneralText, getContinents };