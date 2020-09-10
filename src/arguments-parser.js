'use strict'

function parseArgs(args, command) {
    return {
        "true": true,
        "false": false,
        "test": 123
    };
}

exports.module = parseArgs;