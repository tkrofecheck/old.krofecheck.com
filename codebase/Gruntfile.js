module.exports = function (grunt) {


	// By default just display a message
	grunt.registerTask('default', ['tasks']);

	// Instead of building all files we prompt the user on which build they want
	grunt.registerTask('tasks', function() {
		grunt.log.subhead('Please choose a grunt build:');
		grunt.log.ok('grunt build		builds everything');
		grunt.log.ok('grunt css		build css');
		grunt.log.ok('grunt js		build js');
	});
	// Build all
	grunt.registerTask('build', ['clean','copy:html','copy:json','sass','copy:fonts','copy:appjs','copy:libjs','imagemin','copy:images','minjson','cssmin','jshint','concat:js','uglify']);
	// Build CSS
	grunt.registerTask('css', ['clean','sass','cssmin']);
	// Build JS
	grunt.registerTask('js', ['clean','copy:appjs','copy:libjs','copy:json','jshint','concat:js','uglify']);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// File Path Setup
		dirSrc : 'src',
		dirBuild : 'build',
		dirDist : 'dist',
		dirDataPath : 'data',
		dirJsPath : 'js',
		dirCssPath : 'css',
		dirFontPath : 'fonts',
		dirImgPath : 'images',
		// Build Tasks
		clean: {
			all: ['dist','build']
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
					dest: '<%= dirBuild %>/<%= dirCssPath %>/',
					ext: '.css'
				}]
			}
		},
		imagemin: {                          		// Task
			dynamic: {                         		// Another target
				files: [{
					expand: true,                  	// Enable dynamic expansion
					cwd: 'src/images',              // Src matches are relative to this path
					src: [
						'*.{png,jpg,gif}',
						'**/*.{png,jpg,gif}',
						'**/**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'build/images'            // Destination path prefix
				}]
			}
		},
		copy: {
			html: {
				files: [{
					src: '*.html',
					dest: '<%= dirBuild %>/'
				},
				{
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
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirFontPath %>/',
					src: '**',
					dest: '<%= dirDist %>/<%= dirFontPath %>/'
				}]
			},
			appjs: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/',
					src: '**',
					dest: '<%= dirBuild %>/<%= dirJsPath %>/'
				}]
			},
			libjs: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib/',
					src: '**',
					dest: '<%= dirBuild %>/<%= dirJsPath %>/lib/',
				},
				{
					expand: true,
					cwd: '<%= dirBuild %>/<%= dirJsPath %>/lib/',
					src: '**',
					dest: '<%= dirDist %>/<%= dirJsPath %>/lib/',
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: '<%= dirBuild %>/<%= dirImgPath %>/',
					src: '**',
					dest: '<%= dirDist %>/<%= dirImgPath %>/',
				},
				{
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
			all: [
				'Gruntfile.js',
				'<%= dirSrc %>/<%= dirJsPath %>/*.js',
				'<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
			]
		},
		concat: {
			js: {
				options: {
					separator: ';',
				},
				src: [
					'<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
				],
				dest: '<%= dirBuild %>/<%= dirJsPath %>/app/main.js'
			}
		},
		minjson: {
			compile: {
				files: {
					'<%= dirDist %>/data/data.min.json' : [
						'<%= dirBuild %>/data/about.json',
						'<%= dirBuild %>/data/nav.json',
						'<%= dirBuild %>/data/portfolio.json',
						'<%= dirBuild %>/data/resume.json'
					]
				}
			}
		},
		uglify: {
			build: {
				options: {
					preserveComments: false, // set to true to keep comments in the code
					compress: {
						drop_console: false, // removes all console.log incase there left in the code
						hoist_funs: true, // hoist function declarations
						unused: true, // drop unreferenced functions and variables
						if_return: true, // optimizations for if/return and if/continue
						booleans: true, //various optimizations for boolean context
						comparisons: true, // apply certain optimizations to binary nodes
						conditionals: true, // apply optimizations for if-s and conditional expressions
						properties: true, // rewrite property access using the dot notation
						sequences: true // join consecutive simple statements using the comma operator
					},
					sourceMap: true,
					sourceMapIncludeSources: true
				},
				files:  [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>',
					src: ['*.js','app/*.js'],
					dest: '<%= dirBuild %>/<%= dirJsPath %>/'
				}]
			},
			dist: {
				options: {
					preserveComments: false, // set to true to keep comments in the code
					compress: {
						drop_console: true, // removes all console.log incase there left in the code
					},
					//wrap: true
				},
				files: [{
					'<%= dirDist %>/<%= dirJsPath %>/app.js': ['<%= dirBuild %>/<%= dirJsPath %>/app.js'],
					'<%= dirDist %>/<%= dirJsPath %>/app/tools.js': ['<%= dirBuild %>/<%= dirJsPath %>/app/tools.js'],
					'<%= dirDist %>/<%= dirJsPath %>/app/main.js': [
						'<%= dirBuild %>/<%= dirJsPath %>/app/main.js',
						'<%= dirBuild %>/<%= dirJsPath %>/app/nav.js',
						'<%= dirBuild %>/<%= dirJsPath %>/app/about.js',
						'<%= dirBuild %>/<%= dirJsPath %>/app/resume.js',
						'<%= dirBuild %>/<%= dirJsPath %>/app/portfolio.js'
					],
				}]
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
