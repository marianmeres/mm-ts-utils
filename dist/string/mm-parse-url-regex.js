"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param url
 */
exports.mmParseUrlRegex = function (url) {
    // [1] = protocol://,
    // [2] = host:port,
    // [3] = host,
    // [4] = IPv6_host,
    // [5] = IPv4_host,
    // [6] = :port,
    // [7] = port,
    // [8] = uri,
    // [9] = rest (query / fragment)
    var parsed = new RegExp('(^https?://)?(((\\[[^\\]]+])|([^:/?#]+))(:(\\d+))?)?([^?#]*)(.*)?').exec(url);
    // console.log(parsed);
    var rest = (parsed[9] || '').split('#');
    var protocol = ("" + (parsed[1] || '')).replace('//', '');
    // normalize to same output as mmParseUrl (client side)
    return {
        protocol: protocol,
        hostname: "" + (protocol ? parsed[3] : ''),
        port: parsed[7] || '',
        pathname: parsed[8] || '',
        search: rest[0] || '',
        hash: rest[1] ? "#" + rest[1] : '',
    };
};
