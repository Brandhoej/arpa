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

        while (!this._stringStack.isAtEnd) {
            this._scanToken();
        }

        return this._tokens;
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
        if (this._stringStack.peek() === ' ') {
            this._stringStack.popUntil((c) => c !== ' ');
        }
        this._addToken(this._tokenFactory.types.WHITESPACE, ' ', ' ');
    }

    _scanLiteral(char) {
        if (char.match(this._regexDigit)) {
            this._scanNumber();
        } else if (char.match(this.regexLetter)) {
            this._scanIdentifier();
        } else if (char.match(this._regexBeginString)) {
            this._scanString();
        }
    }

    _scanIdentifier() {
        // Scan until the next character is whitespace or there is no more characters.
        // Meanwhile check that every character is either a letter or a digit.
        // Check if the identifier is a keyword before adding (eg. false, true)
        this._stringStack.popUntil((c) => c === ' ');
        this._addToken(this._tokenFactory.types.IDENTIFIER);
    }

    _scanNumber() {
        // Scan until the next character is whitespace or there is no more characters.
        // Then convert the whole string to a number if a parsing error occur then report it
        this._stringStack.popUntil((c) => c === ' ');

        const lexeme = this._getLexeme();
        const literal = Number(lexeme);
        if (literal === NaN) {
            // We have an error!
            this._reportError(`Though ${lexeme} was a number but it is not`);
            return;
        }
        this._addToken(this._tokenFactory.types.NUMBER, lexeme, literal);
    }

    _scanString() {
        // Get the string beginning character ', ", `.
        // Loop through each character.
        const stringInitCharacter = this._stringStack.array[this._stringStack.currentIndex];
        this._stringStack.popUntil((c) => c === stringInitCharacter);
        this._stringStack.pop(); // Pop the end of string character
        this._addToken(this._tokenFactory.types.STRING, this._lexemeStart + 1, this._stringStack.currentIndex - 1);
    }

    _addToken(type, lexeme = this._getLexeme(), literal = this._getLexeme()) {
        this._tokens.push(this._tokenFactory.create(type, this._lexemeStart, lexeme, literal))
    }

    _getLexeme(start = this._lexemeStart, end = this._stringStack.currentIndex) {
        return this._stringStack.array.substring(start, end);
    }

    _reportError(msg) {
        reporter.report('ERROR', msg + ' at ' + this._lexemeStart + ', ' + this._stringStack.currentIndex);
    }

    get hasScanned() {
        return this._tokens.length > 0;
    }
}

module.exports = Scanner;