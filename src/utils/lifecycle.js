'use strict';


/**
 * @ngdoc overview
 * @name truelab.utils.lifecycle
 * @requires truelab.strings
 * @description
 *
 * # truelab.utils.lifecycle
 *
 * # services
 *
 * - {@link truelab.utils.lifecycle.service:$tlLifecycle $tlLifecycle }
 */
angular
    .module('truelab.utils.lifecycle', ['truelab.strings'])

    /**
     *
     * @ngdoc service
     * @name truelab.utils.lifecycle.service:$tlLifecycle
     *
     * @param {...string} [...phases='start','stop'] - phases
     *
     * @description
     * Low-level factory which creates a lifecycle object that lets you interact with phases by register/unregister
     * functions for each phase and execute/clear them.
     *
     * @example
     * ```
     * // ...
     * myApp.factory('myService', function ($tlLifecycle) {
     *
     *     return {
     *         lifecycle : $tlLifecycle('born','die'),
     *         doBorn : function () {
     *             this.lifecycle.execute('born','and pass','some', arguments);
     *         },
     *         doDie : function () {
     *              this.lifecycle.execute('die','and pass','some','arguments')
     *         }
     *     };
     * });
     *
     * // ... later
     * myApp.controller('myController', function (myService) {
     *     myService
     *        .lifecycle
     *        .onBorn(function(arg1, arg2, arg3) {
     *              console.log(arg1, arg2, arg3);
     *              // logs => 'and pass','some','arguments' every time myService.doBorn() is called;
     *        })
     *        .onBorn(function () {
     *              console.log('You born');
     *              // logs => 'You born' every time myService.doBorn() is called;
     *        })
     *        .onDie(function () {
     *              console.log('You die');
     *              // logs => 'You die' every time myService.doDie() is called;
     *        });
     *
     *    myService
     *      .doBorn();
     *
     *    myService
     *      .lifecycle
     *      .clearOnBorn();
     *
     *    myService.doBorn(); // no more onBorn callbacks fired
     *
     *    myService.doDie(); // onDie callbacks fired
     *
     *    myService
     *      .lifecycle
     *      .clear();
     *
     *    myService.doDie() // no more callbacks fired at all
     *
     * });
     *
     * ```
     *
     * @returns {Object} A lifecycle "class" object with those base methods:
     *
     * * ** `clear()` ** - clear all callbacks for all phases
     * * ** `execute(phase, ...arguments)` ** - execute callbacks for ```phase``` applying specified ```arguments```
     *
     *
     */
    .factory('$tlLifecycle', function($tlStringUtils) {

        function clearFnName(phase) {
            return 'clear' + $tlStringUtils.firstUpper(pushFnName(phase));
        }

        function pushFnName(phase) {
            return 'on' + $tlStringUtils.firstUpper(phase);
        }

        function stackName(phase) {
            return '$$' + pushFnName(phase) + 'Fns';
        }

        function pushFnsFactory(stackKey) {
            return function (fn) {
                var self = this;
                self[stackKey].push(fn);
                return self;
            };
        }

        function clearFnsFactory(stackKey) {
            return function () {
                var self = this;
                self[stackKey] = [];
                return self;

            };
        }

        function clearFnFactory(phases) {
            return function () {
                var self = this;
                angular.forEach(phases, function(phase) {
                    self[stackName(phase)] = [];
                });
                return self;
            };
        }

        function executeFnFactory() {
            return function () {
                var self = this,
                    args  = Array.prototype.slice.call(arguments),
                    phase = args.shift(),
                    fns   = self[stackName(phase)];

                angular.forEach(fns, function (fn) {
                    if(angular.isFunction(fn.apply)) {
                        fn.apply(fn, args);
                    }
                });
            };
        }

        function $tlLifecycle() {

            var phases = arguments.length > 0 ? Array.prototype.slice.call(arguments) : ['start', 'stop'];

            /**
             * @description
             *
             * Dynamic lifecycle instance object, when instantiated with
             * the factory ```$tlLifecycle({phases : ['start','stop']})```
             * the resulting lifecycle instance has:
             *
             *  * ```onStart```, ```onStop`` functions to register callbacks for related phase
             *  * ```clearOnStart```, ```clearOnStop``` functions to clear callbacks for related phase
             *
             *
             * @property {function} clear - clear all function stacks
             * @property {function} execute
             *     @param {string}    phase - phase name
             *     @param {...object} args  - arguments to apply
             */
            var lifecycle = {
                execute : executeFnFactory(),
                clear : clearFnFactory(phases)
            };

            // adds "private" stacks and prototypes method
            angular.forEach(phases, function (phase) {

                var stackKey    = stackName(phase);
                var pushFnKey   = pushFnName(phase);
                var clearFnKey  = clearFnName(phase);

                lifecycle[stackKey]   = [];
                lifecycle[pushFnKey]  = pushFnsFactory(stackKey);
                lifecycle[clearFnKey] = clearFnsFactory(stackKey);
            });

            return lifecycle;
        }

        return $tlLifecycle;
    });



