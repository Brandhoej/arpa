'use strict'

const should = require('chai').should();

const Scanner = require('../src/scanner');
const Stack = require('../src/stack');
const tokenTypes = require('../src/token-types');
const Token = require('../src/token');
const tokenFactory = new require('../src/token-factory')(tokenTypes, Token);

const reporter = () => {};

describe('scanner', () => {
    context('whit only whitespace', () => {
        const stack = new Stack('          ');
        const scanner = new Scanner(reporter, stack, tokenFactory);
        const tokens = scanner.scan();

        for (let token of tokens) {
            console.log(token.toString());
        }
    });

    context('with only identifier literals', () => {
        const stack = new Stack('a123 a2s');
        const scanner = new Scanner(reporter, stack, tokenFactory);
        const tokens = scanner.scan();

        for (let token of tokens) {
            console.log(token.toString());
        }
    });

    context('with only string literals', () => {

    });

    context('with only number literals', () => {

    });
});