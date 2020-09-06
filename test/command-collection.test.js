'use strict'

const Collection = require('../src/command-collection');
const validate = require('../src/command-validator');
const process = require('../src/command-processor');
const parseLayout = require('../src/command-layout-parser');
const Stack = require('../src/stack');
const Scanner = require('../src/scanner');
const tokenTypes = require('../src/token-types');
const { expect } = require('chai');

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
            const collection = new Collection(validate, process, parseLayout);
            // collection.add(command);
            // expect(() => collection.add(command)).to.not.throw();
        });
    });
})