'use strict'

class Scanner {
    constructor(reporter, stringStack, tokenFactory) {
        this._reporter = reporter;
        this._stringStack = stringStack;
        this._tokenFactory = tokenFactory;

        this._lexemeStart = 0;
        this._tokens = [];

        this._regexLetter = /[a-zA-Z]/mg;
        this._regexDigit = /[0-9]/mg;
        this._regexBeginString = /\'|\"|\`/mg;
    }

    scan() {
        if (!this.hasScanned) {
            this._scanTokens();
        }
        return this._tokens;
    }

    _scanTokens() {
        this._lexemeStart = 0;
        this._tokens = [];

        while (!this._stringStack.isAtEnd) {
            this._scanToken();
        }
    }

    _scanToken() {
        this._lexemeStart = this._stringStack.currentIndex;
        const char = this._stringStack.pop();

        switch (char) {
            case ' ': this._scanWhitespace(); break;
            default: this._scanLiteral(char); break;
        }
    }

    _scanWhitespace() {
        this._stringStack.popUntil((c) => c !== ' ');
        this._addToken(this._tokenFactory.types.WHITESPACE, this._getLexeme(), ' ');
    }

    _scanLiteral(char) {
        if ((char === '-' || char === '.') && (this._stringStack.peek().match(this._regexDigit) || this._stringStack.peek() === '.' && this._stringStack.peek(1).match(this._regexDigit)) ||
            char.match(this._regexDigit)) {
            this._scanNumber();
        } else if (char.match(this._regexLetter)) {
            this._scanIdentifier();
        } else if (char.match(this._regexBeginString)) {
            this._scanString();
        }
    }

    _scanIdentifier() {
        this._popIdentifier();
        const lexeme = this._getLexeme();

        if (this._isBoolean(lexeme)) {
            this._addToken(this._tokenFactory.types.BOOLEAN, lexeme, this._getBoolean(lexeme));
        } else {
            this._addToken(this._tokenFactory.types.IDENTIFIER, lexeme, lexeme);
        }
    }

    _popIdentifier() {
        // Scan until the next character is whitespace or there is no more characters.
        // Meanwhile check that every character is either a letter or a digit.
        // Check if the identifier is a keyword before adding (eg. false, true)
        this._stringStack.popUntil((c) => c === ' ');
    }

    _isBoolean(lexeme) {
        const lowered = lexeme.toLowerCase();
        return lowered === 'true' || lowered === 'false';
    }

    _getBoolean(lexeme) {
        const lowered = lexeme.toLowerCase();
        if (lowered === 'true') {
            return true;
        } else if (lowered === 'false') {
            return false;
        }
        this._reportError(`Thought ${lexeme} was a boolean but it is not`);
        throw Error('Lexeme not a boolean');
    }

    _scanNumber() {
        this._popNumber();
        let { lexeme, literal } = this._getNumber();

        if (Number.isNaN(literal)) {
            // We have an error!
            this._reportError(`Thought ${lexeme} was a number but it is not`);
            throw Error('Number isNaN');
        }
        this._addToken(this._tokenFactory.types.NUMBER, lexeme, literal);
    }

    _popNumber() {
        // Scan until the next character is whitespace or there is no more characters.
        // Then convert the whole string to a number if a parsing error occur then report it
        this._stringStack.popUntil((c) => c === ' ');
    }

    _getNumber() {
        const lexeme = this._getLexeme();
        return {
            lexeme,
            literal: Number(lexeme)
        };
    }

    _scanString() {
        this._popString();
        const { lexeme, literal } = this._getString();
        this._addToken(this._tokenFactory.types.STRING, lexeme, literal);
    }

    _popString() {
        const stringInitCharacter = this._stringStack.array[this._stringStack.currentIndex - 1];
        this._stringStack.popUntil((c) => c === stringInitCharacter);
        this._stringStack.pop(); // Pop the last of the string character which is the ending encapsulation
    }

    _getString() {
        const lexeme = this._getLexeme();
        return {
            lexeme, 
            literal: lexeme.substring(1, lexeme.length - 1)
        };
    }

    _addToken(type, lexeme = this._getLexeme(), literal = this._getLexeme()) {
        this._tokens.push(this._tokenFactory.create(type, this._lexemeStart, this._stringStack.currentIndex - 1, lexeme, literal))
    }

    _getLexeme(start = this._lexemeStart, end = this._stringStack.currentIndex) {
        return this._stringStack.array.substring(start, end);
    }

    _reportError(msg) {
        this._reporter.report('ERROR', msg + ' at ' + this._lexemeStart + ', ' + this._stringStack.currentIndex);
    }

    get hasScanned() {
        return this._tokens.length > 0;
    }
}

module.exports = Scanner;