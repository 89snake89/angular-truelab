'use strict';

describe('truelab.loadImage', function () {

    describe('$tlLoadImage', function () {

        var $tlLoadImage, $timeout, $rootScope, $$image;

        beforeEach(module('truelab.loadImage'));
        beforeEach(module('truelab.loadImage.mock'));


        beforeEach(inject(function (_$tlLoadImage_, _$timeout_, _$rootScope_, _$$image_) {
            $tlLoadImage = _$tlLoadImage_;
            $timeout = _$timeout_;
            $rootScope = _$rootScope_.$new();
            $$image = _$$image_;
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

            $$image.flush();
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

            $$image.flush(true);
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

            $$image.flush();
            $timeout.flush();
            $rootScope.$digest(); // flush $q

            expect(resolved).toBeDefined();
            expect(resolved.src).toBe('http://www.picturesnew.com/media/images/image-background.jpg');
        });

    });

    // FIXME : ASYNC TEST FAILS
    describe('tlLoadImage directive', function () {
        var html = '<div tl-load-image="src" tl-load-image-options="options"><img title="{{ title }}" class="my-class"></div>',
            $compile, $rootScope,  $tlLoadImage, $timeoutMock, element, title = 'test',
            src = 'http://www.picturesnew.com/media/images/image-background.jpg',
            options = {
                delay : 3000,
                css : {
                    loading : 'my-loading',
                    error   : 'my-error'
                }
            };

        // TODO - move to test utils
        var compileElement = function (html, scope) {
            var el = $compile(html)(scope);
            scope.$digest();
            return el;
        };

        beforeEach(module('truelab.loadImage'));


        beforeEach(inject(function (_$tlLoadImage_, _$timeout_, _$rootScope_, _$compile_) {
            $tlLoadImage = _$tlLoadImage_;
            $timeoutMock = _$timeout_;
            $rootScope = _$rootScope_.$new();
            $compile = _$compile_;

            $rootScope.src = src;
            $rootScope.options = options;
            $rootScope.title = title;
            element = compileElement(html, $rootScope);
        }));


        it('it should append img element when image is loaded', function () {

            runs(function () {
                expect(element.hasClass(options.css.loading)).toBe(true);
                expect(element.html()).toBe('');
            });

            waits(4000); // wait window.Image loads

            runs(function () {
                $timeoutMock.flush();
                $rootScope.$digest(); // flush $q
            });

            runs(function () {
                expect(element.hasClass(options.css.loading)).toBe(false);
                expect(element.find('img').attr('src')).toBe(src);
            });
        });

        it('it should append/replace img element when image is loaded with correct img tag "compiled" attributes', function () {

            runs(function () {
                expect(element.hasClass(options.css.loading)).toBe(true);
                expect(element.html()).toBe('');
            });

            waits(4000);

            runs(function () {
                $timeoutMock.flush();
                $rootScope.$digest(); // flush $q
            });

            runs(function () {
                expect(element.hasClass(options.css.loading)).toBe(false);
                expect(element.find('img').attr('src')).toBe(src);
                expect(element.find('img').attr('title')).toBe(title);
                expect(element.find('img').attr('class')).toBe('my-class');
            });
        });

    });

});



