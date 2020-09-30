"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmFormatMoney = void 0;
/**
 * credit: somewhere I don't remember...
 * @param amount
 * @param decimalsCount
 * @param decimalSeparator
 * @param thousandSeparator
 * @returns {string}
 */
function mmFormatMoney(amount, decimalsCount, decimalSeparator, thousandSeparator) {
    if (decimalsCount === void 0) { decimalsCount = 2; }
    if (decimalSeparator === void 0) { decimalSeparator = '.'; }
    if (thousandSeparator === void 0) { thousandSeparator = ' '; }
    var n = amount;
    var c = decimalsCount;
    var d = decimalSeparator;
    var t = thousandSeparator;
    c = isNaN((c = Math.abs(c))) ? 2 : c; // number of decimals
    d = d === void 0 ? '.' : d; // decimal separator
    t = t === void 0 ? ' ' : t; // thousands separator
    var s = n < 0 ? '-' : ''; // sign
    var i = parseInt((n = Math.abs(+n || 0).toFixed(c)), 10) + '';
    var j = i.length;
    j = j > 3 ? j % 3 : 0;
    return (s +
        (j ? i.substr(0, j) + t : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
        (c
            ? d +
                Math.abs(n - i)
                    .toFixed(c)
                    .slice(2)
            : ''));
}
exports.mmFormatMoney = mmFormatMoney;
