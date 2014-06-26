'use strict';

/**
 * @ngdoc overview
 * @name truelab
 *
 * @description
 *
 * # Angular truelab module
 * ---------------------------------
 *
 * pack all submodules truelab._, truelab.loadImage, ecc..
 */
angular
    .module('truelab', [
        'truelab._',
        'truelab.loadImage',
        'truelab.debounce'
    ]);

