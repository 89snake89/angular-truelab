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
 * Packs all submodules truelab._, truelab.loadImage, ecc..
 */
angular
    .module('truelab', [
        'truelab._',
        'truelab.loadImage',
        'truelab.debounce'
    ]);

