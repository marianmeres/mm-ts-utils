/**
 * inspiration: https://github.com/klughammer/node-randomstring
 * @param options
 * @returns {string}
 */
export declare function mmGetRandomStr(options?: {
    length?: number;
    charset?: string;
    readable?: boolean;
    unique?: boolean;
    prefix?: string;
}): string;
