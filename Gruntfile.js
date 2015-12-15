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
	grunt.registerTask('build', ['clean','copy:html','copy:json','sass','copy:css','copy:appjs','copy:libjs','imagemin','copy:images','minjson','cssmin','concat:js','jshint','uglify']);
	// Build CSS
	grunt.registerTask('css', ['clean','sass','copy:css','cssmin']);
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
					expand: true,
					cwd: '',
					src: ['*.html'],
					dest: '<%= dirBuild %>',
					ext: '.html'
				},
				{
					expand: true,
					cwd: '',
					src: ['*.html'],
					dest: '<%= dirDist %>',
					ext: '.html'
				}]
			},
			css: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirCssPath %>',
					src: ['*.css'],
					dest: '<%= dirBuild %>/<%= dirCssPath %>/',
					ext: '.css'
				}]
			},
			appjs: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>',
					src: ['*.js'],
					dest: '<%= dirBuild %>/<%= dirJsPath %>/',
					ext: '.js'
				}]
			},
			libjs: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib',
					src: ['*.js'],
					dest: '<%= dirBuild %>/<%= dirJsPath %>/lib/',
					ext: '.js'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib',
					src: ['*.map'],
					dest: '<%= dirBuild %>/<%= dirJsPath %>/lib/',
					ext: '.map'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib',
					src: ['*.js'],
					dest: '<%= dirDist %>/<%= dirJsPath %>/lib/',
					ext: '.js'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib',
					src: ['*.map'],
					dest: '<%= dirDist %>/<%= dirJsPath %>/lib/',
					ext: '.map'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>',
					src: ['*.jpg'],
					dest: '<%= dirBuild %>/<%= dirImgPath %>',
					ext: '.jpg'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>/portfolio',
					src: ['**/*.jpg'],
					dest: '<%= dirBuild %>/<%= dirImgPath %>/portfolio',
					ext: '.jpg'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>',
					src: ['*.jpg'],
					dest: '<%= dirDist %>/<%= dirImgPath %>',
					ext: '.jpg'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>/portfolio',
					src: ['**/*.jpg'],
					dest: '<%= dirDist %>/<%= dirImgPath %>/portfolio',
					ext: '.jpg'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>',
					src: ['*.png'],
					dest: '<%= dirBuild %>/<%= dirImgPath %>',
					ext: '.png'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>/portfolio',
					src: ['**/*.png'],
					dest: '<%= dirBuild %>/<%= dirImgPath %>/portfolio',
					ext: '.png'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>',
					src: ['*.png'],
					dest: '<%= dirDist %>/<%= dirImgPath %>',
					ext: '.png'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirImgPath %>/portfolio',
					src: ['**/*.png'],
					dest: '<%= dirDist %>/<%= dirImgPath %>/portfolio',
					ext: '.png'
				}]
			},
			json: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/<%= dirDataPath %>',
					src: ['*.json'],
					dest: '<%= dirBuild %>/<%= dirDataPath %>',
					ext: '.json'
				}]
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
				'<%= dirSrc %>/js/*.js',
				'<%= dirSrc %>/js/app/*.js'
			]
		},
		concat: {
			js: {
				options: {
					separator: ';',
				},
				src: [
					'<%= dirSrc %>/js/app/*.js'
				],
				dest: '<%= dirBuild %>/js/app/main.js'
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
			dist: {
				options: {
					preserveComments: false, // set to true to keep comments in the code
					compress: {
						drop_console: false // removes all console.log incase there left in the code
					},
					//wrap: true,
					sourceMap: true,
					sourceMapIncludeSources: true
				},
				files:  [{
					expand: true,
					cwd: '<%= dirBuild %>/js',
					src: ['*.js','app/*.js'],
					dest: '<%= dirDist %>/<%= dirJsPath %>/'
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
					'<%= dirSrc %>/js/*.js',
					'<%= dirSrc %>/js/app/*.js'
				],
				tasks: ['build'],
				options: {
					spawn: false
				},
			}
		}
	});

};
