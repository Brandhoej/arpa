'use strict'

const expect = require('chai').expect;

const Scanner = require('../src/scanner');
const Stack = require('../src/stack');
const tokenTypes = require('../src/token-types');
const Token = require('../src/token');
const tokenFactory = new require('../src/token-factory')(tokenTypes, Token);

const reporter = {
    report: () => _
};

describe('scanner', () => {
    context('Whitespace', () => {
        it('should scan a lot of whitespace as a single whitespace literal', () => {
            const stack = new Stack('          ');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();
    
            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(1);
            evaluateToken(tokens[0], tokenTypes.WHITESPACE, 0, 9, '          ');
        });
    });

    context('Identifier literals', () => {
        it('should scan identifiers also with numbers', () => {
            const stack = new Stack('    a123     a2s    ');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();
        
            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(5);
            evaluateToken(tokens[0], tokenTypes.WHITESPACE, 0, 3, '    ');
            evaluateToken(tokens[1], tokenTypes.IDENTIFIER, 4, 7, 'a123', 'a123');
            evaluateToken(tokens[2], tokenTypes.WHITESPACE, 8, 12, '     ');
            evaluateToken(tokens[3], tokenTypes.IDENTIFIER, 13, 15, 'a2s', 'a2s');
            evaluateToken(tokens[4], tokenTypes.WHITESPACE, 16, 19, '    ');
        });

        context('Boolean identifiers', () => {
            it('should recognize "true"', () => {
                const stack = new Stack('true');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                const tokens = scanner.scan();

                expect(tokens).to.be.an('array');
                expect(tokens.length).to.equal(1);
                evaluateToken(tokens[0], tokenTypes.BOOLEAN, 0, 3, 'true', true);
            });

            it('should recognize "false"', () => {
                const stack = new Stack('false');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                const tokens = scanner.scan();

                expect(tokens).to.be.an('array');
                expect(tokens.length).to.equal(1);
                evaluateToken(tokens[0], tokenTypes.BOOLEAN, 0, 4, 'false', false);
            });

            it('should be case insensitive', () => {
                const stack = new Stack('FaLsE TRue');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                const tokens = scanner.scan();

                expect(tokens).to.be.an('array');
                expect(tokens.length).to.equal(3);
                evaluateToken(tokens[0], tokenTypes.BOOLEAN, 0, 4, 'FaLsE', false);
                evaluateToken(tokens[1], tokenTypes.WHITESPACE, 5, 5);
                evaluateToken(tokens[2], tokenTypes.BOOLEAN, 6, 9, 'TRue', true);
            });
        })
    });

    context('String literals', () => {
        it('should only recognize strings if they end and start with the same type of character', () => {
            const stack = new Stack('"\'\`"');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();

            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(1);
            evaluateToken(tokens[0], tokenTypes.STRING, 0, 3, '"\'\`"', '\'\`');
        });

        it('should recognize \' \" \` as a possible but start and ending of a string', () => {
            const stack = new Stack('" a " ` b ` \' c \'');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();

            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(5);
            evaluateToken(tokens[0], tokenTypes.STRING, 0, 4, '" a "', ' a ');
            evaluateToken(tokens[1], tokenTypes.WHITESPACE, 5, 5);
            evaluateToken(tokens[2], tokenTypes.STRING, 6, 10, '` b `', ' b ');
            evaluateToken(tokens[3], tokenTypes.WHITESPACE, 11, 11);
            evaluateToken(tokens[4], tokenTypes.STRING, 12, 16, "' c '", ' c ');
        });
    });

    context('Number literals', () => {
        it('should scan integers', () => {
            // 123, -123
            const stack = new Stack('123 -123');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();

            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(3);
            evaluateToken(tokens[0], tokenTypes.NUMBER, 0, 2, '123', 123);
            evaluateToken(tokens[1], tokenTypes.WHITESPACE, 3, 3);
            evaluateToken(tokens[2], tokenTypes.NUMBER, 4, 7, '-123', -123);
        });

        it('should scan floating point numbers', () => {
            // 0.1 .1 -0.1 -.1
            const stack = new Stack('0.1 .1 -0.1 -.1');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();

            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(7);
            evaluateToken(tokens[0], tokenTypes.NUMBER, 0, 2, '0.1', 0.1);
            evaluateToken(tokens[1], tokenTypes.WHITESPACE, 3, 3);
            evaluateToken(tokens[2], tokenTypes.NUMBER, 4, 5, '.1', .1);
            evaluateToken(tokens[3], tokenTypes.WHITESPACE, 6, 6);
            evaluateToken(tokens[4], tokenTypes.NUMBER, 7, 10, '-0.1', -0.1);
            evaluateToken(tokens[5], tokenTypes.WHITESPACE, 11, 11);
            evaluateToken(tokens[6], tokenTypes.NUMBER, 12, 14, '-.1', -.1);
        });

        it('should scan e followed by a number as a valid number', () => {
            // 1e1, 1e-1, 1e.1, 1e-.1
            const stack = new Stack('1e1 1e-1');
            const scanner = new Scanner(reporter, stack, tokenFactory);
            const tokens = scanner.scan();

            expect(tokens).to.be.an('array');
            expect(tokens.length).to.equal(3);
            evaluateToken(tokens[0], tokenTypes.NUMBER, 0, 2, '1e1', 10);
            evaluateToken(tokens[1], tokenTypes.WHITESPACE, 3, 3);
            evaluateToken(tokens[2], tokenTypes.NUMBER, 4, 7, '1e-1', 1/10);
        });

        context('Invalid numbers', () => {
            it('1asd should throw', () => {
                const stack = new Stack('1asd');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                expect(() => scanner.scan()).to.throw();
            });

            it('1e0.1 should throw', () => {
                const stack = new Stack('1e0.1');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                expect(() => scanner.scan()).to.throw();
            });

            it('1e-0.1 should throw', () => {
                const stack = new Stack('1e-0.1');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                expect(() => scanner.scan()).to.throw();
            });

            it('1e.1 should throw', () => {
                const stack = new Stack('1e.1');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                expect(() => scanner.scan()).to.throw();
            });

            it('1e-.1 should throw', () => {
                const stack = new Stack('1e-.1');
                const scanner = new Scanner(reporter, stack, tokenFactory);
                expect(() => scanner.scan()).to.throw();
            });
        })
    });
});

function evaluateToken(token, type, startIndex, endIndex, lexeme = ' ', literal = ' ') {
    expect(token.type).to.equal(type);
    expect(token.startIndex).to.equal(startIndex);
    expect(token.endIndex).to.equal(endIndex);
    expect(token.lexeme).to.equal(lexeme);
    expect(token.literal).to.equal(literal);
}