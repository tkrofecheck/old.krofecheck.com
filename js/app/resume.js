var myApp;
if (!myApp) { myApp = {}; }

myApp.Resume = (function() {
	return {
		el: '#resume-container',

		dataFile: 'resume.json',

		HandlebarsTemplate: {
			attr : { 'id': 'resume-template', 'type': 'text/x-handlebars-template' },
			html: ''.concat(
				'<div></div>'
			)
		},

		init: function() {
			var self = this;

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
				var $hbTemplate = $('#resume-template'),
					$container = $(self.el),
					source = $hbTemplate.html(),
					template = Handlebars.compile(source),
					context = self.data || {},
					html = template(context);

				$container.html(html);
			});

			self.bindEvents();
		}
	};
})();

$(function() {
	myApp.Resume.init();
});
