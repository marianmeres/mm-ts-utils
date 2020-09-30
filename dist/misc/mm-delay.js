"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmDelay = void 0;
/**
 * @param ms
 */
exports.mmDelay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
