
/**
 * @ngdoc overview
 * @name truelab._
 * @description
 *
 * # truelab._
 *
 * The `truelab._` module simply wraps window._
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
     * ***constant***.
     * {@link http://lodash.com/}
     */
    .constant('_', window._);
