'use strict';

/**
 * @ngdoc overview
 * @name truelab.strings.filters
 * @description
 *
 * # truelab.strings.filters
 *
 * The `truelab.strings.filters` module contains a collection of generic strings filters like:
 *
 * - {@link truelab.strings.filters.filter:tlTruncate tlTruncate}
 *
 */
angular
    .module('truelab.strings.filters', [])

    /**
     * @ngdoc filter
     * @name truelab.strings.filters.filter:tlTruncate
     * @description
     *
     * Truncate a string if it's too long and add a suffix at the end
     *
     * @param {string} text            - string to truncate
     * @param {int}    [length=10]     - the desired output length
     * @param {string} [end='...']     - string to append at the end
     *
     * @example
     * <doc:example module="truelab.tlTruncateFilterApp">
     *    <doc:source>
     *        <script>
     *            angular
     *              .module('truelab.tlTruncateFilterApp', ['truelab.strings.filters'])
     *              .run(function ($rootScope) {
     *                  $rootScope.myText = 'This is an example.';
     *              })
     *        </script>
     *
     *        <ul>
     *            <li> {{myText|tlTruncate}} </li>
     *            <li> {{myText|tlTruncate:6}} </li>
     *            <li> {{myText|tlTruncate:12:' ->'}} </li>
     *            <li> {{myText|tlTruncate:25 }} </li>
     *        </ul>
     *    </doc:source>
     * </doc:example>
     *
     */
    .filter('tlTruncate', function () {
        return function (text, length, end) {

            if(!angular.isString(text)) {
                return text;
            }

            var l = angular.isNumber(length) ? length : 10,
                e = angular.isString(end) ? end : '...';

            if (text.length <= l || text.length - e.length <= l) {
                return text;
            }else {
                return text.substring(0, l - e.length) + e;
            }
        };
    });



