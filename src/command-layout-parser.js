'use strict'

function parseCommand(tokens, types) {
    const layout = [];
    for (let token of tokens) {
        if (token.type === types.IDENTIFIER ||
            token.type === types.STRING ||
            token.type === types.NUMBER ||
            token.type === types.BOOLEAN) {
            layout.push([token.lexeme]);
        }
    }
    return layout;
}

module.exports = parseCommand;