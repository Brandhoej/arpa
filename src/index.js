'use strict'

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
    handler: (args) => console.log(args.test)
};