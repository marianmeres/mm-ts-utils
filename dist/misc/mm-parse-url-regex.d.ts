/**
 * @param url
 */
export declare const mmParseUrlRegex: (url: any) => {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
};
