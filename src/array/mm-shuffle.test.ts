import { mmShuffle } from './mm-shuffle';

test('`mmShuffle` works', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const b = mmShuffle(a.slice(0));
    expect(a.length === b.length).toBeTruthy();
    expect(a.join() === b.join()).toBeFalsy();
});
