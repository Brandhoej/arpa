'use strict'

function join(argv) {
    const filters = argv.filter(arg => isValid(arg));
    return filters.join(' ');
}

function isValid(arg) {
    return arg !== undefined && arg !== null;
}

module.exports = join;