/**
 * @name angular-truelab
 * @description angular-truelab - Truelab angular modules
 * @version v0.0.0 - 2014-06-30 19:26
 * @link http://truelab.github.io/angular-truelab
 * @license MIT License, http://www.opensource.org/licenses/MIT
 **/

;(function( window, angular, undefined ){
'use strict';

angular
    .module('truelab', [
        'truelab._',
        'truelab.loadImage',
        'truelab.debounce',
        'truelab.countdown',
        'truelab.strings.filters'
    ]);

/**
 * @ngdoc overview
 * @name truelab
 *
 * @requires truelab._
 * @requires truelab.loadImage
 * @requires truelab.debounce
 * @requires truelab.countdown
 * @requires truelab.strings.filters
 *
 * @description
 *
 * # truelab
 *
 * ## The main module for truelab
 * There are several sub-modules included with the truelab module, this module includes ALL sub-modules.
 *
 * The modules are:
 *
 *   -  {@link truelab._}
 *
 *   -  {@link truelab.loadImage}
 *
 *   -  {@link truelab.debounce}
 *
 *   -  {@link truelab.countdown}
 *
 *   -  {@link truelab.strings.filters}
 *
 * --------------
 *
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <script src="js/angular-truelab.min.js"></script>
 *   <script>
 *     // ...and add 'truelab' as a dependency
 *     var myApp = angular.module('myApp', ['truelab']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 *
 */


'use strict';

/**
 * @ngdoc overview
 * @name truelab._
 * @description
 *
 *
 * # truelab._
 *
 * The `truelab._` module simply wraps window._
 *
 * ### constants
 *
 *  - {@link truelab._.service:_ _}
 *
 * ------------
 *
 * This module requires ***lodash*** or ***underscore*** library.
 *
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/lodash.min.js"></script><!-- !!! lodash extra-dependency -->
 *
 *   <script src="js/angular.js"></script>
 *   <script src="js/angular-truelab.min.js"></script>
 *   <script>
 *     // ...and add 'truelab._' as a dependency
 *     var myApp = angular.module('myApp', ['truelab._']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular
    .module('truelab._', [])

    /**
     * @ngdoc service
     * @name truelab._.service:_
     * @kind constant
     * @description
     *
     * it provides access to lodash or underscore library like an injectable
     *
     * {@link http://lodash.com/}
     */
    .constant('_', window._);

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
            this.$$onStartFns = [];
            this.$$onStopFns = [];
            this.$$onExpireFns = [];
            this.$$onTickFns  = [];
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
     * @method sarcazzo - sarcazzo
     *
     * @description
     *
     * ***Private*** countdown service please see {@link truelab.countdown.service:$tlCountdown $tlCountdown}
     */
    .factory('$$TlCountdown', function ($$TlCountdownLifecycle, $timeout, $log) {

        /**
         * Execute all fns associated with countdown phase
         *
         * @param {TlCountdown} countdown - countdown instance
         * @param {string} phase - countdown event/phase {'onStart','onTick','onStop','onExpire'}
         * @private
         */
        function __executeLifecycleFns(countdown, phase) {
            var fns = countdown.$lifecycle['$$' + phase + 'Fns'];

            angular.forEach(fns, function (fn) {
                fn.call(countdown);
            });
        }

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
                    __executeLifecycleFns(countdown, 'onExpire');
                    countdown.$$expired = true;
                    countdown.$expired = true;
                    countdown.stop();
                    return;
                }

                __executeLifecycleFns(countdown, 'onTick');
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

                __executeLifecycleFns(self, 'onStart');
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

            __executeLifecycleFns(self, 'onStop');

        };

        return TlCountdown;

    });



'use strict';

/**
 * @ngdoc overview
 * @name truelab.debounce
 * @description
 *
 * # truelab.debounce
 *
 * The `truelab.debounce` module
 *
 *  ### directives
 *
 *  - {@link truelab.debounce.directive:tlDebounce tlDebounce}
 *
 */
angular
    .module('truelab.debounce', [])

    /**
     * @ngdoc directive
     * @name truelab.debounce.directive:tlDebounce
     * @function
     *
     * @description
     * Debounce ng-model change
     *
     * @element input
     *
     * @param {int} [tlDebounce=1000] - debounce delay in ms
     *
     * @example
     * <doc:example module="truelab.tlDebounceApp">
     *     <doc:source>
     *         <script>
     *             angular
     *                 .module('truelab.tlDebounceApp', ['truelab.debounce'])
     *                 .controller('TlDebounceAppController', function ($scope) {
     *                     $scope.data = {
     *                         text  : 'Hello world!',
     *                         text2 : 'Hello superman!',
     *                         text3 : 'Hello batman!',
     *                         delay : 5000
     *                     };
     *                 });
     *         </script>
     *
     *         <div ng-controller="TlDebounceAppController">
     *             <div class="row">
     *                 <div class="span8">
     *                     <h3>Default delay (1000ms)</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text"
     *                            tl-debounce>
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text</label>
     *                     <pre>{{ data.text | json }}</pre>
     *                 </div>
     *            </div>
     *
     *            <div class="row">
     *                 <div class="span8">
     *                     <h3>Delay like string (2500ms)</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text2"
     *                            tl-debounce="2500">
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text2</label>
     *                     <pre>{{ data.text2 | json }}</pre>
     *                 </div>
     *             </div>
     *
     *             <div class="row">
     *                 <div class="span8">
     *                     <h3>Delay dynamic $scope variable</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text3"
     *                            tl-debounce="data.delay">
     *                     <label>Debounce delay:</label>
     *                     <input type="number"
     *                            min="0"
     *                            ng-model="data.delay">
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text3</label>
     *                     <pre>{{ data.text3 | json }}</pre>
     *
     *                     <label>$scope.data.delay</label>
     *                     <pre>{{ data.delay | json }}</pre>
     *                 </div>
     *             </div>
     *
     *         </div>
     *     </doc:source>
     * </doc:example>
     **/
    .directive('tlDebounce', function ($timeout) {

        var options = {
            delay : 1000
        };

        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 99,
            link: function(scope, element, attrs, ngModelCtrl) {
                if (attrs.type === 'radio' || attrs.type === 'checkbox') { return; }

                element.unbind('input');

                var debounce, delay, delayEval;
                element.bind('input', function() {

                   delayEval = scope.$eval(attrs.tlDebounce);

                   if(delayEval) {
                       delay = delayEval;
                   }else if(delayEval === 0 || delayEval === '0'){
                       delay = delayEval;
                   }else{
                       delay = options.delay;
                   }

                   $timeout.cancel(debounce);

                   if(delay) {
                       debounce = $timeout( function() {
                           scope.$apply(function() {
                               ngModelCtrl.$setViewValue(element.val());
                           });
                       }, delay);
                   }else{
                       scope.$apply(function() {
                           ngModelCtrl.$setViewValue(element.val());
                       });
                   }

                });

                element.bind('blur', function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(element.val());
                    });
                });
            }
        };
    });

'use strict';



/**
 * @ngdoc overview
 * @name truelab.events
 * @description
 *
 * # truelab.events
 *
 * The `truelab.events` module
 *
 * ### directives
 *
 *  - {@link truelab.events.directive:tlClickout tlClickout}
 *  - {@link truelab.events.directive:tlFocusout tlFocusout}
 *  - {@link truelab.events.directive:tlFocusin tlFocusin}
 *
 * ------------
 *
 * This module requires ***jQuery*** library.
 *
 *
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/jquery.min.js"></script><!-- !!! jQuery extra-dependency -->
 *
 *   <script src="js/angular.js"></script>
 *   <script src="js/angular-truelab.min.js"></script>
 *   <script>
 *     // ...and add 'truelab._' as a dependency
 *     var myApp = angular.module('myApp', ['truelab.events']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */

/**
 * @ngdoc directive
 * @name truelab.events.directive:tlFocusin
 * @description
 *
 * The tlFocusin directive allows you to specify custom behavior on element focus in.
 *
 * @param {expression} tlFocusin Expression to evaluate upon focus in. (Event object is available as $event)
 *
 * @example
 *
 * <doc:example module="truelab.tlFocusinApp">
 *     <doc:source>
 *         <script>
 *             angular.module('truelab.tlFocusinApp', ['truelab.events']);
 *         </script>
 *         <input type="text" tl-focusin="counter = counter + 1" ng-init="counter = 0" placeholder="Focus in please..">
 *         <p>counter : {{ counter }}</p>
 *     </doc:source>
 * </doc:example>
 */


/**
 * @ngdoc directive
 * @name truelab.events.directive:tlFocusout
 * @description
 *
 * The tlFocusout directive allows you to specify custom behavior on element focus out.
 *
 * @param {expression} tlFocusout Expression to evaluate upon focus out. (Event object is available as $event)
 *
 * @example
 * <doc:example module="truelab.tlFocusoutApp">
 *     <doc:source>
 *         <script>
 *             angular.module('truelab.tlFocusoutApp', ['truelab.events']);
 *         </script>
 *         <input type="text" tl-focusout="counter = counter - 1" ng-init="counter = 100" placeholder="Focus out please..">
 *         <p>counter : {{ counter }}</p>
 *     </doc:source>
 * </doc:example>
 */

(function (ngModule) {

    var EVENTS = ['focusin','focusout'];

    var eventDirectiveFactory = function (event) {

        var name = 'tl' + ( event.charAt(0).toUpperCase() + event.slice(1) );

        return {
            name : name,
            declaration : ['$parse', function ($parse) {
                return function (scope, element, attrs) {
                    var fn = $parse(attrs[name]);
                    element.bind(event, function (e) {
                        scope.$apply(function() {
                            fn(scope, {$event: e });
                        });
                    });
                };
            }]
        };

    };

    angular.forEach(EVENTS, function (e) {
        var d = eventDirectiveFactory(e);
        ngModule.directive(d.name, d.declaration);
    });


    /**
     * @ngdoc directive
     * @name truelab.events.directive:tlClickout
     * @description
     *
     * The tlClickout directive allows you to specify custom behavior on element click out.
     *
     * This directive requires ***jQuery*** library.
     *
     * @param {expression} tlClickout Expression to evaluate upon click out. (Event object is available as $event)
     *
     * @example
     * <doc:example module="truelab.tlClickoutApp">
     *     <doc:source>
     *         <script>
     *             angular.module('truelab.tlClickoutApp', ['truelab.events']);
     *         </script>
     *         <style>
     *             div[tl-clickout] {
     *                 padding:20px;
     *                 height: 200px;
     *                 background: blue;
     *                 color:#fff;
     *             }
     *         </style>
     *         <div tl-clickout="counter = counter + 1" ng-init="counter = 0">
     *             Please click this element and the click outside...
     *         </div>
     *
     *         <p>counter : {{ counter }}</p>
     *     </doc:source>
     * </doc:example>
     */
    ngModule.directive('tlClickout',['$parse', function ($parse) {

        function bind(fn) {
            angular
                .element('body')
                .bind('click', fn);
        }

        function unbind(fn) {
            angular
                .element('body')
                .unbind('click', fn);
        }

        return function (scope, element, attrs) {

            var fn = $parse(attrs.tlClickout),
                clicked = false,
                bindFn  = function (event) {
                    var target = angular.element(event.target);

                    if(!target.closest(element).length) {

                        if(clicked === true ) {

                            clicked = false;
                            unbind(bindFn);
                            scope.$apply(function() {
                                fn(scope, {$event: event });
                            });
                        }
                    }
                };


            element.bind('click', function () {
                clicked = true;
                bind(bindFn);
            });
        };
    }]);


})(angular.module('truelab.events', []));

'use strict';

/**
 * @ngdoc overview
 * @name truelab.loadImage
 * @description
 *
 * # truelab.loadImage
 *
 * The `truelab.loadImage` module allow developers to load images like promises.
 *
 * ### directives
 *
 *  - {@link truelab.loadImage.directive:tlLoadImage tlLoadImage}
 *
 * ### services
 *
 *  - {@link truelab.loadImage.service:$tlLoadImage $tlLoadImage}
 *
 */
angular.module('truelab.loadImage', ['ng'])

    /**
     * @ngdoc service
     * @name truelab.loadImage.service:$$image
     *
     * @description
     * ***Private*** service (note '$$' prefix) that wraps Image object constructor.
     */
    .factory('$$image', function () {
        return {
            /**
             *
             * @ngdoc function
             * @name $$image#$new
             * @methodOf truelab.loadImage.service:$$image
             *
             * @returns {HTMLImageElement} image - new window.Image object
             */
            $new : function () {
                return new window.Image();
            }
        };
    })

   /**
    * @ngdoc service
    * @name truelab.loadImage.service:$tlLoadImage
    * @requires $timeout
    * @requires $q
    * @requires $$image
    * @description
    *
    * A service that allows developers to load images with promise interface
    *
    * @example
    * <doc:example module="truelab.loadImageApp">
    *     <doc:source>
    *        <script>
    *             angular
    *                  .module('truelab.loadImageApp', ['truelab.loadImage'])
    *                  .run(function ($tlLoadImage, $rootScope) {
    *                      $rootScope.load = function () {
    *                         $rootScope.loading = true;
    *                         $rootScope.image = undefined;
    *                         $rootScope.error = undefined;
    *                         $tlLoadImage
    *                              .load('http://cordova.apache.org/images/cordova_bot.png', 1600)
    *                              .then(function (image) {
    *                                  $rootScope.image = image;
    *                               })
    *                               .catch(function () {
    *                                  $rootScope.error = 'error!';
    *                               })
    *                               .finally(function () {
    *                                  $rootScope.loading = false;
    *                               });
    *                      };
    *                  });
    *         </script>
    *         <style>
    *             .tl-load-image {
    *                  width:200px;
    *                  height: 200px;
    *                  text-align:center;
    *                  margin: 0 auto;
    *                  overflow:hidden;
    *             }
    *         </style>
    *         <a class="btn btn-default" ng-click="load()">load</a>
    *
    *         <div ng-show="loading">loading...</div>
    *         <div ng-show="error">{{ error }}</div>
    *         <div ng-show="image" class="tl-load-image"><img ng-src="{{ image.src }}" class="thumbnail"/></div>
    *
    *     </doc:source>
    * </doc:example>
    */
    .factory('$tlLoadImage', function ($timeout, $q, $$image) {

        return {
            /**
             *
             * @ngdoc function
             * @name $tlLoadImage#load
             * @methodOf truelab.loadImage.service:$tlLoadImage
             *
             *
             * @param {string} src     - image url/path
             * @param {int}    [delay] - a delay before resolve, reject
             *
             * @returns {promise} promise - promise
             */
            load : function (src, delay) {

                var self = this;

                var deferred = $q.defer(),
                    image = $$image.$new();

                image.onload = function () {
                    self.__fn(image, delay, deferred, 'resolve');
                };

                image.onerror = function () {
                    self.__fn(image, delay, deferred, 'reject');
                };

                image.src = src;

                return deferred.promise;
            },
            loadAll : function (srcs) {
                var promises = [],
                    self = this;
                angular.forEach(srcs, function (src) {
                     promises.push(self.load(src));
                });

                return $q.all(promises);
            },
            __fn : function (image, delay, deferred, method) {

                if(angular.isDefined(delay) && delay !== 0) {

                    $timeout(function () {

                        deferred[method](image);

                    }, delay || 0);

                }else{

                    deferred[method](image);
                }
            }
        };
    })

    /**
     * @ngdoc service
     * @name truelab.loadImage.service:$tlLoadImageOptions
     *
     * @property {int}    [delay=0]                   - delay applied when loads images
     * @property {string} [css.base='tl-load-image'] - base css class
     * @property {string} [css.loading='loading']     - loading css class
     * @property {string} [css.error='error']         - error css class
     *
     * @description
     * tlLoadImage directive default options, override this value to customize
     * all tlLoadImage directives.
     *
     * ### Default object
     * ```javascript
     * {
     *   delay : 0,
     *   css : {
     *     base : 'tl-load-image',
     *     loading : 'loading',
     *     error : 'error'
     *   }
     * }
     * ```
     */
    .value('$tlLoadImageOptions', {
        delay : 0,
        css : {
            base : 'tl-load-image',
            loading : 'loading',
            error : 'error'
        }
    })
    /**
     * @ngdoc directive
     * @name truelab.loadImage.directive:tlLoadImage
     * @requires truelab.loadImage.service:$tlLoadImage
     * @requires truelab.loadImage.service:$tlLoadImageOptions
     * @function
     *
     * @description
     * Append image only when is loaded, add css state classes on loading and on error
     * to control visualization
     *
     * @param {string} tlLoadImage - the image src
     * @param {string} [tlLoadImageOptions=$tlLoadImageOptions] - an object for directive options {@link truelab.loadImage.service:$tlLoadImageOptions}
     *
     * @example
     * <doc:example module="truelab.loadImageApp">
     *     <doc:source>
     *        <script>
     *             angular
     *                  .module('truelab.loadImageApp', ['truelab.loadImage'])
     *                  .run(function ($rootScope) {
     *
     *                      $rootScope.i = 0;
     *                      $rootScope.options = {
     *                          delay : 200,
     *                          eventId : 'myImage'
     *                      };
     *                      $rootScope.data = [{
     *                          url : 'https://pbs.twimg.com/profile_images/2149314222/square.png',
     *                          alt : 'angularJS logo',
     *                          title : 'angularJS logo'
     *                      },
     *                      {
     *                          url : 'http://static.grayghostvisuals.com/imgblog/grunt.png',
     *                          alt : 'GruntJS Logo',
     *                          title : 'GruntJS Logo'
     *                      },
     *                      {
     *                          url : 'http://cordova.apache.org/images/cordova_bot.png',
     *                          alt  : 'Cordova Logo',
     *                          title : 'Cordova Logo'
     *                      }];
     *
     *                      $rootScope.next = function () {
     *                          $rootScope.i++;
     *                      };
     *
     *                      $rootScope.prev = function () {
     *                          $rootScope.i--;
     *                      };
     *
     *                      $rootScope.$on('tlLoadImage:pending:myImage', function () {
     *                          $rootScope.pending = true;
     *                      });
     *
     *                      $rootScope.$on('tlLoadImage:finally:myImage', function () {
     *                          $rootScope.pending = false;
     *                      });
     *                  });
     *         </script>
     *         <style>
     *             .tl-load-image {
     *                  width:200px;
     *                  height: 200px;
     *                  text-align:center;
     *                  margin: 0 auto;
     *                  overflow:hidden;
     *             }
     *
     *             .tl-load-image.loading {
     *                  background : #333;
     *                  color : #fff;
     *             }
     *
     *              .tl-load-image.loading:before {
     *                  content : '...loading';
     *              }
     *
     *             .tl-load-image.loading img {
     *                  display: none;
     *             }
     *         </style>
     *         <div>
     *              <div class="form-group">
     *                 <label> Delay : </label>
     *                 <input type="number" ng-model="options.delay" class="form-control">
     *              </div>
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="prev()"
     *                      ng-disabled="i <= 0 || pending === true "> previous </button>
     *
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="next()"
     *                      ng-disabled="i >= data.length - 1 || pending === true"> next </button>
     *
     *
     *         </div>
     *         <div tl-load-image="data[i].url"
     *              tl-load-image-options="options"
     *              class="thumbnail">
     *              <img alt="{{ data[i].alt }}"
     *                   title="{{ data[i].title }}" />
     *         </div>
     *
     *         <hr><hr>
     *
     *         <div ng-repeat="image in data"
     *              tl-load-image="image.url"
     *              tl-load-image-options="{ delay : (($index + 1) * 2000) }" class="thumbnail">
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     *
     */
    .directive('tlLoadImage', function ($tlLoadImage, $tlLoadImageOptions) {

        /**
         * @param $from
         * @param $to
         * @private
         */
        function __copyAttributes($from, $to, exclude) {
            angular.forEach($from.prop('attributes'), function(attr) {
                if(angular.isArray(exclude)) {
                    if( exclude.indexOf(attr.name) < 0 ) {
                        $to.attr(attr.name, attr.value);
                    }
                }else{
                    $to.attr(attr.name, attr.value);
                }

            });
        }

        /**
         * @param   {string} event
         * @param   {string} optionsEventId
         * @returns {string}
         * @private
         */
        function __eventName(event, optionsEventId) {
            return ('tlLoadImage:' + event ) + (optionsEventId ? ':' + optionsEventId : '');
        }

        return {
            restrict : 'EA',
            replace : false,
            scope : true,
            link : function (scope, element, attrs) {
                var options        = scope.$eval(attrs.tlLoadImageOptions) || {},
                    $imageElement  = element.children('img');


                options = angular.extend({}, $tlLoadImageOptions, options);

                element.addClass(options.css.base);
                element.children('img').remove();

                scope.$watch(attrs.tlLoadImageOptions, function (val) {
                    if(angular.isObject(val)) {
                        options = angular.extend({}, $tlLoadImageOptions, val);
                    }
                }, true);

                scope.$watch(attrs.tlLoadImage, function (val) {

                    if(val) {

                        scope.$emit(__eventName('pending', options.eventId));

                        element
                            .removeClass(options.css.error)
                            .addClass(options.css.loading);


                        $tlLoadImage
                            .load(val, options.delay || 0)
                            .then(function (image) {

                                var $image = angular.element(image);

                                __copyAttributes($imageElement, $image, ['src','ng-src','tl-load-image']);

                                if(element.children('img').length > 0 ) {

                                    element.children('img').replaceWith($image);

                                }else{

                                    element.append($image);
                                }

                            })
                            .catch(function () {
                                element.addClass(options.css.error);
                            })
                            .finally(function () {
                                element.removeClass(options.css.loading);
                                scope.$emit(__eventName('finally', options.eventId));
                            });
                    }

                });
            }
        };
    });



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




}(window, angular));