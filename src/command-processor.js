'use strict'

class CommandProcessor {
    constructor(Stack, Scanner, tokenFactory, parseLayout) {
        this._Stack = Stack;
        this._Scanner = Scanner;
        this._tokenFactory = tokenFactory;
        this._parseLayout = parseLayout;
    }

    processCommand(command, reporter) {
        return {
            layout: this.processCommandLayout(command.layout),
            parsedLayout: this.parseCommandLayout(command.layout, reporter),
            variables: this.processCommandVariables(command.variables),
            handler: this.processCommandHandler(command.handler)
        };
    }
    
    processCommandLayout(layout) {
        return layout;
    }

    parseCommandLayout(layout, reporter) {
        const stack = new this._Stack(layout);
        const scanner = new this._Scanner(reporter, stack, this._tokenFactory);
        const tokens = scanner.scan();
        return this._parseLayout(tokens, scanner.tokenTypes);
    }

    processCommandHandler(handler) {
        return handler;
    }
    
    processCommandVariables(variables) {
        const newVariables = {};
        const prefix = variables.prefix === undefined ? '' : variables.prefix;
        const suffix = variables.suffix === undefined ? '' : variables.suffix;
        const separator = variables.separator === undefined ? '' : variables.separator;
        const definitions = variables.definitions === undefined ? [] : variables.definitions;
    
        newVariables.definitions = [];
    
        for (let definition of definitions) {
            newVariables.definitions.push({
                prefix, suffix, separator,
    
                key: definition.key,
                default: definition.default,
                description: definition.description
            });
        }
    
        return newVariables;
    }
    
}

module.exports = CommandProcessor;