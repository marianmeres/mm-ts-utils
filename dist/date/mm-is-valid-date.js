"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param date
 * @returns {boolean}
 */
function mmIsValidDate(date) {
    return (date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date));
}
exports.mmIsValidDate = mmIsValidDate;
