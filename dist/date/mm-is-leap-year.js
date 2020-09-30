"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmIsLeapYear = void 0;
/**
 * @param year
 * @returns {boolean}
 */
function mmIsLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
}
exports.mmIsLeapYear = mmIsLeapYear;
