import { mmParseQuery } from './mm-parse-query';

test('`mmParseQuery` works', () => {

    expect(mmParseQuery('a=1&b=2&c=3&a=0')).toEqual({
        a: '0', b: '2', c: '3'
    })

});