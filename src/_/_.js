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
