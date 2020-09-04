'use strict'

class Scanner {
    constructor(reporter, stringStack, tokenFactory) {
        this._reporter = reporter;
        this._stringStack = stringStack;
        this._lexemeStart = 0;
        this._tokenFactory = tokenFactory;
        this._tokens = [];

        this.regexLetter = /[a-zA-Z]/mg;
        this._regexDigit = /[0-9]/mg;
        this._regexBeginString = /\'|\"|\`/mg;
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
            case ' ': this._scanWhitespace(); break;
            default: this._scanLiteral(char); break;
        }
    }

    _scanWhitespace() {
        this._addToken(this._tokenFactory.types.WHITESPACE);
        while (this._stringStack.peek() === ' ') {
            this._stringStack.pop();
        }
    }

    _scanLiteral(char) {
        if (char.test(this._regexDigit)) {
            _scanNumber();
        } else if (char.test(this.regexLetter)) {
            this._scanIdentifier();
        } else if (char.test(this._regexBeginString)) {
            this._scanString();
        }
    }

    _scanIdentifier() {
        // Scan until the next character is whitespace or there is no more characters.
        // Meanwhile check that every character is either a letter or a digit.
    }

    _scanNumber() {
        // Scan until the next character is whitespace or there is no more characters.
        // Then convert the whole string to a number if a parsing error occur then report it
    }

    _scanString() {
        // Get the string beginning character ', ", `.
        // Loop through each character. Check special cases with backslash.
    }

    _addToken(type, lexeme = this._getLexeme(), literal) {
        this._tokens.push(this._tokenFactory.create(type, this._lexemeStart, lexeme, literal))
    }

    _getLexeme(start = this._lexemeStart, end = this._stringStack.currentIndex) {
        return stringStack.array.subString(start, end);
    }

    _reportError(msg) {
        reporter.report('ERROR', msg + ' at ' + this._lexemeStart + ', ' + this._stringStack.currentIndex);
    }

    get hasScanned() {
        return this._tokens.length > 0;
    }
}

module.exports = Scanner;