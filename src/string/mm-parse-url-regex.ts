/**
 * @param url
 */
export const mmParseUrlRegex = (url) => {
    // [1] = protocol://,
    // [2] = host:port,
    // [3] = host,
    // [4] = IPv6_host,
    // [5] = IPv4_host,
    // [6] = :port,
    // [7] = port,
    // [8] = uri,
    // [9] = rest (query / fragment)
    const parsed = new RegExp('(^https?://)?(((\\[[^\\]]+])|([^:/?#]+))(:(\\d+))?)?([^?#]*)(.*)?').exec(url);
    // console.log(parsed);

    const rest = (parsed[9] || '').split('#');
    const protocol = `${parsed[1] || ''}`.replace('//', '');

    // normalize to same output as mmParseUrl (client side)
    return {
        protocol, // => "http:"
        hostname: `${protocol ? parsed[3] : ''}`, // => "example.com"
        port: parsed[7] || '', // => "3000"
        pathname: parsed[8] || '', // => "/pathname/"
        search: rest[0] || '', // => "?search=test"
        hash: rest[1] ? `#${rest[1]}` : '', // => "#hash"
    };
};
