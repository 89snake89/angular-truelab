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
        },
        dirs : {
            dist : 'dist',
            docs : 'docs',
            src  : 'src',
            tmp  : '.tmp',
        }
    };

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        bwr : grunt.file.readJSON('bower.json'),
        buildtag : grunt.template.today('yyyy-mm-dd HH:MM'),
        config : config,
        meta : config.meta,
        jshint : {
            src : {
                options : {
                    jshintrc : './.jshintrc'
                },
                files : {
                    src : ['<%= config.dirs.src %>/**/*.js','!<%= config.dirs.src %>/**/*.spec.js']
                }
            },
            test : {
                options : {
                    jshintrc : './.jshintrc-test'
                },
                files : {
                    src : ['<%= config.dirs.src %>/**/*.spec.js']
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
                    '<%= config.dirs.src %>/**/!(*spec).js' : 'coverage'
                },
                reporters: [
                    'dots',
                    'junit',
                    'coverage'
                ],
                junitReporter: {
                    'outputFile': '<%= config.dirs.tmp %>/test-out/test-results.xml'
                },
                coverageReporter : {
                    reporters : [
                        {type: 'html', dir : '<%= config.dirs.tmp %>/test-out/coverage/html/'},
                        {type: 'cobertura', dir : '<%= config.dirs.tmp %>/test-out/coverage/xml/'}
                    ],
                    dir : '<%= config.dirs.tmp %>/test-out/coverage/'
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
                files: ['<%= config.dirs.src %>/**/*.js'],
                tasks: ['jshint']
            },
            //run unit tests with karma (server needs to be already running
            unit: {
                files: ['<%= config.dirs.src %>/**/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        clean : {
            tmp  : {
                src : ['<%= config.dirs.tmp %>/']
            },
            docs : {
                src : [
                    '<%= config.dirs.docs %>/*',
                    '!<%= config.dirs.docs %>/.git',
                    '!<%= config.dirs.docs %>/.gitignore',
                    '!<%= config.dirs.docs %>/.gitkeep',
                    '!<%= config.dirs.docs %>/README.md'
                ]
            },
            dist : {
                src : [
                    '<%= config.dirs.dist %>/*',
                    '!<%= config.dirs.dist %>/.git',
                    '!<%= config.dirs.dist %>/.gitignore',
                    '!<%= config.dirs.dist %>/.gitkeep',
                    '!<%= config.dirs.dist %>/README.md'
                ]
            }
        },
        ngmin: {
            all : {
                expand: true,
                cwd: '<%= config.dirs.src %>',
                src: ['**/*.js','!**/*.spec.js','!**/*.mock.js'],
                dest: '<%= config.dirs.tmp %>/<%= config.dirs.src %>'
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
                    '<%= config.dirs.dist %>/<%= bwr.name %>.js': [
                        '<%= config.dirs.src %>/index.js',
                        '<%= config.dirs.src %>/**/*/index.js',
                        '<%= config.dirs.src %>/**/*.js',
                        '!<%= config.dirs.src %>/**/*.spec.js',
                        '!<%= config.dirs.src %>/**/*.mock.js'
                    ],
                    '<%= config.dirs.dist %>/<%= bwr.name %>.min.js': [
                        '<%= config.dirs.tmp %>/<%= config.dirs.src %>/index.js',
                        '<%= config.dirs.tmp %>/<%= config.dirs.src %>/**/*/index.js',
                        '<%= config.dirs.tmp %>/<%= config.dirs.src %>/**/*.js'
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
                    '<%= config.dirs.dist %>/<%= bwr.name %>.min.js': ['<%= config.dirs.dist %>/<%= bwr.name %>.min.js']
                }
            }
        },
        copy : {
            dist : {
                expand: false,
                cwd: './',
                src: ['README.md','bower.json'],
                dest: '<%= config.dirs.dist %>/',
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
                    '<%= config.dirs.dist %>/<%= bwr.name %>.min.js'
                ],
                navTemplate: './ngdocs_assets/docnav.html',
                html5Mode: false,
                discussions: {
                    shortName: 'angulartruelab',
                    url: 'http://truelab.github.io/angular-truelab',
                    dev: false
                }
            },
            all: [
                '<%= config.dirs.src %>/**/*.js',
                '!<%= config.dirs.src %>/**/*.spec.js',
                '!<%= config.dirs.src %>/**/*.mock.js'
            ],
            mocks :  {
                title : 'Mocks Documentation',
                src: ['<%= config.dirs.src %>/**/*.mock.js'],
                api : true
            }
        },
        'gh-pages': {
            docs : {
                options : {
                    base : '<%= config.dirs.docs %>',
                    message: 'Updates docs - <%= buildtag %>'
                },
                src : ['**']
            },
            dist : {
                options : {
                    base: '<%= config.dirs.dist %>',
                    branch : '<%= config.dirs.dist %>',
                    message : 'Updates dist - <%= buildtag %>'
                },
                src : ['**']
            }
        },
        connect: {
            docs: {
              options: {
                hostname : 'localhost',
                port: 3333,
                base: './<%= config.dirs.docs %>',
                keepalive : true,
                open : true
              }
            }
        }
    });

    /**
     * @name dev
     * @description
     *
     * Start a keepalive karma server and watch files for changes
     */
    grunt.registerTask('dev', [
        'karma:unit:start',
        'watch'
    ]);

    /**
     * @name check
     * @description
     *
     * Hint js files, run continuous tests
     */
    grunt.registerTask('check', [
        'jshint',
        'karma:continuous'
    ]);

    /**
     * @name docs
     * @description
     *
     * Generate angular documentation
     */
    grunt.registerTask('docs', [
        'clean:docs',
        'ngdocs'
    ]);

    /**
     * @name build
     * @description
     *
     * Build a distribution version
     */
    grunt.registerTask('build', [
        'clean:tmp',
        'clean:dist',
        'ngmin',
        'concat',
        'uglify:dist',
        'copy:dist'
    ]);

    /**
     * @name publish-docs
     * @description
     *
     * Publish documentation on github pages
     */
    grunt.registerTask('publish-docs', [
        'check',
        'build',
        'docs',
        'gh-pages:docs'
    ]);

    /**
     * @name publish-dist
     * @description
     *
     * Build and push new distribution version
     */
    grunt.registerTask('publish-dist', [
        'check',
        'build',
        'gh-pages:dist'
    ]);

    /**
     * @name publish
     * @description
     *
     * Publish documentation and distribution
     *
     * @see publish-docs
     * @see publish-dist
     */
    grunt.registerTask('publish', [
        'check',
        'build',
        'docs',
        'gh-pages'
    ]);

    /**
     * @name travis
     * @description
     *
     * Travis-ci run this task when changes
     * are detected on remote master branch
     */
    grunt.registerTask('travis', [
        'jshint',
        'karma:continuous'
    ]);

};
