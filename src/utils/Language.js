const langFile = require('./languages/localization.json');

function getBotMessages(language, id, ...repl) {
    const { bot_messages } = langFile;
    if (!bot_messages[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    let count = 0;
    bot_messages[id][language] = bot_messages[id][language].replace(/%REPL%/g, () => repl[count] !== null ? repl[count] : "%REPL%");
    return bot_messages[id][language];
}

function getBotCommands(language, id, ...repl) {
    const { bot_commands } = langFile;
    if (!bot_messages[id]) {
        throw new Error('INVALID_TEXT_ID ' + id);
    }
    return bot_commands[id][language];
}

function getContinents(language) {
    const { continents } = langFile;
    return continents[language];
}

module.exports = { getBotMessages, getBotCommands, getContinents };