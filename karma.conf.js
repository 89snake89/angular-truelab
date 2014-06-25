module.exports = function(config){
    config.set({

        basePath : './',

        files : [

            // third-party
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/lodash',

            // test helpers
            'node_modules/jasmine-expect/dist/jasmine-matchers.js',

            // source code, mocks, and jasmine tests
            'src/**/*.js'
        ],

        frameworks: ['jasmine'],

        browsers : ['Chrome']
    });
};
