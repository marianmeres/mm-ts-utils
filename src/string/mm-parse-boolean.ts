
/**
 * To be used for process.env vars...
 * @param val
 */
export const mmParseBoolean = (val: any): boolean => {
    if (typeof val === 'boolean') {
        return val;
    }

    if (Number.isInteger(val)) {
        return val !== 0;
    }

    if (typeof val !== 'string') {
        return !!val;
    }

    // normalize
    val = val.toLowerCase().trim();

    // maybe numeric string?
    const num = parseFloat(val);
    if (!isNaN(num)) {
        return num !== 0;
    }

    //
    switch (val) {
        case 'yes':
        case 'y':
        case 'true':
        case 'ok':
        case 'on':
        case 'enabled':
            return true;
        default:
            return false;
    }
};