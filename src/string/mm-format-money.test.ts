import { mmFormatMoney } from './mm-format-money';

test('`mmFormatMoney` works', () => {
    expect(mmFormatMoney(1234.567, 2, ',')).toEqual('1 234,57');
});
