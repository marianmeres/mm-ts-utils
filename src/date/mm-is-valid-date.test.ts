import { mmIsValidDate } from './mm-is-valid-date';

test('`mmIsValidDate` works', () => {
    expect(mmIsValidDate(new Date())).toBeTruthy();
    expect(mmIsValidDate('foo')).toBeFalsy();
});
