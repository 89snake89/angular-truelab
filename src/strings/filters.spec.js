'use strict';

describe('truelab.strings.filters', function () {

    beforeEach(module('truelab.strings.filters'));

    it('should load the module', function () {
        expect(true).toBe(true);
    });

    describe('tlTruncateFilter', function () {
        var tlTruncateFilter;

        beforeEach(inject(function(_tlTruncateFilter_) {
            tlTruncateFilter = _tlTruncateFilter_;
        }));

        it('should be a function', function () {
            expect(tlTruncateFilter).toBeFunction();
        });

        it('should return the same value if is not a string', function () {
            var string = [],
                expected = string;

            expect( tlTruncateFilter(string) ).toEqual(expected);
        });

        it('should truncate a string if it\'s to long and add a suffix at the end', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long',
                suffix = '¥¥¥',
                length   = truncatedText.length + suffix.length,
                expected = truncatedText + suffix;

            expect( tlTruncateFilter(string, length, suffix) ).toEqual(expected);
        });

        it('should use the default options if provided are invalid', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long ',
                suffix = 777,
                length   = 'invalid',
                expected = truncatedText + '...';

            expect( tlTruncateFilter(string, length, suffix) ).toEqual(expected);
        });
    });

    describe('tlFirstUpperFilter', function () {
        var tlFirstUpperFilter;

        beforeEach(inject(function(_tlFirstUpperFilter_) {
            tlFirstUpperFilter = _tlFirstUpperFilter_;
        }));

        it('should return the same value if value is not a string', function () {
            expect(tlFirstUpperFilter([1 ,'mix'])).toEqual([1 ,'mix']);
        });

        it('should convert the first letter to uppercase', function () {
            expect(tlFirstUpperFilter('hello')).toBe('Hello');
            expect(tlFirstUpperFilter('hello world, hello man')).toBe('Hello world, hello man');
        });

        it('should convert the first letter of each word to uppercase', function () {
            expect(tlFirstUpperFilter('hello world, hello man €‘', true)).toBe('Hello World, Hello Man €‘');
        });
    });
});


