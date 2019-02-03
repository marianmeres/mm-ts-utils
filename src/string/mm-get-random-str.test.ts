import { mmGetRandomStr } from './mm-get-random-str';

test('`mmGetRandomStr` works', () => {
    let s = '';

    s = mmGetRandomStr();
    expect(s.length).toEqual(8);

    s = mmGetRandomStr({ length: 10 });
    expect(s.length).toEqual(10);

    s = mmGetRandomStr({ charset: 'a', length: 5 });
    expect(s).toEqual('aaaaa');

    s = mmGetRandomStr({ charset: 'a', length: 5 });
    expect(s).toEqual('aaaaa');

    s = mmGetRandomStr({ charset: 'a', length: 5, unique: true });
    expect(s).toEqual('aaaaa'); // this is OK because unique is ment for input

    s = mmGetRandomStr({ prefix: 'foo' });
    expect(s.length).toEqual(8 + 3);
    expect(s.substring(0, 3)).toEqual('foo');

    s = mmGetRandomStr({ length: 128, readable: true });
    // console.log(s);
    expect(s.length).toEqual(128);
    expect(s.match(/01oil/i)).toBeFalsy();

    try {
        mmGetRandomStr({ length: -5 });
        expect(true).toBeFalsy(); // must not be reached
    } catch (e) {
        /**/
    }
});
