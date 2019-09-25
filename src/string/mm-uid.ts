/**
 * creates quasi uuid
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @param length
 * @param separator
 * @returns {string}
 */
export function mmUid(length?: number, separator = '-') {
    let s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toLowerCase();

    if (!length) {
        // prettier-ignore
        return (
            s4() + s4() + separator + s4() + separator + s4() + separator + s4() + separator + s4() + s4() + s4()
        );
    }

    // custom length
    let c = Math.ceil(length / 4);
    let out = '';
    for (let i = 0; i < c; i++) {
        out += s4();
    }
    return out.substr(0, length);
}
