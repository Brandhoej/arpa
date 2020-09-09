'use strict'

class CommandCollection {
    constructor(validator, processor) {
        this._validator = validator;
        this._processor = processor;
        this._commands = [];
    }

    add(command) {
        const processedCommand = this._processor.processCommand(command);
        if (this.contains(processedCommand.parsedLayout)) {
            throw new Error('Command layout already exists');
        }

        this._commands.push(processedCommand);
    }

    contains(args) {
        return this.find(args) !== undefined;
    }

    find(args) {
        for (let command of this._commands) {
            if (this._matchLayouts(args, command.parsedLayout)) {
                return command;
            }
        }
        return undefined;
    }

    _matchLayouts(args, commandLayout) {
        if (args.length !== commandLayout.length) {
            return false;
        }
        for (let i in commandLayout) {
            if (!commandLayout[i].includes(args[i][0])) {
                return false;
            }
        }
        return true;
    }
}

module.exports = CommandCollection;