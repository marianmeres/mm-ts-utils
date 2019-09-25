import { mmGetRandomAlphaNumStr } from './mm-get-random-alpha-num-str';

test('`mmGetRandomAlphaNumStr` works', () => {
    let prefix = 'hey';
    let len = 5;
    let s = mmGetRandomAlphaNumStr(len, prefix);
    expect(s.length).toEqual(len + prefix.length);
    expect(s === mmGetRandomAlphaNumStr(len, prefix)).toBeFalsy();
});