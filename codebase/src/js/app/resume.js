myApp.Resume = (function() {
	return {
		el: '#resume-container',

		dataFile: 'resume.json',

		dataKey: 'resume',

		HandlebarsTemplate: {
			attr : { 'id': 'resume-template', 'type': 'text/x-handlebars-template' },
			html: ''.concat(
				'<div></div>'
			)
		},

		init: function() {
			var self = this,
				callSelf = false;

			// Setup Object Listener data is ready - similar to Object.watch()
	        myApp.Tools.setupListener(self, 'dataReady', function(passedValue) {
				if (passedValue === true) {
					//console.log('portfolio data ready');
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
                        if ('resume' in this) { // do not XHR if data attached to object
                            self.data = $.extend(true, self.data, this.resume);
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

            self.ready = true;

            return self;
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
