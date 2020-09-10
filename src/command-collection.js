'use strict'

class CommandCollection {
    constructor(validator, processor) {
        this._validator = validator;
        this._processor = processor;
        this._commands = [];
    }

    add(command, reporter) {
        const processedCommand = this._processor.processCommand(command, reporter);
        if (this.containsParsedLayout(processedCommand.parsedLayout)) {
            throw new Error('Command layout already exists');
        }

        this._commands.push(processedCommand);
    }

    containsLayout(layout, reporter) {
        return this.containsParsedLayout(this._processor.parseCommandLayout(layout, reporter));
    }

    containsParsedLayout(layout) {
        return this.getHandler(layout) !== undefined;
    }

    getHandler(layout) {
        for (let command of this._commands) {
            if (this._matchLayouts(layout, command.parsedLayout)) {
                return command.handler;
            }
        }
        return undefined;
    }

    _matchLayouts(args, commandLayout) {
        if (args.length !== commandLayout.length) {
            return false;
        }
        for (let i in args) {
            if (!commandLayout[i].includes(args[i][0])) {
                return false;
            }
        }
        return true;
    }
}

module.exports = CommandCollection;