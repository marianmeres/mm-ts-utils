"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmGetStartWeekday = void 0;
/**
 * @param year
 * @param month
 * @returns {number}
 */
function mmGetStartWeekday(year, month) {
    return new Date(year, month, 1).getDay();
}
exports.mmGetStartWeekday = mmGetStartWeekday;
