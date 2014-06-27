'use strict';

/**
 * @ngdoc overview
 * @name truelab.debounce
 * @description
 *
 * # truelab.debounce
 *
 * The `truelab.debounce` module
 *
 */
angular
    .module('truelab.debounce', [])

    /**
     * @ngdoc directive
     * @name truelab.debounce.directive:debounce
     * @function
     *
     * @description
     * Debounce ng-model change
     *
     * @element input
     *
     * @param {int} [tlDebounce=1000] - debounce delay in ms
     *
     * @example
     * <doc:example module="truelab.tlDebounceApp">
     *     <doc:source>
     *         <script>
     *             angular
     *                 .module('truelab.tlDebounceApp', ['truelab.debounce'])
     *                 .controller('TlDebounceAppController', function ($scope) {
     *                     $scope.data = {
     *                         text  : 'Hello world!',
     *                         text2 : 'Hello superman!',
     *                         text3 : 'Hello batman!',
     *                         delay : 5000
     *                     };
     *                 });
     *         </script>
     *
     *         <div ng-controller="TlDebounceAppController">
     *             <div class="row">
     *                 <div class="span8">
     *                     <h3>Default delay (1000ms)</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text"
     *                            tl-debounce>
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text</label>
     *                     <pre>{{ data.text | json }}</pre>
     *                 </div>
     *            </div>
     *
     *            <div class="row">
     *                 <div class="span8">
     *                     <h3>Delay like string (2500ms)</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text2"
     *                            tl-debounce="2500">
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text2</label>
     *                     <pre>{{ data.text2 | json }}</pre>
     *                 </div>
     *             </div>
     *
     *             <div class="row">
     *                 <div class="span8">
     *                     <h3>Delay dynamic $scope variable</h3>
     *                 </div>
     *                 <div class="span4">
     *                     <label>Text</label>
     *                     <input type="text"
     *                            placeholder="Write some text..."
     *                            ng-model="data.text3"
     *                            tl-debounce="data.delay">
     *                     <label>Debounce delay:</label>
     *                     <input type="number"
     *                            min="0"
     *                            ng-model="data.delay">
     *                 </div>
     *                 <div class="span4">
     *                     <label>$scope.data.text3</label>
     *                     <pre>{{ data.text3 | json }}</pre>
     *
     *                     <label>$scope.data.delay</label>
     *                     <pre>{{ data.delay | json }}</pre>
     *                 </div>
     *             </div>
     *
     *         </div>
     *     </doc:source>
     * </doc:example>
     **/
    .directive('tlDebounce', function ($timeout) {

        var options = {
            delay : 1000
        };

        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 99,
            link: function(scope, element, attrs, ngModelCtrl) {
                if (attrs.type === 'radio' || attrs.type === 'checkbox') { return; }

                element.unbind('input');

                var debounce, delay, delayEval;
                element.bind('input', function() {

                   delayEval = scope.$eval(attrs.tlDebounce);

                   if(delayEval) {
                       delay = delayEval;
                   }else if(delayEval === 0 || delayEval === '0'){
                       delay = delayEval;
                   }else{
                       delay = options.delay;
                   }

                   $timeout.cancel(debounce);

                   if(delay) {
                       debounce = $timeout( function() {
                           scope.$apply(function() {
                               ngModelCtrl.$setViewValue(element.val());
                           });
                       }, delay);
                   }else{
                       scope.$apply(function() {
                           ngModelCtrl.$setViewValue(element.val());
                       });
                   }

                });

                element.bind('blur', function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(element.val());
                    });
                });
            }
        };
    });
