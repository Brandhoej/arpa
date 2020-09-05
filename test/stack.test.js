'use strict'

const expect = require('chai').expect;
const Stack = require('../src/stack');

describe('Stack', () => {
    context('peek', () => {
        it('should peek with offset correctly', () => {
            const string = 'Hello, World!';
            const stack = new Stack(string);
            for (let i = 0; i < string.length; i++) {
                expect(stack.peek(i)).to.equal(string[i]);
            }
        });
    });

    context('pop', () => {
        it('should pop by peeking the current and increment pointer afterwards', () => {
            const string = 'Hello, World!';
            const stack = new Stack(string);
            let i  = 0;
            while (!stack.isAtEnd) {
                expect(stack.pop()).to.equal(string[i]);
                i++;
            }
        });

        context('popUntil', () => {
            it('should only increment', () => {
                const string = 'Hello, World!';
                const stack = new Stack(string);
                stack.popUntil(c => c === ',');

                expect(stack.peek()).to.equal(',');
                expect(stack.currentIndex).to.equal(5);
            });

            it('should not exceed the bounds of the stack', () => {
                const string = 'Hello, World!';
                const stack = new Stack(string);
                stack.popUntil(c => c === 'å');

                expect(stack.peek()).to.equal(undefined);
                expect(stack.currentIndex).to.equal(string.length);
            });
        });
    });
});