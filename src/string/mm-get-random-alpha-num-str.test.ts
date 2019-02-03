import { mmUid } from './mm-uid';

test('`mmUid` works', () => {
    let s = mmUid();
    expect(s.length).toEqual(36);
    expect(s === mmUid()).toBeFalsy();

    expect(mmUid(5).length).toEqual(5);
    expect(mmUid(5) === mmUid(5)).toBeFalsy();
});
