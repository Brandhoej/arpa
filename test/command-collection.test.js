'use strict'

const { expect } = require('chai');

const validate = require('../src/command-validator');
const parseLayout = require('../src/command-layout-parser');
const tokenTypes = require('../src/token-types');
const Token = require('../src/token');
const TokenFactory = require('../src/token-factory');
const Collection = require('../src/command-collection');
const CommandProcessor = require('../src/command-processor');
const Stack = require('../src/stack');
const Scanner = require('../src/scanner');

const tokenFactory = new TokenFactory(tokenTypes, Token);
const command = {
    layout: 'test layout',
    variables: {
        prefix: 'prefix',
        separator: 'separator',
        suffix: 'suffix',
        definitions: [
            {
                key: 'key1',
                default: 'key1-default',
                description: 'key1-description'
            },
            {
                key: 'key2',
                default: 'key2-default',
                description: 'key2-description'
            }
        ]
    },
    handler
};

function handler() {

}

describe('Command collection', () => {
    context('adding commands', () => {
        it('should', () => {
            const processor = new CommandProcessor(Stack, Scanner, tokenFactory, parseLayout);
            const collection = new Collection(validate, processor);
            expect(() => collection.add(command)).to.not.throw();
            expect(() => collection.add(command)).to.throw();
        });
    });
})