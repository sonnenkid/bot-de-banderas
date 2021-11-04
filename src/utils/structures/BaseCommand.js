module.exports = class BaseCommand {
    constructor(name, aliases) {
        this.name = name;
        this.aliases = aliases;
    }
}