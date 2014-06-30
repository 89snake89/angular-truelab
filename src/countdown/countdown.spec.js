'use strict';

describe('truelab.countdown', function () {

    var utils = {
        flush : function ($service, times) {
            for(var i = 0; i < times; i++) {
                $service.flush();
            }
        }
    };

    beforeEach(module('truelab.countdown'));

    it('should load the module', function () {
        expect(true).toBe(true);
    });

    describe('$$TlCountdown & $tlCountdown', function () {
        var countdown, $timeout, seconds = 10;

        beforeEach(inject(function($tlCountdown, _$timeout_) {
              countdown = $tlCountdown.$new({
                  seconds : seconds
              });
              $timeout = _$timeout_;
        }));

        it('Should is in initial state', function (){
            expect(countdown.$seconds).toBe(seconds);
            expect(countdown.$$stopped).not.toBeDefined();
            expect(countdown.$running).toBe(false);
            expect(countdown.$expired).toBe(false);
        });

        describe('$$TlCountdown.start()', function () {
            it('Should works as expected', function () {
                countdown.start();
                expect(countdown.$running).toBe(true);

                utils.flush($timeout, 2);
                expect(countdown.$seconds).toBe(seconds - 2);
            });
        });

        describe('$$TlCountdown.stop()', function () {
            it('Should works as expected', function () {
                countdown.start();
                utils.flush($timeout, 3);
                expect(countdown.$seconds).toBe(seconds - 3);

                countdown.stop();
                expect(countdown.$running).toBe(false);

                expect(function() { utils.flush($timeout, 1); }).toThrow();
                expect(countdown.$seconds).toBe(seconds - 3);
            });
        });

        describe('$$TlCountdown that expire', function () {
            it('Should expire after ' + seconds + ' seconds', function () {

                countdown.start();
                utils.flush($timeout, seconds);
                expect(countdown.$expired).toBe(true);

                expect(function() { utils.flush($timeout, 2); }).toThrow();
                expect(countdown.$seconds).toBe(0);

            });
        });

        describe('$$TlCountdown.$lifecyle', function () {
            it('works', function () {
                var startCounter = 0,
                    tickCounter = 0,
                    expireCounter = 0,
                    stopCounter = 0,
                    expectedStartCounter = 1,
                    expectedExpireCounter = 1,
                    expectedStopCounter = 1,
                    expectedTickCounter = seconds - 1;

                countdown
                    .$lifecycle
                    .start(function () {

                        startCounter++;
                    })
                    .tick(function () {

                        tickCounter++;
                    })
                    .expire(function () {

                        expireCounter++;
                    })
                    .stop(function () {

                        stopCounter++;
                    });

                countdown.start();
                expect(startCounter).toBe(expectedStartCounter);


                for(var i = 0; i < seconds ; i++) {
                    $timeout.flush();
                }

                expect(tickCounter).toBe(expectedTickCounter);
                expect(expireCounter).toBe(expectedExpireCounter);
                expect(stopCounter).toBe(expectedStopCounter);

            });
        });
    });
});