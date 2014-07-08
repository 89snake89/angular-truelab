'use strict';

angular
    .module('truelab.strings')

    /**
     * @ngdoc filter
     * @name truelab.strings.filter:tlTruncate
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
     *              .module('truelab.tlTruncateFilterApp', ['truelab.strings'])
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
    .filter('tlTruncate', function ($tlStringUtils) {
        return function (text, length, end) {
            return $tlStringUtils.truncate(text, length, end);
        };
    })

    /**
     * @ngdoc filter
     * @name truelab.strings.filter:tlFirstUpper
     * @description
     *
     * First letter to uppercase
     *
     * @param {string}  text         - text to capitalize
     * @param {boolean} [each=false] - if true capitalize first letter of each word
     *
     * @example
     * <doc:example module="truelab.tlFirstUpperFilterApp">
     *    <doc:source>
     *        <script>
     *            angular
     *              .module('truelab.tlFirstUpperFilterApp', ['truelab.strings'])
     *              .run(function ($rootScope) {
     *                  $rootScope.myText = 'this is an example.';
     *              })
     *        </script>
     *
     *        <ul>
     *            <li> {{myText|tlFirstUpper}} </li>
     *            <li> {{myText|tlFirstUpper:true}} </li>
     *        </ul>
     *    </doc:source>
     * </doc:example>
     *
     */
    .filter('tlFirstUpper', function ($tlStringUtils) {
        return function (text, each) {
           return $tlStringUtils.firstUpper(text, each);
        };
    });



