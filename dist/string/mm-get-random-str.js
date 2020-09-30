"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmGetRandomStr = void 0;
/**
 * inspiration: https://github.com/klughammer/node-randomstring
 * @param options
 * @returns {string}
 */
function mmGetRandomStr(options) {
    options = Object.assign({
        length: 8,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        readable: false,
        unique: false,
        prefix: '',
    }, options || {});
    var length = options.length, charset = options.charset, readable = options.readable, unique = options.unique, prefix = options.prefix;
    // sanity
    if (isNaN(length) || length < 1 || length > 1024) {
        throw new Error('Invalid length');
    }
    if (readable) {
        charset = charset.replace(/[01oil]/gi, ''); // flag `i` makes it safe for later `toUpperCase`
    }
    if (unique) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // there seems to be a bug related with the spread operator as TS keeps saying:
        //      Type 'Set<string>' is not an array type
        // charset = [...new Set(charset)].join(''); // oh yeah!
        // so to keep it quiet:
        charset = Array.from(new Set(charset)).join('');
    }
    var out = '';
    while (length--) {
        out += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return prefix + out;
}
exports.mmGetRandomStr = mmGetRandomStr;
