import { mmUcfirst } from './mm-ucfirst';

test('`mmUcfirst` works', () => {
    expect(mmUcfirst('abc')).toEqual('Abc');
    expect(mmUcfirst('ABC')).toEqual('ABC');
    expect(mmUcfirst('-')).toEqual('-');
    expect(mmUcfirst('')).toEqual('');
});
