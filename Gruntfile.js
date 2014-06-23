'use strict';

module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        karma : {
            options : {
                configFile: 'karma.conf.js'
            },
            continuous : {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            unit: {
                background: true
            }
        },
        watch: {
            //run unit tests with karma (server needs to be already running)
            unit: {
                files: ['src/**/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        clean : {
            tmp  : {
                src : ['.tmp/']
            },
            docs : {
                src : ['docs/*','!docs/.git','!docs/.gitignore','!docs/.gitkeep','!docs/README.md']
            },
            dist : {
                src : ['dist']
            }
        },
        ngmin: {
            all : {
                expand: true,
                cwd: 'src',
                src: ['**/*.js','!**/*.spec.js'],
                dest: '.tmp/src'
            }
        },
        concat: {
            dist: {
                files: {
                    'dist/angular-truelab.js': ['src/**/*.js','!src/**/*.spec.js'],
                    'dist/angular-truelab.min.js': ['.tmp/src/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                preserveComments : false,
                mangle: {
                    except: ['angular']
                }
            },
            dist: {
                files: {
                    'dist/angular-truelab.min.js': ['dist/angular-truelab.min.js']
                }
            }
        },
        ngdocs: {
            options :{
                scripts: ['angular.js','dist/angular-truelab.js'],
                html5Mode: false
            },
            all: ['src/**/*.js','!src/**/*.spec.js']
        },
        'gh-pages': {
            docs : {
                options : {
                    base : 'docs',
                    message: 'Updates docs'
                },
                src : ['**']
            }
        }
    });

    grunt.registerTask('dev', [
        'karma:unit:start',
        'watch'
    ]);

    grunt.registerTask('docs', [
        'clean:docs',
        'build',
        'ngdocs'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'ngmin',
        'concat',
        'uglify:dist'
    ]);

    grunt.registerTask('publish-docs', [
        'build',
        'docs',
        'gh-pages:docs'
    ]);


};