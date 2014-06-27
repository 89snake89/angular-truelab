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

        it('Must be a function', function () {
            expect(tlTruncateFilter).toBeFunction();
        });

        it('Must return the same value if is not a string', function () {
            var string = [],
                expected = string;

            expect( tlTruncateFilter(string) ).toEqual(expected);
        });

        it('Must truncate a string if it\'s to long and add a suffix at the end', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long',
                suffix = '¥¥¥',
                length   = truncatedText.length + suffix.length,
                expected = truncatedText + suffix;

            expect( tlTruncateFilter(string, length, suffix) ).toEqual(expected);
        });

        it('Must use the default options if provided are invalid', function () {
            var string = 'A long Long string that works... with me!',
                truncatedText = 'A long ',
                suffix = 777,
                length   = 'invalid',
                expected = truncatedText + '...';

            expect( tlTruncateFilter(string, length, suffix) ).toEqual(expected);
        });
    });
});


