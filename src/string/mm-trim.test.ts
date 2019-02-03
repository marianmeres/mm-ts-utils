import { mmTrim } from './mm-trim';

test('`mmTrim` works', () => {
    expect(mmTrim(' \t \ra bc \n')).toEqual('a bc');
});
