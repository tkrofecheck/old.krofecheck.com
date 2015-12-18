var myApp;
if (!myApp) { myApp = {}; }

myApp.About = (function() {
	return {
		el: '#about-container',

		dataFile: 'about.json',

		dataKey: 'about',

		HandlebarsTemplate: {
			attr : { 'id': 'about-template', 'type': 'text/x-handlebars-template' },
			html: ''.concat(
				'{{#each paragraphs}}',
	            '{{#if this.display}}',
	    			'<div class="bio">',
	    			'<h4>{{this.name}}</h4>',
	    			'<div class="image-wrap">',
	    				'<img src="{{this.image}}" alt="Photo: Tim Krofecheck"/>',
	    			'</div>',
	    			'<span>{{{this.text}}}</span>',
	    			'</div>',
	            '{{/if}}',
	            '{{/each}}'
			)
		},

		init: function() {
			var self = this,
				callSelf = false;

			$(self.el).position().top = $('nav').innerHeight() + 'px';

			// Setup Object Listener data is ready - similar to Object.watch()
	        myApp.Tools.setupListener(self, 'dataReady', function(passedValue) {
				if (passedValue === true) {
					//console.log('portfolio data ready');
					myApp.updated = self.data.updated.time;
					self.render();
				}
			});

			// Inject Handlebars Template into <head>
            if (!$('#' + self.HandlebarsTemplate.attr.id).length) {
                myApp.Tools.injectScript(self.HandlebarsTemplate);
            }

            (function() {
                var callSelf = true;

                if (myApp.data && myApp.data.length > 0) {
                    // look for key in data
                    $.each(myApp.data, function() {
                        if ('about' in this) { // do not XHR if data attached to object
                            self.data = $.extend(true, self.data, this.about);
                            myApp.updated = self.data.updated.time;
                            callSelf = false;
                            return true;
                        }
                    });
                }

                if (callSelf) {
                    myApp.Tools.getData(self);
                } else {
                    self.render();
                }
            })();

            return self;
		},

		bindEvents: function() {

		},

		render: function() {
			var self = this;

			require(['handlebars', 'masonry'], function(Handlebars, Masonry) {
				var $hbTemplate = $('#about-template'),
					$container = $(self.el),
					source = $hbTemplate.html(),
					template = Handlebars.compile(source),
					context = self.data || {},
					html = template(context);

				$container.html(html);

				$('.copyright').html(self.data.copyright);
			});

			self.bindEvents();
		}
	};
})();
