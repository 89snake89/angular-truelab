'use strict';

/**
 * @ngdoc overview
 * @name truelab.countdown
 * @description
 *
 * # truelab.countdown
 *
 * The `truelab.countdown` module
 *
 *  ### services
 *
 *   - {@link truelab.countdown.service:$tlCountdown $tlCountdown}
 *
 */
angular
    .module('truelab.countdown', [])


/**
 * @ngdoc service
 * @name truelab.countdown.service:$tlCountdown
 * @requires truelab.countdown.service:$$TlCountdown
 *
 * @description
 *
 * This service allow developers to instantiate a new countdown object
 *
 * @example
 * <doc:example module="tlCountdownApp">
 *     <doc:source>
 *       <script>
 *         angular
 *             .module('tlCountdownApp', ['truelab.countdown'] )
 *             .run(function ($rootScope, $window, $tlCountdown) {
 *                 $rootScope.countdown = $tlCountdown.$new({
 *                     seconds : 10
 *                 });
 *
 *                 $rootScope
 *                     .countdown
 *                     .$lifecycle
 *                     .start(function () {
 *                        $window.alert('Started!');
 *                     })
 *                    .expire(function () {
 *                        $window.alert('Expired!');
 *                    });
 *              });
 *      </script>
 *
 *      <div>
 *          <strong>{{ countdown.$seconds }} s</strong>
 *          <small ng-show="countdown.$expired">expired !</small>
 *          <hr>
 *          <button class="btn btn-primary"
 *             ng-click="countdown.start()"
 *             ng-disabled="countdown.$running || countdown.$expired">
 *              start
 *          </button>
 *          <button class="btn btn-default"
 *             ng-click="countdown.stop()"
 *             ng-disabled="!countdown.$running">
 *              stop
 *          </button>
 *          <br>
 *
 *      </div>
 *     </doc:source>
 * </doc:example>
 *
 */
    .factory('$tlCountdown', function ($$TlCountdown) {

        return  {
            /**
             *
             * @ngdoc function
             * @name $tlCountdown#$new
             * @methodOf truelab.countdown.service:$tlCountdown
             *
             * @param  {object} config - configuration object
             * @returns {$$TlCountdown} countdown - countdown
             *
             * @description
             * Return a new countdown object, the ***config*** object
             * has the following acceptable properties.
             *
             * - **`seconds`** - {int=} - duration in seconds
             *
             * -----------
             *
             * The ***countdown*** object has the following methods/properties
             *
             * - ** `start` **      - {function=}   - start the countdown
             * - ** `stop` **       - {function=}   - stop the countdown
             * - ** `$running` **   - {boolean=}    - true when running, false otherwise
             * - ** `$expired` **   - {boolean=}    - true when expired, false otherwise
             * - ** `$lifecycle` ** - {$$TlCountdownLifecycle=} - a lifecycle object to register callbacks functions
             *      - ** `start` **  - {function=}   - register a callback function fired when countdown starts
             *      - ** `stop` **   - {function=}   - register a callback function fired when countdown stops
             *      - ** `tick` **   - {function=}   - register a callback function fired when countdown ticks
             *      - ** `expire` ** - {function=}   - register a callback function fired when countdown expires
             *
             */
            $new : function (config) {
                /*jshint newcap: false */
                return new $$TlCountdown(config);
                /*jshint newcap: true */
            }
        };
    })


    /**
     * @ngdoc service
     * @name truelab.countdown.service:$$TlCountdownLifecycle
     * @description
     *
     * ***Private*** countdown lifecycle service, please see {@link truelab.countdown.service:$tlCountdown $tlCountdown}
     */
    .factory('$$TlCountdownLifecycle', function () {

        /**
         * @name TlCountdownLifecycle
         * @constructor
         */
        function TlCountdownLifecycle() {
            this.$$onStartFns  = [];
            this.$$onStopFns   = [];
            this.$$onExpireFns = [];
            this.$$onTickFns   = [];
        }

        TlCountdownLifecycle.prototype = {
            /**
             * @ngdoc function
             * @name $$TlCountdownLifecycle#start
             * @methodOf truelab.countdown.service:$$TlCountdownLifecycle
             *
             * @param {function} fn - callback function
             *
             * @description
             * Register a callback that fires when starts
             */
            start : function (fn) {
                this.$$onStartFns.push(fn);
                return this;
            },
            /**
             * @ngdoc function
             * @name $$TlCountdownLifecycle#stop
             * @methodOf truelab.countdown.service:$$TlCountdownLifecycle
             *
             * @param {function} fn - callback function
             *
             * @description
             * Register a callback that fires when stops
             */
            stop : function(fn) {
                this.$$onStopFns.push(fn);
                return this;
            },
            /**
             * @ngdoc function
             * @name $$TlCountdownLifecycle#expire
             * @methodOf truelab.countdown.service:$$TlCountdownLifecycle
             *
             * @param {function} fn - callback function
             *
             * @description
             * Register a callback that fires when expires
             */
            expire : function (fn) {
                this.$$onExpireFns.push(fn);
                return this;
            },
            /**
             * @ngdoc function
             * @name $$TlCountdownLifecycle#tick
             * @methodOf truelab.countdown.service:$$TlCountdownLifecycle
             *
             * @param {function} fn - callback function
             *
             * @description
             * Register a callback that fires when tick
             */
            tick : function (fn) {
                this.$$onTickFns.push(fn);
                return this;
            },
            /**
             * Execute all fns associated with countdown phase
             *
             * @param {string} phase    - countdown event/phase {'onStart','onTick','onStop','onExpire'}
             * @param {object} argument - argument to pass
             *
             * @private
             */
            $$execute : function (phase, argument) {
                var fns = this['$$' + phase + 'Fns'];

                angular.forEach(fns, function (fn) {
                    fn.call(argument);
                });
            }

        };

        return TlCountdownLifecycle;
    })

    /**
     * @ngdoc service
     * @name truelab.countdown.service:$$TlCountdown
     *
     * @requires truelab.countdown.service:$$TlCountdownLifecycle
     * @requires $timeout
     * @requires $log
     *
     * @property {$$TlCountdownLifecycle} $lifecycle - A lifecycle object
     * @property {boolean} $running   - bool flag
     * @property {boolean} $expired   - bool flag
     *
     * @description
     *
     * ***Private*** countdown service please see {@link truelab.countdown.service:$tlCountdown $tlCountdown}
     */
    .factory('$$TlCountdown', function ($$TlCountdownLifecycle, $timeout, $log) {


        /**
         * Execute a tick on countdown object
         *
         * @param {TlCountdown} countdown
         * @private
         */
        function __tick(countdown) {

            if(countdown.$seconds <= 0) {
                countdown.stop();
                return;
            }

            countdown.$$running = true;
            countdown.$running = true;

            countdown.$$stopped = $timeout(function() {

                countdown.$$running = true;
                countdown.$running = true;

                countdown.$seconds--;

                if(countdown.$seconds <= 0) {

                    countdown.$lifecycle.$$execute('onExpire', countdown);

                    countdown.$$expired = true;
                    countdown.$expired  = true;
                    countdown.stop();

                    return;
                }

                countdown.$lifecycle.$$execute('onTick', countdown);

                __tick(countdown);

            }, 1000);

            return countdown.$$stopped;
        }

        /**
         * TlCountdown
         * @param {Object} config - a configuration object
         * @constructor
         */
        function TlCountdown (config) {
            var self = this;

            /**
             * @name $seconds
             * @type {string}
             * @description
             *
             * {int} Seconds before expiring
             */
            self.$seconds   = config.seconds || 0;


            /**
             * @name $lifecycle
             * @description
             *
             * {{@link truelab.countdown.service:$$TlCountdownLifecycle $$TlCountdownLifecycle}} Countdown lifecycle
             */
            /*jshint newcap: false */
            self.$lifecycle = new $$TlCountdownLifecycle();
            /*jshint newcap: true */

            self.$running  = false;
            self.$expired  = false;

            self.$$seconds  = self.$seconds;
            self.$$expired  = false;
            self.$$running  = false;
            self.$$stopped  = undefined;
        }

        /**
         * @ngdoc function
         * @name $$TlCountdown#start
         * @methodOf truelab.countdown.service:$$TlCountdown
         *
         * @description
         * Start countdown
         */
        TlCountdown.prototype.start  = function () {
            var self = this;

            if(self.$$expired === true) {
                $log.error('can\'t start expired countdown!');
                return;
            }

            if(self.$$running === false) {

                self.$lifecycle.$$execute('onStart', self);
                __tick(self);

            }else{

                $log.error('can\'t start already running!');
                return;
            }
        };

        /**
         * @ngdoc function
         * @name $$TlCountdown#stop
         * @methodOf truelab.countdown.service:$$TlCountdown
         *
         * @description
         * Stop countdown
         */
        TlCountdown.prototype.stop = function () {

            var self = this;
            $timeout.cancel(self.$$stopped);
            self.$$running = false;
            self.$running  = false;

            self.$lifecycle.$$execute('onStop', self);

        };

        return TlCountdown;

    });


