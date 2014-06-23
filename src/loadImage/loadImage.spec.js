'use strict';

describe('truelab.loadImage', function () {

    describe('$tlLoadImage', function () {

        var $tlLoadImage, $timeoutMock, $rootScope,
            $$imageMock = function () {};

            $$imageMock.prototype = {
                src : undefined,
                onload : angular.noop,
                onerror : angular.noop,
                flush : function (error) {
                    if(error) {
                        this.onerror.call(this);
                    }else{
                        this.onload.call(this);
                    }
                }
            };

        beforeEach(module('truelab.loadImage'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('$$image', $$imageMock);
            });
        });

        beforeEach(inject(function (_$tlLoadImage_, _$timeout_, _$rootScope_) {
            $tlLoadImage = _$tlLoadImage_;
            $timeoutMock = _$timeout_;
            $rootScope = _$rootScope_.$new();
        }));

        it('should load an image', function () {
            expect($tlLoadImage.load).toBeDefined();
            var image;


            expect(image).not.toBeDefined();

            $tlLoadImage
                .load('http://www.picturesnew.com/media/images/image-background.jpg')
                .then(function (i) {
                    image = i;
                });

            $tlLoadImage.__image.flush();
            $rootScope.$digest();

            expect(image).toBeDefined();
            expect(image.src).toBe('http://www.picturesnew.com/media/images/image-background.jpg');
        });

        it('should catch on load image error', function () {

            var resolved, rejected;

            $tlLoadImage
                .load('http://www.picturesnew.com/media/images/image-background.jpg')
                .then(function (i) {
                    resolved = i;
                })
                .catch(function (i) {
                    rejected = i;
                });

            $tlLoadImage.__image.flush(true);
            $rootScope.$digest();

            expect(resolved).not.toBeDefined();

            expect(rejected).toBeDefined();
            expect(rejected.src).toBe('http://www.picturesnew.com/media/images/image-background.jpg');
        });

        it('it use $timeout when delay param', function () {

            var resolved;

            $tlLoadImage
                .load('http://www.picturesnew.com/media/images/image-background.jpg', 1000)
                .then(function (i) {
                    resolved = i;
                });

            $tlLoadImage.__image.flush();
            $timeoutMock.flush();
            $rootScope.$digest(); // flush $q

            expect(resolved).toBeDefined();
            expect(resolved.src).toBe('http://www.picturesnew.com/media/images/image-background.jpg');
        });

    });

});



