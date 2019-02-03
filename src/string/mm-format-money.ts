/**
 * credit: somewhere I don't remember...
 * @param amount
 * @param decimalsCount
 * @param decimalSeparator
 * @param thousandSeparator
 * @returns {string}
 */
export function mmFormatMoney(
    amount,
    decimalsCount = 2,
    decimalSeparator = '.',
    thousandSeparator = ' '
): string {
    let n = amount;
    let c = decimalsCount;
    let d = decimalSeparator;
    let t = thousandSeparator;

    c = isNaN((c = Math.abs(c))) ? 2 : c; // number of decimals
    d = d === void 0 ? '.' : d; // decimal separator
    t = t === void 0 ? ' ' : t; // thousands separator
    let s = n < 0 ? '-' : ''; // sign
    let i = parseInt((n = Math.abs(+n || 0).toFixed(c)), 10) + '';
    let j = i.length;
    j = j > 3 ? j % 3 : 0;

    return (
        s +
        (j ? i.substr(0, j) + t : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
        (c
            ? d +
              Math.abs(n - (i as any))
                  .toFixed(c)
                  .slice(2)
            : '')
    );
}
