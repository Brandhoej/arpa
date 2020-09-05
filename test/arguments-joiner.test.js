'use strict'

const join = require('../src/arguments-joiner');
const { expect } = require('chai');

describe('Arguments joiner', () => {
    it('should join arguments with space separation', () => {
        const argv = ["Hello,", "World!"];
        const concatenation = join(argv);
        expect(concatenation).to.equal("Hello, World!");
    });

    it('should join all valid literals', () => {
        const argv = ["string", 123, true];
        const concatenation = join(argv);
        expect(concatenation).to.equal("string 123 true");
    });

    it('should not join arguments which are undefined or null', () => {
        const argv = ["Hello,", "World!", null, undefined];
        const concatenation = join(argv);
        expect(concatenation).to.equal("Hello, World!");
    });
});