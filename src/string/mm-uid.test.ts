import { mmUid } from './mm-uid';

test('`mmUid` works', () => {
    let s = mmUid();
    expect(s.length).toEqual(36);
    expect(s === mmUid()).toBeFalsy();

    expect(mmUid(5).length).toEqual(5);
    expect(mmUid(5) === mmUid(5)).toBeFalsy();
});

test('custom separator', () => {
    let s = mmUid(0, '__');
    expect(s.split('__').length).toEqual(5);

    // no separator
    s = mmUid(0, '');
    expect(/^[0-9a-z]+$/i.test(s)).toBeTruthy();
});
