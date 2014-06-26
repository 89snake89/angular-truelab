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

    /**
     * @ngdoc service
     * @name truelab.loadImage.service:$$image
     *
     * @description
     * This a private service (note '$$' prefix) that wraps Image object constructor.
     */
    .factory('$$image', function () {
        return {
            /**
             *
             * @ngdoc function
             * @name $$image#$new
             * @methodOf truelab.loadImage.service:$$image
             *
             * @returns {HTMLImageElement} image - new window.Image object
             */
            $new : function () {
                return new window.Image();
            }
        };
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
    *                              .load('http://cordova.apache.org/images/cordova_bot.png', 1600)
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
    *         <style>
    *             .tl-load-image {
    *                  width:200px;
    *                  height: 200px;
    *                  text-align:center;
    *                  margin: 0 auto;
    *                  overflow:hidden;
    *             }
    *         </style>
    *         <a class="btn btn-default" ng-click="load()">load</a>
    *
    *         <div ng-show="loading">loading...</div>
    *         <div ng-show="error">{{ error }}</div>
    *         <div ng-show="image" class="tl-load-image"><img ng-src="{{ image.src }}" class="thumbnail"/></div>
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
                    image = $$image.$new();

                image.onload = function () {
                    self.__fn(image, delay, deferred, 'resolve');
                };

                image.onerror = function () {
                    self.__fn(image, delay, deferred, 'reject');
                };

                image.src = src;

                return deferred.promise;
            },
            loadAll : function (srcs) {
                var promises = [],
                    self = this;
                angular.forEach(srcs, function (src) {
                     promises.push(self.load(src));
                });

                return $q.all(promises);
            },
            __fn : function (image, delay, deferred, method) {

                if(angular.isDefined(delay) && delay !== 0) {

                    $timeout(function () {

                        deferred[method](image);

                    }, delay || 0);

                }else{

                    deferred[method](image);
                }
            }
        };
    })

    /**
     * @ngdoc service
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
     * ### Default object
     * ```javascript
     * {
     *   delay : 0,
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
     * @param {string} tlLoadImage - the image src
     * @param {string} tlLoadImageOptions - an object for directive options
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
     *                      $rootScope.options = {
     *                          delay : 200,
     *                          eventId : 'myImage'
     *                      };
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
     *
     *                      $rootScope.$on('tlLoadImage:pending:myImage', function () {
     *                          $rootScope.pending = true;
     *                      });
     *
     *                      $rootScope.$on('tlLoadImage:finally:myImage', function () {
     *                          $rootScope.pending = false;
     *                      });
     *                  });
     *         </script>
     *         <style>
     *             .tl-load-image {
     *                  width:200px;
     *                  height: 200px;
     *                  text-align:center;
     *                  margin: 0 auto;
     *                  overflow:hidden;
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
     *              <div class="form-group">
     *                 <label> Delay : </label>
     *                 <input type="number" ng-model="options.delay" class="form-control">
     *              </div>
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="prev()"
     *                      ng-disabled="i <= 0 || pending === true "> previous </button>
     *
     *              <button type="button"
     *                      class="btn btn-default"
     *                      ng-click="next()"
     *                      ng-disabled="i >= data.length - 1 || pending === true"> next </button>
     *
     *
     *         </div>
     *         <div tl-load-image="data[i].url"
     *              tl-load-image-options="options"
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

        /**
         * @param $from
         * @param $to
         * @private
         */
        function __copyAttributes($from, $to, exclude) {
            angular.forEach($from.prop('attributes'), function(attr) {
                if(angular.isArray(exclude)) {
                    if( exclude.indexOf(attr.name) < 0 ) {
                        $to.attr(attr.name, attr.value);
                    }
                }else{
                    $to.attr(attr.name, attr.value);
                }

            });
        }

        /**
         * @param   {string} event
         * @param   {string} optionsEventId
         * @returns {string}
         * @private
         */
        function __eventName(event, optionsEventId) {
            return ('tlLoadImage:' + event ) + (optionsEventId ? ':' + optionsEventId : '');
        }

        return {
            restrict : 'EA',
            replace : false,
            scope : true,
            link : function (scope, element, attrs) {
                var options        = scope.$eval(attrs.tlLoadImageOptions) || {},
                    $imageElement  = element.children('img');


                options = angular.extend({}, $tlLoadImageOptions, options);

                element.addClass(options.css.base);
                element.children('img').remove();

                scope.$watch(attrs.tlLoadImageOptions, function (val) {
                    if(angular.isObject(val)) {
                        options = angular.extend({}, $tlLoadImageOptions, val);
                    }
                }, true);

                scope.$watch(attrs.tlLoadImage, function (val) {

                    if(val) {

                        scope.$emit(__eventName('pending', options.eventId));

                        element
                            .removeClass(options.css.error)
                            .addClass(options.css.loading);


                        $tlLoadImage
                            .load(val, options.delay || 0)
                            .then(function (image) {

                                var $image = angular.element(image);

                                __copyAttributes($imageElement, $image, ['src','ng-src','tl-load-image']);

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
                                scope.$emit(__eventName('finally', options.eventId));
                            });
                    }

                });
            }
        };
    });


