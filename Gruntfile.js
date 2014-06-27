'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        meta : {
            banner : '/**\n' +
                ' * @name <%= bwr.name %>\n' +
                ' * @description <%= bwr.description %>\n' +
                ' * @version v<%= bwr.version %> - <%= buildtag %>\n' +
                ' * @link <%= bwr.homepage %>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' **/\n\n'
        }
    };

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        bwr : grunt.file.readJSON('bower.json'),
        buildtag : grunt.template.today('yyyy-mm-dd HH:MM'),
        meta : config.meta,
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
                stripBanners : false,
                banner: config.meta.banner + ';(function( window, angular, undefined ){ \n',
                footer: '}(window, angular));'
            },
            dist: {
                files: {
                    'dist/angular-truelab.js': [
                        'src/index.js',
                        'src/**/*/index.js',
                        'src/**/*.js',
                        '!src/**/*.spec.js',
                        '!src/**/*.mock.js'
                    ],
                    'dist/angular-truelab.min.js': [
                        '.tmp/src/index.js',
                        '.tmp/src/**/*/index.js',
                        '.tmp/src/**/*.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                preserveComments : false,
                banner : '<%= meta.banner %>',
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
                scripts: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'angular.js',
                    'dist/angular-truelab.min.js'
                ],
                navTemplate: './ngdocs_assets/docnav.html',
                html5Mode: false,
                discussions: {
                    shortName: 'angulartruelab',
                    url: 'http://truelab.github.io/angular-truelab',
                    dev: false
                }
            },
            all: ['src/**/*.js','!src/**/*.spec.js','!src/**/*.mock.js'],
            mocks :  {
                title : 'Mocks Documentation',
                src: ['src/**/*.mock.js'],
                api : true
            }
        },
        'gh-pages': {
            docs : {
                options : {
                    base : 'docs',
                    message: 'Updates docs - <%= buildtag %>'
                },
                src : ['**']
            },
            dist : {
                options : {
                    base: 'dist',
                    branch : 'dist',
                    message : 'Updates dist - <%= buildtag %>'
                },
                src : ['**']
            }
        }
    });

    grunt.registerTask('dev', [
        'karma:unit:start',
        'watch'
    ]);

    grunt.registerTask('check', [
        'jshint',
        'karma:continuous'
    ]);

    grunt.registerTask('docs', [
        'clean:docs',
        'ngdocs'
    ]);

    grunt.registerTask('build', [
        'clean:tmp',
        'clean:dist',
        'ngmin',
        'concat',
        'uglify:dist',
        'copy:dist'
    ]);

    grunt.registerTask('publish-docs', [
        'check',
        'build',
        'docs',
        'gh-pages:docs'
    ]);

    grunt.registerTask('publish-dist', [
        'check',
        'build',
        'gh-pages:dist'
    ]);

    grunt.registerTask('publish', [
        'check',
        'build',
        'docs',
        'gh-pages'
    ]);

    grunt.registerTask('travis', [
        'jshint',
        'karma:continuous'
    ]);

};
