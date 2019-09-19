/**
 * @param len
 * @param prefix
 */
export function mmGetRandomAlphaNumStr(len: number, prefix: string = ''): string {
    let salt = '';
    while (salt.length < len) {
        salt += Math.random()
            .toString(36)
            .substr(2);
    }
    return (prefix || '') + salt.substr(0, len);
}
