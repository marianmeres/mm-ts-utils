"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param year
 * @param month
 * @returns {number}
 */
function mmGetDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}
exports.mmGetDaysInMonth = mmGetDaysInMonth;
