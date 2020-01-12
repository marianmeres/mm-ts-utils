import { mmParseBoolean } from './mm-parse-boolean';

test('mmParseBoolean works', () => {

    // booleans
    expect(mmParseBoolean(true)).toEqual(true);
    expect(mmParseBoolean(false)).toEqual(false);

    // ints/floats
    expect(mmParseBoolean(1)).toEqual(true);
    expect(mmParseBoolean(-1)).toEqual(true);
    expect(mmParseBoolean(2)).toEqual(true);
    expect(mmParseBoolean(1.234)).toEqual(true);
    expect(mmParseBoolean(-1.234)).toEqual(true);
    expect(mmParseBoolean(2.345)).toEqual(true);
    expect(mmParseBoolean(0.123)).toEqual(true);
    expect(mmParseBoolean(-0.123)).toEqual(true);

    expect(mmParseBoolean(0)).toEqual(false);
    expect(mmParseBoolean(0.00)).toEqual(false);

    // ints/floats written as strings
    expect(mmParseBoolean('1')).toEqual(true);
    expect(mmParseBoolean('-1')).toEqual(true);
    expect(mmParseBoolean('2')).toEqual(true);
    expect(mmParseBoolean('1.234')).toEqual(true);
    expect(mmParseBoolean('-1.234')).toEqual(true);
    expect(mmParseBoolean('2.345')).toEqual(true);
    expect(mmParseBoolean('0.123')).toEqual(true);
    expect(mmParseBoolean('-0.123')).toEqual(true);

    expect(mmParseBoolean('0')).toEqual(false);
    expect(mmParseBoolean('0.00')).toEqual(false);
    expect(mmParseBoolean(Math.random().toString())).toEqual(true);

    // strings
    expect(mmParseBoolean('')).toEqual(false);

    // true
    expect(mmParseBoolean('1')).toEqual(true);
    expect(mmParseBoolean('oN')).toEqual(true);
    expect(mmParseBoolean('tRUe')).toEqual(true);
    expect(mmParseBoolean('eNabLEd')).toEqual(true);
    expect(mmParseBoolean('Ok')).toEqual(true);
    expect(mmParseBoolean('yES')).toEqual(true);
    expect(mmParseBoolean('y')).toEqual(true);

    // every other string is false
    expect(mmParseBoolean('   ')).toEqual(false);
    expect(mmParseBoolean('aasdf')).toEqual(false);
    expect(mmParseBoolean('OFF')).toEqual(false);
    expect(mmParseBoolean('diSAbled')).toEqual(false);
});