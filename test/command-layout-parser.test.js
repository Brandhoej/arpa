'use strict'

const argsJoiner = require('../src/arguments-joiner');
const parser = require('../src/command-layout-parser');
const Scanner = require('../src/scanner');
const Stack = require('../src/stack');
const tokenTypes = require('../src/token-types');
const Token = require('../src/token');
const TokenFactory = require('../src/token-factory');

const { expect } = require('chai');

const tokenFactory = new TokenFactory(tokenTypes, Token);
const reporter = {
    report: _ => _
};

describe('Command parser', () => {
    it('should parse strings, number, booleans and string literals', () => {
        const layout = 'run mysql now 123 true "Hello, World!"';
        const stack = new Stack(layout);
        const scanner = new Scanner(reporter, stack, tokenFactory);
        const tokens = scanner.scan();
        const parsedLayout = parser(tokens, tokenTypes);

        expect(parsedLayout).to.be.an('array');
        expect(parsedLayout.length).to.equal(6);
        expect(parsedLayout[0][0]).to.equal('run');
        expect(parsedLayout[1][0]).to.equal('mysql');
        expect(parsedLayout[2][0]).to.equal('now');
        expect(parsedLayout[3][0]).to.equal("123");
        expect(parsedLayout[4][0]).to.equal("true");
        expect(parsedLayout[5][0]).to.equal('"Hello, World!"');
    });
});
