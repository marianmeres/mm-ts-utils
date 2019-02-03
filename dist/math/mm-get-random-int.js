"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a random integer between min and max
 * Note: Using Math.round() will give you a non-uniform distribution!
 *
 * @param min
 * @param max
 * @returns {any}
 */
function mmGetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.mmGetRandomInt = mmGetRandomInt;
