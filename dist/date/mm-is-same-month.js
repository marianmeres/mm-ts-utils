"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mm_is_valid_date_1 = require("./mm-is-valid-date");
/**
 * @param d1
 * @param d2
 */
function mmIsSameMonth(d1, d2) {
    return (mm_is_valid_date_1.mmIsValidDate(d1) &&
        mm_is_valid_date_1.mmIsValidDate(d2) &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth());
}
exports.mmIsSameMonth = mmIsSameMonth;
