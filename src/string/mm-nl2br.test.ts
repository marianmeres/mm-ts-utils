import { mmNl2br } from './mm-nl2br';

test('`mmNl2br` works', () => {
    expect(mmNl2br('a\nb')).toEqual('a<br/>\nb');
    expect(mmNl2br('a\n\nb')).toEqual('a<br/>\n<br/>\nb');
});
