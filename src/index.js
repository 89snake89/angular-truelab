'use strict';

angular
    .module('truelab', [
        'truelab._',
        'truelab.loadImage',
        'truelab.debounce',
        'truelab.countdown',
        'truelab.strings'
    ]);

/**
 * @ngdoc overview
 * @name truelab
 *
 * @requires truelab._
 * @requires truelab.loadImage
 * @requires truelab.debounce
 * @requires truelab.countdown
 * @requires truelab.strings
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
 *   -  {@link truelab.strings}
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

