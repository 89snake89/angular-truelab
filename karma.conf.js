module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.js'
        ],

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomJS-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ]
    });
};