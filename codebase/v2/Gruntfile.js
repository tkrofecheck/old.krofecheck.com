module.exports = function(grunt) {


    // By default just display a message
    grunt.registerTask('default', ['tasks']);

    // Instead of building all files we prompt the user on which build they want
    grunt.registerTask('tasks', function() {
        grunt.log.subhead('Please choose a grunt build:');
        grunt.log.ok('grunt build		builds everything');
        grunt.log.ok('grunt css		build css');
		grunt.log.ok('grunt js		build js');
		grunt.log.ok('grunt typescript		build typescript');
    });
    // Build all
    grunt.registerTask('build', ['clean', 'copy:html', 'copy:json', 'minjson', 'sass', 'copy:fonts', 'copy:libjs', 'imagemin', 'copy:images', 'cssmin', 'jshint', 'manifest', 'copy:manifest', ]);
    // Build CSS
    grunt.registerTask('css', ['clean', 'sass', 'cssmin']);
    // Build JS
    grunt.registerTask('js', ['clean', 'copy:libjs', 'copy:json', 'jshint']);
	// Build TS
	grunt.registerTask('typescript', ['clean', 'copy:html', 'ts', 'copy:libjs', 'copy:json', 'jshint']);

	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // File Path Setup
        dirSrc: 'src',
        dirBuild: 'build',
        dirDist: 'dist',
        dirDataPath: 'data',
        dirJsPath: 'scripts',
        dirCssPath: 'css',
        dirFontPath: 'fonts',
        dirImgPath: 'images',
        // Build Tasks
        clean: {
            all: ['dist', 'build']
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirSrc %>/scss',
                    src: ['*.scss'],
                    dest: '<%= dirBuild %>/<%= dirCssPath %>',
                    ext: '.css'
                }]
            }
        },
        imagemin: { // Task
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= dirSrc %>/<%= dirImgPath %>', // Src matches are relative to this path
                    src: [
                        '*.{png,jpg,gif}',
                        '**/*.{png,jpg,gif}',
                        '**/**/*.{png,jpg,gif}'
                    ], // Actual patterns to match
                    dest: '<%= dirBuild %>/<%= dirImgPath %>' // Destination path prefix
                }]
            }
        },
        manifest: {
            generate: {
                options: {
                    basePath: '<%= dirDist %>/',
                    timestamp: true,
                    hash: true
                },
                dest: 'manifest.appcache',
                src: [
                	'index.html',
                    '<%= dirDataPath %>/*.json',
                    '<%= dirCssPath %>/*.css',
                    '<%= dirJsPath %>/*.js',
                    '<%= dirJsPath %>/app/*.js',
                    '<%= dirJsPath %>/lib/*.js',
                    '<%= dirImgPath %>/*.jpg',
                    '<%= dirImgPath %>/portfolio/*.jpg',
                    '<%= dirImgPath %>/portfolio/adcounts/*.jpg',
                    '<%= dirImgPath %>/portfolio/microsites/*.jpg',
                    '<%= dirImgPath %>/portfolio/newsletter/*.jpg',
                    '<%= dirImgPath %>/portfolio/newyorkpost/*.jpg',
                    '<%= dirImgPath %>/portfolio/nyp-email/*.jpg',
                    '<%= dirImgPath %>/portfolio/personal-wedding/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-email/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-ipad/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-iphone/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-kindle/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-misc/*.jpg',
                    '<%= dirImgPath %>/portfolio/timeinc-tfkclassroom/*.jpg',
                    '<%= dirImgPath %>/portfolio/wyndham/*.jpg'
                ],
                exclude: [
                    '<%= dirJsPath %>/lib/*.js'
                ],
                timestamp: true,
                hash: true,
                master: ['index.html'],
                process: function(path) {
                    return path.substring('<%= dirBuild %>/'.length);
                },
            }
        },
        copy: {
            manifest: {
                files: [{
                    src: '*.appcache',
                    dest: '<%= dirBuild %>/'
                }, {
                    src: '*.appcache',
                    dest: '<%= dirDist %>/'
                }]
            },
            html: {
                files: [{
                    src: '*.html',
                    dest: '<%= dirBuild %>/'
                }, {
                    src: '*.html',
                    dest: '<%= dirDist %>/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirFontPath %>/',
                    src: '**',
                    dest: '<%= dirBuild %>/<%= dirFontPath %>/'
                }, {
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirFontPath %>/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirFontPath %>/'
                }]
            },
            libjs: {
                files: [{
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib/',
                    src: '**',
                    dest: '<%= dirBuild %>/<%= dirJsPath %>/',
                }, {
                    expand: true,
                    cwd: '<%= dirBuild %>/<%= dirJsPath %>/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirJsPath %>/',
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= dirBuild %>/<%= dirImgPath %>/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirImgPath %>/',
                }, {
                    expand: true,
                    cwd: '<%= dirBuild %>/<%= dirImgPath %>/portfolio/',
                    src: '**/*',
                    dest: '<%= dirDist %>/<%= dirImgPath %>/portfolio/'
                }]
            },
            json: {
                expand: true,
                cwd: '<%= dirSrc %>/<%= dirDataPath %>/',
                src: '**',
                dest: '<%= dirBuild %>/<%= dirDataPath %>/'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= dirBuild %>',
                    src: ['<%= dirCssPath %>/*.css'],
                    dest: '<%= dirDist %>'
                }]
            }
        },
        jshint: {
            options: {
				esversion: 6,
				reporterOutput: "",
				validthis: true
            },
            all: [
                'Gruntfile.js',
                '<%= dirSrc %>/<%= dirJsPath %>/*.js',
                '<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
            ]
        },
        minjson: {
            compile: {
                files: {
                    '<%= dirDist %>/data/data.min.json': [
                        '<%= dirBuild %>/data/about.json',
                        '<%= dirBuild %>/data/nav.json',
                        '<%= dirBuild %>/data/portfolio.json',
                        '<%= dirBuild %>/data/resume.json'
                    ]
                }
            }
		},
		ts: {
			default: {
				tsconfig: {
					// specifying tsconfig as a string will use the specified `tsconfig.json` file.
					tsconfig: './tsconfig.json'
				}
			}
		},
        watch: {
            options: {
                livereload: true
            },
            dist: {
                files: [
                    '<%= dirSrc %>/data/*.json',
                    '<%= dirSrc %>/scss/*.scss',
                    '<%= dirSrc %>/<%= dirJsPath %>/*.js',
                    '<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
                ],
                tasks: ['build'],
                options: {
                    spawn: false
                },
            }
        }
    });

};