'use strict';

describe('truelab.strings:$tlStringUtils', function () {

    var $tlStringUtils;

    beforeEach(module('truelab.strings'));

    beforeEach(inject(function (_$tlStringUtils_) {
        $tlStringUtils = _$tlStringUtils_;
    }));

    it('should load the module', function () {
        expect(true).toBe(true);
    });

    describe('$tlStringUtils.truncate', function () {
        it('should return the same value if is not a string', function () {
            var string = [],
                expected = string;

            expect( $tlStringUtils.truncate(string) ).toEqual(expected);
        });

        it('should return the same value if truncate effect is not applicable', function () {
            var string = 'hello',
                expected = 'hello';

            expect( $tlStringUtils.truncate(string, 3, '...') ).toEqual(expected);
        });

        it('should truncate a string if it\'s to long and add a suffix at the end', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long',
                suffix = '¥¥¥',
                length   = truncatedText.length + suffix.length,
                expected = truncatedText + suffix;

            expect( $tlStringUtils.truncate (string, length, suffix) ).toEqual(expected);
        });

        it('should use the default options if provided are invalid', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long ',
                suffix = 777,
                length   = 'invalid',
                expected = truncatedText + '...';

            expect( $tlStringUtils.truncate (string, length, suffix) ).toEqual(expected);
        });
    });

    describe('$tlStringUtils.firstUpper', function () {
        it('should return the same value if value is not a string', function () {
            expect($tlStringUtils.firstUpper([1 ,'mix'])).toEqual([1 ,'mix']);
        });

        it('should convert the first letter to uppercase', function () {
            expect($tlStringUtils.firstUpper('hello')).toBe('Hello');
            expect($tlStringUtils.firstUpper('hello world, hello man')).toBe('Hello world, hello man');
        });

        it('should convert the first letter of each word to uppercase', function () {
            expect($tlStringUtils.firstUpper('hello world, hello man €‘', true)).toBe('Hello World, Hello Man €‘');
        });
    });
});