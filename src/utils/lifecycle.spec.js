'use strict';

describe('truelab.utils.lifecycle', function () {

    var $tlLifecycle;

    beforeEach(module('truelab.utils.lifecycle'));

    beforeEach(inject(function (_$tlLifecycle_) {
        $tlLifecycle = _$tlLifecycle_;
    }));

    it('should load the module', function () {
        expect($tlLifecycle).toBeFunction();
    });

    describe('$tlLifecycle', function () {
        var lifecycle1;

        /**
         * @property {function} onBorn
         * @property {function} onDie
         */
        var lifecycle2;

        it('Should create a new lifecycle object', function () {
            lifecycle1 = $tlLifecycle('start','stop','expire','tick');

            lifecycle2 = $tlLifecycle('born','die');

            expect(lifecycle2.onBorn).toBeFunction();
            expect(lifecycle2.onDie).toBeFunction();
        });

        describe('lifecycle instance object', function () {

            /**
             * @property {function} onStart
             * @property {function} onStop
             * @property {function} onTick
             * @property {function} onExpire
             *
             * @property {function} clearOnStart
             * @property {function} clearOnStop
             * @property {function} clearOnTick
             * @property {function} clearOnExpire
             * @property {function} clear
             *
             * @property {function} execute
             */
            var lifecycle;

            beforeEach(function () {
                /**
                 * @method
                 * @type {object}
                 */
                lifecycle = $tlLifecycle('start','stop','expire','tick');
            });

            it('Should push fn into correct stack', function () {
                lifecycle
                    .onExpire(function () {
                        return 0;
                    })
                    .onExpire(function () {
                        return 1;
                    })
                    .onStart(function () {
                        return 2;
                    });

                expect(lifecycle.$$onExpireFns.length).toBe(2);
                expect(lifecycle.$$onExpireFns[1]()).toBe(1);

                expect(lifecycle.$$onStartFns.length).toBe(1);
                expect(lifecycle.$$onStartFns[0]()).toBe(2);
                expect(lifecycle.$$onStartFns[1]).toBeUndefined();
            });

            it('Should execute all phase fn', function () {
                var expire = 0;
                var start  = 0;
                var expectedExpire = 2;
                var expectedStart  = 1;

                lifecycle
                    .onExpire(function () {
                        expire = expire + 1;
                    })
                    .onExpire(function () {
                        expire = expire + 1;
                    })
                    .onStart(function (arg1, arg2, arg3) {

                        expect(arg1).toBe(1);
                        expect(arg2).toBe(2);
                        expect(arg3).toEqual({ key : 'value' });

                        start = start + 1;
                    });

                lifecycle.execute('expire');
                lifecycle.execute('start', 1 , 2 , { key : 'value' });

                expect(expire).toBe(expectedExpire);
                expect(start).toBe(expectedStart);

            });

            it('Should clear phase fns', function () {
                lifecycle
                    .onExpire(function () {})
                    .onExpire(function () {})
                    .onStart(function () {})
                    .onStop(function () {});

                expect(lifecycle.$$onExpireFns.length).toBe(2);
                expect(lifecycle.$$onStartFns.length).toBe(1);
                expect(lifecycle.$$onStopFns.length).toBe(1);

                lifecycle.clearOnExpire();
                expect(lifecycle.$$onExpireFns.length).toBe(0);
                expect(lifecycle.$$onStartFns.length).toBe(1);
                expect(lifecycle.$$onStopFns.length).toBe(1);

                lifecycle.clear();
                expect(lifecycle.$$onExpireFns.length).toBe(0);
                expect(lifecycle.$$onStartFns.length).toBe(0);
                expect(lifecycle.$$onStopFns.length).toBe(0);

            });
        });
    });


});