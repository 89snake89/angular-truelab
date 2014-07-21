'use strict';

/**
 * @ngdoc overview
 * @name truelab.countdown
 * @requires truelab.utils.lifecycle
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
    .module('truelab.countdown', ['truelab.utils.lifecycle'])


/**
 * @ngdoc service
 * @name truelab.countdown.service:$tlCountdown
 * @requires truelab.countdown.service:$$TlCountdown
 *
 * @param  {object} config
 *
 * - configuration object has the following acceptable properties:
 *
 *     * **`seconds`** - {int=} - duration in seconds
 *
 * @description
 *
 * This service allow developers to instantiate a new countdown object
 *
 * -----------
 * @returns {$$TlCountdown} countdown - a new countdown object
 *
 * The ***countdown*** object has the following methods/properties
 *
 * - ** `start` **      - {function=}   - start the countdown
 * - ** `stop` **       - {function=}   - stop the countdown
 * - ** `$running` **   - {boolean=}    - true when running, false otherwise
 * - ** `$expired` **   - {boolean=}    - true when expired, false otherwise
 * - ** `$lifecycle` ** - {object} - a lifecycle object to register callbacks functions
 *      - ** `onFirstStart` **  - {function=}   - register a callback function fired when countdown starts for the first time
 *      - ** `onStart` **       - {function=}   - register a callback function fired when countdown starts
 *      - ** `onStop` **        - {function=}   - register a callback function fired when countdown stops
 *      - ** `onTick` **        - {function=}   - register a callback function fired when countdown ticks
 *      - ** `onExpire` **      - {function=}   - register a callback function fired when countdown expires
 *
 * @example
 * <doc:example module="tlCountdownApp">
 *     <doc:source>
 *       <script>
 *         angular
 *             .module('tlCountdownApp', ['truelab.countdown'] )
 *             .run(function ($rootScope, $window, $tlCountdown) {
 *                 $rootScope.countdown = $tlCountdown({
 *                     seconds : 10
 *                 });
 *
 *                 $rootScope
 *                     .countdown
 *                     .$lifecycle
 *                     .onFirstStart(function (countdown) {
 *                          $window.alert('First start!')
 *                     })
 *                     .onStart(function (countdown, firstStart) {
 *                        if(firstStart === false) {
 *                          $window.alert('ReStarted!');
 *                        }
 *                     })
 *                     .onStop(function (countdown) {
 *                        if( countdown.$expired === true ) {
 *                           $window.alert('Stopped after expiring!');
 *                        }else{
 *                           $window.alert('Stopped!');
 *                        }
 *                     })
 *                    .onExpire(function () {
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

        /**
         * @param  {object} config - configuration object
         * @returns {$$TlCountdown} countdown - countdown
         */
        return function (config) {
            /*jshint newcap: false */
            return new $$TlCountdown(config);
        };
    })


    /**
     * @ngdoc service
     * @name truelab.countdown.service:$$TlCountdown
     *
     * @requires truelab.utils.lifecycle.service:$tlLifecycle
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
    .factory('$$TlCountdown', function ($tlLifecycle, $timeout, $log) {


        /**
         * $$TlCountdown
         * @param {Object} config - a configuration object
         * @constructor
         */
        function $$TlCountdown (config) {
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
             * {{@link truelab.utils.lifecycle.service:$tlLifecycle $tlLifecycle}} lifecycle
             */
            /*jshint newcap: false */
            self.$lifecycle = $tlLifecycle('firstStart', 'start', 'stop', 'expire', 'tick');
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
        $$TlCountdown.prototype.start  = function () {
            var self = this;

            if(self.$$expired === true) {

                $log.error('can\'t start expired countdown!');
                return;

            }

            if(self.$$running === false) {

                if(angular.isUndefined(self.$$stopped)) {

                    self.$lifecycle.execute('firstStart', self);
                    self.$lifecycle.execute('start', self, true);

                }else{

                    self.$lifecycle.execute('start', self, false);
                }



                self.$$tick();

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
        $$TlCountdown.prototype.stop = function () {
            var self = this;

            $timeout.cancel(self.$$stopped);
            self.$$running = false;
            self.$running  = false;

            self.$lifecycle.execute('stop', self);

        };

        /**
         * Execute a tick
         * @private
         */
        $$TlCountdown.prototype.$$tick = function () {
            var self = this;

            if(self.$seconds <= 0) {
                self.stop();
                return self.$$stopped;
            }

            self.$$running = true;
            self.$running = true;

            self.$$stopped = $timeout(function() {

                self.$$running = true;
                self.$running = true;

                self.$seconds--;

                if(self.$seconds <= 0) {

                    self.$lifecycle.execute('expire', self);

                    self.$$expired = true;
                    self.$expired  = true;
                    self.stop();

                    return self.$$stopped;
                }

                self.$lifecycle.execute('tick', self);

                self.$$tick();

            }, 1000);

            return self.$$stopped;
        };

        return $$TlCountdown;

    });

