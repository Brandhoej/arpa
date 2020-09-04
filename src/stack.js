'use strict'

class Stack {
    constructor(array) {
        this._array = array;
        this._currentIndex = 0;
    }

    peek() {
        return this.array[this._currentIndex];
    }

    pop() {
        return this.array[this._currentIndex++];
    }

    popUntil(predicate) {
        while (!this.isAtEnd && !predicate(this.peek())) {
            this.pop();
        }
    }

    get array() {
        return this._array;
    }

    get currentIndex() {
        return this._currentIndex;
    }

    get isAtEnd() {
        return this.currentIndex >= this.array.length;
    }
}

module.exports = Stack;