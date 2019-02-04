"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param ms
 */
exports.mmDelay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
