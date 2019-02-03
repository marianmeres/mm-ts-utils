import { mmHashCode } from './mm-hash-code';

test('`mmHashCode` works', () => {
    let checksum = mmHashCode('foo');

    expect(checksum).toBeTruthy();
    expect(checksum).toEqual(mmHashCode('foo')); // deterministic
    expect(checksum === mmHashCode('bar')).toBeFalsy();
});
