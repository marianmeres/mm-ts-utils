"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param year
 * @returns {boolean}
 */
function mmIsLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
}
exports.mmIsLeapYear = mmIsLeapYear;
