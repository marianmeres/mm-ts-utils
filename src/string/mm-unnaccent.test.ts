import { mmUnaccent } from './mm-unaccent';

test('`mmUnaccent` works', () => {
    const s = 'Příliš žluťoučký kůň úpěl ďábelské ódy';
    const expected = 'Prilis zlutoucky kun upel dabelske ody';
    expect(mmUnaccent(s)).toEqual(expected);
    expect(mmUnaccent(s.toUpperCase())).toEqual(expected.toUpperCase());
});
