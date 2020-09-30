"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmParseQuery = void 0;
/**
 * This function parses ampersand-separated name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in
 * properties of an object and returns that object. Use it like this:
 *
 * var args = urlArgs(); // Parse args from URL
 * var q = args.q || ""; // Use argument, if defined, or a default value * var n = args.n ? parseInt(args.n) : 10;
 *
 * @param query
 * @param separator
 * @returns {{}}
 */
function mmParseQuery(query, separator) {
    if (separator === void 0) { separator = '&'; }
    if (!query && window && window.location) {
        query = window.location.search.substring(1);
    }
    var out = {};
    var pairs = query.split(separator);
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) {
            continue;
        }
        var name_1 = pairs[i].substring(0, pos);
        out[name_1] = decodeURIComponent(pairs[i].substring(pos + 1));
    }
    return out;
}
exports.mmParseQuery = mmParseQuery;
