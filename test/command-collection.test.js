'use strict'

const Token = require('../src/token');
const TokenFactory = require('../src/token-factory');
const Collection = require('../src/command-collection');
const validate = require('../src/command-validator');
const Processor = require('../src/command-processor');
const parseLayout = require('../src/command-layout-parser');
const Stack = require('../src/stack');
const Scanner = require('../src/scanner');
const tokenTypes = require('../src/token-types');
const { expect } = require('chai');

const processor = new Processor(Stack, Scanner, new TokenFactory(tokenTypes, Token), parseLayout)

describe('Command collection', () => {
    context('adding commands', () => {
        it('should correctly add a single command', () => {
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
                handler: _ => _
            };

            const collection = new Collection(validate, processor);

            expect(() => collection.add(command)).to.not.throw();
            expect(() => collection.add(command)).to.throw();
            expect(collection.containsLayout(["test", "layout"].join(' '))).to.equal(true);
        });

        it('should correctly add multiple commands', () => {
            const command1 = {
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
                handler: _ => _
            };
            const command2 = {
                layout: 'test layout now',
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
                handler: _ => _
            };

            const collection = new Collection(validate, processor);

            expect(() => collection.add(command1)).to.not.throw();
            expect(() => collection.add(command1)).to.throw();
            expect(collection.containsLayout(["test", "layout"].join(' '))).to.equal(true);

            expect(() => collection.add(command2)).to.not.throw();
            expect(() => collection.add(command2)).to.throw();
            expect(collection.containsLayout(["test", "layout", "now"].join(' '))).to.equal(true);
        });
    });
})