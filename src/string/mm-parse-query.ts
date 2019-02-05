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
export function mmParseQuery(query?: string, separator: string = '&') {
    if (!query && window && window.location) {
        query = window.location.search.substring(1);
    }

    let out = {};
    let pairs = query.split(separator);

    for (let i = 0; i < pairs.length; i++) {
        let pos = pairs[i].indexOf('=');
        if (pos === -1) {
            continue;
        }

        let name = pairs[i].substring(0, pos);
        out[name] = decodeURIComponent(pairs[i].substring(pos + 1));
    }

    return out;
}
