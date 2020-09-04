'use strict'

const reporter = require('./reporter')(report);

function report(type, msg) {
    console.log([type] + ' :: ' + msg);
}

module.exports = reporter;