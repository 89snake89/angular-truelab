'use strict';

/**
 * @ngdoc overview
 * @name truelab.loadImage
 * @description
 *
 * The `truelab.loadImage` module allow developers to load images like promises.
 *
 */
angular.module('truelab.loadImage', ['ng'])

    .factory('$$image', function ($window) {
        return $window.Image;
    })

   /**
    * @ngdoc service
    * @name truelab.loadImage.service:$tlLoadImage
    * @requires $timeout
    * @requires $q
    * @requires $$image
    * @description
    *
    * A service that allows developers to load images with promise interface
    *
    * @example
    * <doc:example module="truelab.loadImageApp">
    *     <doc:source>
    *        <script>
    *             angular
    *                  .module('truelab.loadImageApp', ['truelab.loadImage'])
    *                  .run(function ($tlLoadImage, $rootScope) {
    *                      $rootScope.load = function () {
    *                         $rootScope.loading = true;
    *                         $rootScope.image = undefined;
    *                         $rootScope.error = undefined;
    *                         $tlLoadImage
    *                              .load('http://anotherbloodyscienceblog.files.wordpress.com/2013/05/11.jpg', 1600)
    *                              .then(function (image) {
    *                                  $rootScope.image = image;
    *                               })
    *                               .catch(function () {
    *                                  $rootScope.error = 'error!';
    *                               })
    *                               .finally(function () {
    *                                  $rootScope.loading = false;
    *                               });
    *                      };
    *                  });
    *         </script>
    *         <div ng-show="loading">loading...</div>
    *         <div ng-show="error">{{ error }}</div>
    *         <div ng-show="image"><img ng-src="{{ image.src }}" /></div>
    *         <a class="btn btn-default" ng-click="load()">load</a>
    *
    *     </doc:source>
    * </doc:example>
    */
    .factory('$tlLoadImage', function ($timeout, $q, $$image) {

        return {
            /**
             *
             * @ngdoc function
             * @name $tlLoadImage#load
             * @methodOf truelab.loadImage.service:$tlLoadImage
             *
             *
             * @param {string} src   - image url/path
             * @param {int}    [delay] - a delay before resolve, reject (***optional***)
             *
             * @returns {promise} promise - promise
             */
            load : function (src, delay) {

                var self = this;

                var deferred = $q.defer(),
                    image = new $$image();

                image.onload = function () {
                    self.__fn(image, delay, deferred, 'resolve');
                };

                image.onerror = function () {
                    self.__fn(image, delay, deferred, 'reject');
                };

                image.src = src;

                // test stuff
                this.__image = image;

                return deferred.promise;
            },
            __fn : function (image, delay, deferred, method) {

                if(angular.isDefined(delay) && delay != 0) {

                    $timeout(function () {

                        deferred[method](image);

                    }, delay || 0);

                }else{

                    deferred[method](image);
                }
            },
            __image : undefined
        };
    })

    /**
     * @ngdoc object
     * @name truelab.loadImage.service:$tlLoadImageOptions
     *
     * @property {int} delay          - delay applied when loads images ```( default : 0 )```
     * @property {string} css.base    - base css class    ```(default : 'tl-load-image')```
     * @property {string} css.loading - loading css class ```(default : 'loading')```
     * @property {string} css.error   - error css class   ```(default : 'error')```
     *
     * @description
     * tlLoadImage directive default options, override this value to customize
     * all tlLoadImage directives.
     *
     * ```
     * {
     * delay : 0,
     *   css : {
     *     base : 'tl-load-image',
     *     loading : 'loading',
     *     error : 'error'
     *   }
     * }
     * ```
     */
    .value('$tlLoadImageOptions', {
        delay : 0,
        css : {
            base : 'tl-load-image',
            loading : 'loading',
            error : 'error'
        }
    })
    /**
     * @ngdoc directive
     * @name truelab.loadImage.directive:tlLoadImage
     * @requires truelab.loadImage.service:$tlLoadImage
     * @requires truelab.loadImage.service:$tlLoadImageOptions
     * @function
     *
     * @description
     * Append image only when is loaded, add css state classes on loading and on error
     * to control visualization
     *
     * @param {expression} tlLoadImage - the image src
     * @param {expression} tlLoadImageOptions - directive options
     *
     * @example
     * <doc:example module="truelab.loadImageApp">
     *     <doc:source>
     *        <script>
     *             angular
     *                  .module('truelab.loadImageApp', ['truelab.loadImage'])
     *                  .run(function ($rootScope) {
     *
     *                      $rootScope.i = 0;
     *                      $rootScope.data = [{
     *                          url : 'https://pbs.twimg.com/profile_images/2149314222/square.png',
     *                          alt : 'angularJS logo',
     *                          title : 'angularJS logo'
     *                      },
     *                      {
     *                          url : 'http://static.grayghostvisuals.com/imgblog/grunt.png',
     *                          alt : 'GruntJS Logo',
     *                          title : 'GruntJS Logo'
     *                      },
     *                      {
     *                          url : 'http://cordova.apache.org/images/cordova_bot.png',
     *                          alt  : 'Cordova Logo',
     *                          title : 'Cordova Logo'
     *                      }];
     *
     *                      $rootScope.next = function () {
     *                          $rootScope.i++;
     *                      };
     *
     *                      $rootScope.prev = function () {
     *                          $rootScope.i--;
     *                      };
     *                  });
     *         </script>
     *         <style>
     *             .tl-load-image {
     *                  max-width:200px;
     *                  min-height: 100px;
     *                  text-align:center;
     *                  margin: 0 auto;
     *             }
     *
     *             .tl-load-image.loading {
     *                  background : #333;
     *                  color : #fff;
     *             }
     *
     *              .tl-load-image.loading:before {
     *                  content : '...loading';
     *              }
     *
     *             .tl-load-image.loading img {
     *                  display: none;
     *             }
     *         </style>
     *         <div>
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="prev()"
     *                      ng-disabled="i <= 0"> previous </button>
     *
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="next()"
     *                      ng-disabled="i >= data.length - 1"> next </button>
     *         </div>
     *         <div tl-load-image="data[i].url"
     *              tl-load-image-options="{ delay : 1000 }"
     *              class="thumbnail">
     *              <img alt="{{ data[i].alt }}"
     *                   title="{{ data[i].title }}" />
     *         </div>
     *
     *         <hr><hr>
     *
     *         <div ng-repeat="image in data"
     *              tl-load-image="image.url"
     *              tl-load-image-options="{ delay : (($index + 1) * 2000) }" class="thumbnail">
     *         </div>
     *     </doc:source>
     * </doc:example>
     *
     *
     */
    .directive('tlLoadImage', function ($tlLoadImage, $tlLoadImageOptions) {

        function __copyAttributes($element, attributes) {
            angular.forEach(attributes, function(attr) {
                $element.attr(attr.name, attr.value);
            });
        }

        return {
            restrict : 'EA',
            replace : false,
            scope : true,
            link : function (scope, element, attrs) {
                var options        = scope.$eval(attrs.tlLoadImageOptions) || {},
                    $imageElement  = element.children('img'),
                    $imageElementAttributes = $imageElement.prop("attributes");

                options = angular.extend({}, $tlLoadImageOptions, options);

                element.addClass(options.css.base);
                element.children('img').remove();

                scope.$watch(attrs['tlLoadImageOptions'], function (val) {
                    if(angular.isObject(val)) {
                        options = angular.extend({}, $tlLoadImageOptions, val);
                    }
                });

                scope.$watch(attrs['tlLoadImage'], function (val) {

                    if(val) {

                        element
                            .removeClass(options.css.error)
                            .addClass(options.css.loading);


                        $tlLoadImage
                            .load(val, options.delay || 0)
                            .then(function (image) {

                                var $image = angular.element(image);
                                __copyAttributes($image, $imageElementAttributes);

                                if(element.children('img').length > 0 ) {

                                    element.children('img').replaceWith($image);

                                }else{

                                    element.append($image);
                                }

                            })
                            .catch(function () {
                                element.addClass(options.css.error);
                            })
                            .finally(function () {
                                element.removeClass(options.css.loading);
                            })
                    }
                });
            }
        }
    });


