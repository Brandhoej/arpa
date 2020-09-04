'use strict'

const expect = require('chai').expect;

const Scanner = require('../src/scanner');
const Stack = require('../src/stack');
const tokenTypes = require('../src/token-types');
const Token = require('../src/token');
const tokenFactory = new require('../src/token-factory')(tokenTypes, Token);

const reporter = () => {};

describe('scanner', () => {
    context('Whitespace', () => {
        it('should scan a lot of whitespace as a single whitespace lexeme', () => {
            const stack = new Stack('          ');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();
    
            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(1);
            evaluateToken(tokens[0], tokenTypes.WHITESPACE, 0, 9, ' ', ' ');
        });
    });

    context('Identifier literals', () => {
        it('should scan identifiers also with numbers', () => {
            const stack = new Stack('    a123     a2s    ');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();
        
            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(5);
            evaluateToken(tokens[0], tokenTypes.WHITESPACE, 0, 3, ' ', ' ');
            evaluateToken(tokens[1], tokenTypes.IDENTIFIER, 4, 7, 'a123', 'a123');
            evaluateToken(tokens[2], tokenTypes.WHITESPACE, 8, 12, ' ', ' ');
            evaluateToken(tokens[3], tokenTypes.IDENTIFIER, 13, 15, 'a2s', 'a2s');
            evaluateToken(tokens[4], tokenTypes.WHITESPACE, 16, 19, ' ', ' ');
        })
    });

    context('String literals', () => {
        it('should only recognize strings if they end and start with the same type of character', () => {
            // " " - correct,   ' ' - correct, ` ` - correct
            // " ' - incorrect, " ` - incorrect
            // ' " - incorrect, ' ` - incorrect
            // ` ' - incorrect, ` " - incorrect
        });

        it('should recognize \' as a possible but start and ending of a string', () => {
            // 'string'
        });

        it('should recognize " as a possible but start and ending of a string', () => {
            // "string"
        });

        it('should recognize ` as a possible but start and ending of a string', () => {
            // `string`
        });
    });

    context('Number literals', () => {
        it('should scan integers', () => {
            // 123, -123
        });

        it('should scan floating point numbers', () => {
            // 0.1
        });

        it('should scan e followed by a number as a valid number', () => {
            // e1, e-1, e.1, e-.1
        });
    });

    context('Dash token type', () => {
        it('should recognize dashes as a special token', () => {

        });

        it('should scan a sequence of dashes as a single dash and multiple tokens', () => {

        });
    });
});

function evaluateToken(token, type, startIndex, endIndex, lexeme, literal) {
    expect(token.type).to.equal(type);
    expect(token.startIndex).to.equal(startIndex);
    expect(token.endIndex).to.equal(endIndex);
    expect(token.lexeme).to.equal(lexeme);
    expect(token.literal).to.equal(literal);
}