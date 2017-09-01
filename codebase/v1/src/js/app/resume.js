myApp.Resume = (function() {
	return {
		el: '#resume-container',

		dataFile: 'resume.json',

		dataKey: 'resume',

		HandlebarsTemplate: {
			attr : { 'id': 'resume-template', 'type': 'text/x-handlebars-template' },
			html: ''.concat(
	            '{{#each sections}}',
	            '{{#if this.display}}',
	            '<section class="main">',
	            '{{#if this.name}}',
	            	'<h3 class="name">{{this.name}}</h3>',
	            '{{/if}}',
	            '{{#if this.text}}',
	            	'<section class="text">{{this.text}}</section>',
	            '{{/if}}',
	            '{{#if this.jobs}}',
	            	'<section class="jobs">',
	            	'{{#each this.jobs}}',
		            	'<section class="job">',
		            	'{{#if this.company}}',
		            		'<section class="company">{{this.company}}</section>',
		            	'{{/if}}',
		            	'{{#if this.city}}',
		            		'<section class="city">{{this.city}}</section>',
		            	'{{/if}}',
		            	'{{#if this.role}}',
		            		'<section class="role">',
		            		'{{#if this.role.name}}',
		            			'<div class="name">{{this.role.name}}</div>',
		            		'{{/if}}',
		            		'{{#if this.role.duration}}',
		            			'<div class="duration">{{this.role.duration}}</div>',
		            		'{{/if}}',
		            		'{{#if this.role.items}}',
		            			'<ul class="items">',
		            			'{{#each this.role.items}}',
		            				'<li>{{this}}</li>',
		        				'{{/each}}',
		            			'</ul>',
		            		'{{/if}}',
		        			'</section>',//role
		        		'{{/if}}',
		        		'</section>',//job
	        		'{{/each}}',
	        		'</section>',//jobs
	        	'{{/if}}',
	        	'{{#if this.college}}',
	        		'<section class="college">',
	        		'{{#if this.college.name}}',
	        			'<section class="name">{{this.college.name}}</section>',
	        		'{{/if}}',
	        		'{{#if this.college.city}}',
	        			'<section class="city">{{this.college.city}}</section>',
	        		'{{/if}}',
	        		'{{#if this.college.degrees}}',
	        		'{{#each this.college.degrees}}',
	        			'<section class="degree">',
	        			'{{#if this.type}}',
	        				'<section class="type">{{this.type}}</section>',
	        			'{{/if}}',
	        			'{{#if this.focus}}',
	        				'<section class="focus">{{this.focus}}</section>',
	        			'{{/if}}',
	        			'{{#if this.year}}',
	        				'<section class="year">{{this.year}}</section>',
	        			'{{/if}}',
	        			'</section>',//degree
	        		'{{/each}}',
	        		'{{/if}}',
	        		'</section>',//college
	        	'{{/if}}',
	            '</section>',//main
	            '{{/if}}',
	            '{{/each}}'
			)
		},

		init: function() {
			var _this = this,
				callSelf = false;

			// Setup Object Listener data is ready - similar to Object.watch()
	        myApp.Tools.setupListener(_this, 'dataReady', function(passedValue) {
				if (passedValue === true) {
					//console.log('portfolio data ready');
					_this.render();
				}
			});

			// Inject Handlebars Template into <head>
            if (!$('#' + _this.HandlebarsTemplate.attr.id).length) {
                myApp.Tools.injectScript(_this.HandlebarsTemplate);
            }

            (function() {
                var callSelf = true;

                if (myApp.data && myApp.data.length > 0) {
                    // look for key in data
                    $.each(myApp.data, function() {
                        if ('resume' in this) { // do not XHR if data attached to object
                            _this.data = $.extend(true, _this.data, this.resume);
                            callSelf = false;
                            return true;
                        }
                    });
                }

                if (callSelf) {
                    myApp.Tools.getData(_this);
                } else {
                    _this.render();
                }
            })();

            _this.ready = true;

            return _this;
		},

		bindEvents: function() {

		},

		render: function() {
			var _this = this;

			require(['handlebars', 'masonry'], function(Handlebars, Masonry) {
				var $hbTemplate = $('#resume-template'),
					$container = $(_this.el),
					source = $hbTemplate.html(),
					template = Handlebars.compile(source),
					context = _this.data || {},
					html = template(context);

				$container.html(html);
			});

			_this.bindEvents();
		}
	};
})();
