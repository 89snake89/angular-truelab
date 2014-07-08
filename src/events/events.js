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
    ngModule.directive('tlClickout', function ($parse) {

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
    });


})(angular.module('truelab.events', []));
