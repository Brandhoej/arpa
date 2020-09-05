'use strict'

const processor = require('../src/command-processor');
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

describe('CommandProcessor', () => {
    context('command layout', () => {
        it('should not make any changes to the layout', () => {
            const refactoredCommand = processor(command);
            expect(refactoredCommand.layout).to.equal(command.layout);
        });
    });

    context('command handler', () => {
        it('should not make any changes to the handler', () => {
            const refactoredCommand = processor(command);
            expect(refactoredCommand.handler).to.equal(command.handler);
        });
    });

    context('command variables', () => {
        it('should have moved variable definition specific into the definition object', () => {
            const refactoredCommand = processor(command);

            expect(refactoredCommand.variables.definitions.length).to.equal(command.variables.definitions.length);

            expect(refactoredCommand.prefix).to.equal(undefined);
            expect(refactoredCommand.separator).to.equal(undefined);
            expect(refactoredCommand.suffix).to.equal(undefined);

            for (let i = 0; i < refactoredCommand.variables.definitions.length; i++) {
                const originalDef = command.variables.definitions[i];
                const refactoredDef = refactoredCommand.variables.definitions[i];

                expect(refactoredDef.prefix).to.equal(command.variables.prefix);
                expect(refactoredDef.separator).to.equal(command.variables.separator);
                expect(refactoredDef.suffix).to.equal(command.variables.suffix);

                expect(refactoredDef.key).to.equal(originalDef.key);
                expect(refactoredDef.default).to.equal(originalDef.default);
                expect(refactoredDef.description).to.equal(originalDef.description);
            }
        });

        it('should not be possible to change binding values of the processed command by changing the original command bindings', () => {
            const originalCommand = {
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

            const refactoredCommand = processor(originalCommand);

            originalCommand.layout = 'new test layout';
            originalCommand.variables.prefix = 'new prefix';
            originalCommand.variables.separator = 'new separator';
            originalCommand.variables.suffix = 'new suffix';
            originalCommand.variables.definitions[0].key = 'new key1';
            originalCommand.variables.definitions[0].default = 'new key1-default';
            originalCommand.variables.definitions[0].description = 'new key1-description';
            originalCommand.variables.definitions[1].key = 'new key2';
            originalCommand.variables.definitions[1].default = 'new key2-default';
            originalCommand.variables.definitions[1].description = 'new key2-description';
            originalCommand.handler = _ => _;

            expect(refactoredCommand.handler).to.not.equal(originalCommand.handler);

            for (let i = 0; i < refactoredCommand.variables.definitions.length; i++) {
                const originalDef = originalCommand.variables.definitions[i];
                const refactoredDef = refactoredCommand.variables.definitions[i];

                expect(refactoredDef.prefix).to.not.equal(originalCommand.variables.prefix);
                expect(refactoredDef.separator).to.not.equal(originalCommand.variables.separator);
                expect(refactoredDef.suffix).to.not.equal(originalCommand.variables.suffix);

                expect(refactoredDef.key).to.not.equal(originalDef.key);
                expect(refactoredDef.default).to.not.equal(originalDef.default);
                expect(refactoredDef.description).to.not.equal(originalDef.description);
            }
        })
    });
});