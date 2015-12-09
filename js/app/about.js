var myApp;
if (!myApp) { myApp = {}; }

myApp.About = (function() {
	return {
		el: '#about-container',

		dataFile: 'about.json',

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
			var self = this;

			$(self.el).position().top = $('nav').innerHeight() + 'px';

			// Inject Handlebars Template into <head>
			myApp.Tools.injectScript(self.HandlebarsTemplate);

			// Setup Object Listener data is ready - similar to Object.watch()
			myApp.Tools.setupListener(self, 'dataReady', function(passedValue) {
				if (passedValue === true) {
					self.render();
				}
			});

			// Get Data
			myApp.Tools.getData(self);
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

$(function() {
	myApp.About.init();
});
