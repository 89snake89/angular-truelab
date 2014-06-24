
angular
    .module('truelab.loadImage.mock', [])

    /**
     * @ngdoc service
     * @name truelab.loadImage.mock.service:$$image
     *
     * @description
     * Mock implementation of {@link truelab.loadImage.service:$$image}
     */
    .factory('$$image', function () {

        var $$imageMock = function () {};

        $$imageMock.prototype = {
            src : undefined,
            onload : angular.noop,
            onerror : angular.noop
        };

        return {
            /**
             * @ngdoc function
             * @name $$image#$new
             * @methodOf truelab.loadImage.mock.service:$$image
             * @returns {$$imageMock} $$imageMock - new $$imageMock()
             */
            $new : function () {
                var image = new $$imageMock();
                this.$$images.push(image);
                return image;
            },
            /**
             * @ngdoc function
             * @name $$image#flush
             * @methodOf truelab.loadImage.mock.service:$$image
             *
             * @param {boolean} error - if true flush by calling onerror callback, if false or undefined
             * flush by calling onload callback
             */
            flush : function (error) {
                var image = this.$$images.shift();

                if(error) {
                    image.onerror.call(image);
                }else{
                    image.onload.call(image);
                }
            },
            /**
             * @ngdoc property
             * @name $$image#$$images
             * @propertyOf truelab.loadImage.mock.service:$$image
             *
             * @description
             * Array of images instantiated using {@link truelab.loadImage.mock.service:$$image#$new}.
             */
            $$images : []
        }
    })


