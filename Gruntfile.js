'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var banner = '/*! <%= bwr.name %> - v<%= bwr.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n';

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        bwr : grunt.file.readJSON('bower.json'),
        jshint : {
            src : {
                options : {
                    jshintrc : './.jshintrc'
                },
                files : {
                    src : ['src/**/*.js','!src/**/*.spec.js']
                }
            },
            test : {
                options : {
                    jshintrc : './.jshintrc-test'
                },
                files : {
                    src : ['src/**/*.spec.js']
                }
            },
            grunt : {
                options : {
                    jshintrc : './.jshintrc'
                },
                files : {
                    src : ['./Gruntfile.js']
                }
            }
        },
        karma : {
            options : {
                configFile: 'karma.conf.js'
            },
            continuous: {
                singleRun: true,
                browsers: ['Firefox']
            },
            coverage : {
                singleRun: true,
                browsers: ['Firefox','Chrome','PhantomJS'],
                preprocessors : {
                    'src/**/!(*spec).js' : 'coverage'
                },
                reporters: [
                    'dots',
                    'junit',
                    'coverage'
                ],
                junitReporter: {
                    'outputFile': '.tmp/test-out/test-results.xml'
                },
                coverageReporter : {
                    reporters : [
                        {type: 'html', dir : '.tmp/test-out/coverage/html/'},
                        {type: 'cobertura', dir : '.tmp/test-out/coverage/xml/'}
                    ],
                    dir : '.tmp/test-out/coverage/'
                }
            },
            unit: {
                background: true
            }
        },
        watch: {
            grunt : {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt']
            },
            jshint : {
                files: ['src/**/*.js'],
                tasks: ['jshint']
            },
            //run unit tests with karma (server needs to be already running
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
                src : ['dist/*','!dist/.git','!dist/.gitignore','!dist/.gitkeep','!dist/README.md']
            }
        },
        ngmin: {
            all : {
                expand: true,
                cwd: 'src',
                src: ['**/*.js','!**/*.spec.js','!**/*.mock.js'],
                dest: '.tmp/src'
            }
        },
        concat: {
            options : {
                stripBanners : true,
                banner: banner + ';(function( window, angular, undefined ){ \n',
                footer: '}(window, angular));'
            },
            dist: {
                files: {
                    'dist/angular-truelab.js': ['src/index.js','src/**/*.js','!src/**/*.spec.js','!src/**/*.mock.js'],
                    'dist/angular-truelab.min.js': ['.tmp/src/index.js','.tmp/src/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                preserveComments : false,
                banner : banner,
                mangle: {
                    except: ['window','angular','undefined']
                }
            },
            dist: {
                files: {
                    'dist/angular-truelab.min.js': ['dist/angular-truelab.min.js']
                }
            }
        },
        copy : {
            dist : {
                expand: false,
                cwd: './',
                src: ['README.md','bower.json'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },
        ngdocs: {
            options : {
                startPage: '/api/truelab',
                scripts: ['angular.js','dist/angular-truelab.min.js'],
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
            },
            dist : {
                options : {
                    base: 'dist',
                    message : 'Update dist ' + banner
                }
            }
        }
    });

    grunt.registerTask('dev', [
        'karma:unit:start',
        'watch'
    ]);

    grunt.registerTask('check', [
        'jshint',
        'karma:coverage'
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
        'uglify:dist',
        'copy:dist'
    ]);

    grunt.registerTask('publish-docs', [
        'docs',
        'gh-pages:docs'
    ]);

    grunt.registerTask('publish-dist', [
        'jshint',
        'karma:coverage',
        'build',
        'gh-pages:dist'
    ]);

    grunt.registerTask('travis', [
        'jshint',
        'karma:continuous'
    ]);

};
