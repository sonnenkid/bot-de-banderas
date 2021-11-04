module.exports = class BaseCommand {
    constructor(name, aliases, description) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
    }
}