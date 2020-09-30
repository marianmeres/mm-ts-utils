"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmGetDaysInMonth = void 0;
/**
 * @param year
 * @param month
 * @returns {number}
 */
function mmGetDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}
exports.mmGetDaysInMonth = mmGetDaysInMonth;
