'use strict'

class Token {
    constructor(type, startIndex, lexeme, literal) {
        this.type = type;
        this.startIndex = startIndex;
        this.lexeme = lexeme;
        this.literal = literal;
    }

    toString() {
        return `[${type.description}, ${this.startIndex}] ${this.lexeme} -> ${this.literal}`
    }
}

module.exports = Token;