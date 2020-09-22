/**
 * Stupid quick and dirty sanity check... must be ran with increased --max-old-space-size
 *      node --max-old-space-size=8192 scripts\test-mm-uid.js
 */

const map = new Map();
const MAX = 10_000_000;
const START = Date.now();
let i;

for (i = 0; i < MAX; i++) {
    let uid = mmUid();
    if (map.has(uid)) {
        throw new Error(`Colision for ${i} / ${uid}`);
    } else {
        map.set(uid, true);
    }
    // just to see some progress..
    if (!(i % 1_000_000)) {
        console.log(i);
    }
}

console.log(`DONE ${i} in ${(Date.now() - START) / 1000} s`);

//
function mmUid(length, separator) {
    if (separator === void 0) { separator = '-'; }
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toLowerCase();
    };
    if (!length) {
        // prettier-ignore
        return (s4() + s4() + separator + s4() + separator + s4() + separator + s4() + separator + s4() + s4() + s4());
    }
    // custom length
    var c = Math.ceil(length / 4);
    var out = '';
    for (var i = 0; i < c; i++) {
        out += s4();
    }
    return out.substr(0, length);
}