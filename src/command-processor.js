'use strict'

/**
 * RCO processor
 * @param {*} command 
 */
function processCommand(command) {
    return {
        layout: processCommandLayout(command),
        variables: processCommandVariables(command),
        handler: processCommandHandler(command)
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
    const seperator = variables.seperator === undefined ? '' : variables.seperator;
    const definitions = variables.definitions === undefined ? [] : variables.definitions;

    newVariables.definitions = [];

    for (let definition of definitions) {
        newVariables.definitions.push({
            prefix: prefix,
            suffix: suffix,
            seperator: seperator,

            default: definition.default,
            description: definition.description
        });
    }

    return newVariables;
}

module.exports = processCommand;