const cryptoHash = require("./crypto-hash");

describe('cryptoHash()', () => {

    "3719cdb545c42ac800598a53b0e63b10e256e7a13b6181f5c101d7106dafd21b"

    it('Generates a SHA-256 hashed output', () => {
        expect(cryptoHash('elsowiny')).toBe('3719cdb545c42ac800598a53b0e63b10e256e7a13b6181f5c101d7106dafd21b');

    })

    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('elsowiny')).toBe(cryptoHash('elsowiny'));
        expect(cryptoHash('1')).toBe(cryptoHash('1'));
        expect(cryptoHash('foo')).toBe(cryptoHash('foo'));
        expect(cryptoHash('foo','bar', 'raspberypi')).toBe(cryptoHash('raspberypi', 'bar', 'foo'));

    })
});