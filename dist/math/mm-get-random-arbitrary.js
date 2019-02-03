"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Helper: Returns a random number between min and max
 * @param min
 * @param max
 * @returns {any}
 */
function mmGetRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
exports.mmGetRandomArbitrary = mmGetRandomArbitrary;
