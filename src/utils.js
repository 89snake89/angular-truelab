'use strict';

angular
    .module('truelab.strings')

    /**
     * @ngdoc service
     * @name truelab.strings.service:$tlStringUtils
     * @requires _
     * @description
     *
     * A service that allows developers to manipulate strings
     *
     */
    .factory('$tlStringUtils', function (_) {

        return {
            /**
             *
             * @ngdoc function
             * @name $tlStringUtils#truncate
             * @methodOf truelab.strings.service:$tlStringUtils
             *
             *
             * @param {string} text            - string to truncate
             * @param {int}    [length=10]     - the desired output length
             * @param {string} [end='...']     - string to append at the end
             *
             * @returns {string} text - truncated text
             */
            truncate : function (text, length, end) {

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
            },
            /**
             *
             * @ngdoc function
             * @name $tlStringUtils#firstUpper
             * @methodOf truelab.strings.service:$tlStringUtils
             *
             * @description
             *
             * Covert first letter to uppercase
             *
             * @param {string}  text         - text to capitalize
             * @param {boolean} [each=false] - if true capitalize first letter of each word
             *
             * @returns {string} text - uppercase text
             */
            firstUpper : function (text, each) {

                if(!angular.isString(text) || text === '') {
                    return text;
                }

                var capitalizeFirstLetter = function (text) {
                    var t = text.toLowerCase();
                    return t.charAt(0).toUpperCase() + t.slice(1);
                };

                var t, options = {
                    each : each || false
                };

                if(!options.each) {

                    t = capitalizeFirstLetter(text);

                }else{

                    t = _.map(text.split(' '), function (text) {
                        return capitalizeFirstLetter(text);
                    }).join(' ');
                }

                return t;
            }
        };
    });


