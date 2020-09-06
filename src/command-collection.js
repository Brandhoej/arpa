'use strict'

class CommandCollection {
    constructor(validator, processor) {
        this._validator = validator;
        this._processor = processor;
        this._commands = [];
    }

    add(command) {
        const tokens = this._scanner(command.layout);
        const layout = this._layoutParser(tokens, this._tokenTypes);
        if (this.contains(layout)) {
            throw new Error('Command layout already exists');
        }

        this._commands.push({ layout, command: processor(command) });
    }

    contains(args) {
        return this.find(args) !== undefined;
    }

    find(args) {
        for (let command of this._commands) {
            if (this._matchLayouts(args, command.layout)) {
                return command;
            }
        }
        return undefined;
    }

    _matchLayouts(args, commandLayout) {
        if (args.length !== commandLayout.length) {
            return false;
        }
        for (let argument of args) {
            if (!commandLayout[i].includes(argument)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = CommandCollection;