'use strict'

class TokenFactory {
    constructor(types, Token) {
        this._types = types;
        this._Token = Token;
    }

    create(type, startIndex, lexeme, literal) {
        return new this.Token(type, startIndex, lexeme, literal);
    }

    get types() {
        return this._types;
    }
}

module.exports = (types, Token) => new TokenFactory(types, Token)