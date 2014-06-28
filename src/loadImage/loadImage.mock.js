'use strict';

/**
 * @ngdoc overview
 * @name truelab.loadImage.mock
 * @description
 *
 * # truelab.loadImage.mock
 * Mock implementation of {@link api/truelab.loadImage truelab.loadImage} module
 *
 */
angular
    .module('truelab.loadImage.mock', [])

    /**
     * @ngdoc service
     * @name truelab.loadImage.mock.service:$$image
     *
     * @description
     * Mock implementation of {@link api/truelab.loadImage.service:$$image truelab.loadImage.$$image}
     */
    .factory('$$image', function () {

        var ImageMock = function () {};

        ImageMock.prototype = {
            src : undefined,
            onload : angular.noop,
            onerror : angular.noop
        };

        return {
            /**
             * @ngdoc property
             * @name $$image#$$images
             * @propertyOf truelab.loadImage.mock.service:$$image
             *
             * @description
             * Array of images instantiated using {@link truelab.loadImage.mock.service:$$image#methods_$new $$image.$new }.
             */
            $$images : [],
            /**
             * @ngdoc function
             * @name $$image#$new
             * @methodOf truelab.loadImage.mock.service:$$image
             * @returns {$$imageMock} $$imageMock - new $$imageMock()
             */
            $new : function () {
                var image = new ImageMock();
                this.$$images.push(image);
                return image;
            },
            /**
             * @ngdoc function
             * @name $$image#flush
             * @methodOf truelab.loadImage.mock.service:$$image
             *
             * @description
             * Flush pending images
             *
             * @param {boolean} [n=1] - flush for n
             * @param {boolean} [error=undefined] - if true flush by calling onerror callback, if false or undefined
             * flush by calling onload callback
             */
            flush : function (n, error) {
                var image;

                for(var i = 0; i < ( n || 1 ); i++) {

                    image = this.$$images.shift();

                    if(error) {
                        image.onerror.call(image);
                    }else{
                        image.onload.call(image);
                    }
                }

            },
            /**
             * @ngdoc function
             * @name $$image#reset
             * @methodOf truelab.loadImage.mock.service:$$image
             *
             * @description
             *
             * Reset mock service
             */
            reset : function () {
                var self = this;
                self.$$images = [];
            }
        };
    });


