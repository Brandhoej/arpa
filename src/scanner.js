'use strict'

class Scanner {
    constructor(reporter, stringStack, tokenFactory) {
        this._reporter = reporter;
        this._stringStack = stringStack;
        this._lexemeStart = 0;
        this._tokenFactory = tokenFactory;
        this._tokens = [];
    }

    scan() {
        if (this.hasScanned) {
            return this._tokens;
        }
    }

    _scanToken() {
        this._lexemeStart = this._stringStack.currentIndex;
        const char = this._stringStack.pop();

        switch (char) {
            case '-': this._addToken(this._tokenFactory.types.DASH); break;
            default: this._scanLiteral(); break;
        }
    }

    _scanLiteral() {
        
    }

    _addToken(type) {
        this._tokens.push(this._tokenFactory.create(type, this._lexemeStart, ))
    }

    _getLexeme(start = this._lexemeStart, end = this._stringStack.currentIndex) {
        return stringStack.array.subString(start, end);
    }

    get hasScanned() {
        return this._tokens.length > 0;
    }
}

module.exports = Scanner;