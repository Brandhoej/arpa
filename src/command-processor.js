'use strict'

/**
 * RCO processor
 * @param {*} command 
 */
function processCommand(command) {
    return {
        layout: processCommandLayout(command.layout),
        variables: processCommandVariables(command.variables),
        handler: processCommandHandler(command.handler)
    };
}

function processCommandLayout(layout) {
    return layout;
}

function processCommandHandler(handler) {
    return handler;
}

function processCommandVariables(variables) {
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

module.exports = processCommand;