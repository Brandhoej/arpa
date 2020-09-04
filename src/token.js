'use strict'

class Token {
    constructor(type, startIndex, lexeme, literal) {
        this.type = type;
        this.startIndex = startIndex;
        this.lexeme = lexeme;
        this.literal = literal;
    }

    toString() {
        return `[${this.type.description} typeof ${typeof this.literal}, ${this.startIndex} - ${this.startIndex + this.lexeme.length}] '${this.lexeme}' -> '${this.literal}'`
    }
}

module.exports = Token;