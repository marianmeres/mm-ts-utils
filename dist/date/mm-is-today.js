"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmIsToday = void 0;
var mm_is_same_day_1 = require("./mm-is-same-day");
/**
 * @param d
 */
function mmIsToday(d) {
    return mm_is_same_day_1.mmIsSameDay(d, new Date());
}
exports.mmIsToday = mmIsToday;
