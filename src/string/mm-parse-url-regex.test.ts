import { mmParseUrlRegex } from './mm-parse-url-regex';

test('parse url works', () => {
    let url = 'http://www.example.com:8080/some/path/file.txt?foo=bar&baz=bat#section123';
    let parsed = mmParseUrlRegex(url);

    expect(parsed).toEqual({
        protocol: 'http:',
        hostname: 'www.example.com',
        port: '8080',
        pathname: '/some/path/file.txt',
        search: '?foo=bar&baz=bat',
        hash: '#section123'
    })
});

test('parse url works 2', () => {
    let url = 'https://123.456.789.123:80';
    let parsed = mmParseUrlRegex(url);

    expect(parsed).toEqual({
        protocol: 'https:',
        hostname: '123.456.789.123',
        port: '80',
        pathname: '',
        search: '',
        hash: ''
    })
});

test('parse url bad url', () => {
    let url = 'not an url';
    let parsed = mmParseUrlRegex(url);

    expect(parsed).toEqual({
        protocol: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: ''
    })
});

test('parse url ipv6', () => {
    let url = 'http://[2001:db8:a0b:12f0::1]:80/index.html?foo=bar#baz';
    let parsed = mmParseUrlRegex(url);
    // console.log(parsed);

    expect(parsed).toEqual({
        protocol: 'http:',
        hostname: '[2001:db8:a0b:12f0::1]',
        port: '80',
        pathname: '/index.html',
        search: '?foo=bar',
        hash: '#baz'
    })
});