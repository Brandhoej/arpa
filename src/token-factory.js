'use strict'

class TokenFactory {
    constructor(types, Token) {
        this._types = types;
        this._Token = Token;
    }

    create(type, startIndex, endIndex, lexeme, literal) {
        return new this._Token(type, startIndex, endIndex, lexeme, literal);
    }

    get types() {
        return this._types;
    }
}

module.exports = TokenFactory;