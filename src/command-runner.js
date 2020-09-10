'use strict'

function runCommand(collection, args, argsParsers) {
    const command = collection.find(args);
    if (!command) {
        const parsedArgs = argsParsers.parse(args, command);
        return command.handler(parsedArgs);
    }
    return undefined;
}

module.exports = runCommand;