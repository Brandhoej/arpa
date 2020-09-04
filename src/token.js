'use strict'

class Token {
    constructor(type, startIndex, endIndex, lexeme, literal) {
        this._type = type;
        this._startIndex = startIndex;
        this._endIndex = endIndex;
        this._lexeme = lexeme;
        this._literal = literal;
    }

    get type() {
        return this._type;
    }

    get startIndex() {
        return this._startIndex;
    }

    get endIndex() {
        return this._endIndex;
    }

    get lexeme() {
        return this._lexeme;
    }

    get literal() {
        return this._literal;
    }

    toString() {
        return `[${this.type.description} typeof ${typeof this.literal}, ${this.startIndex} - ${this.endIndex}] '${this.lexeme}' -> '${this.literal}'`
    }
}

module.exports = Token;