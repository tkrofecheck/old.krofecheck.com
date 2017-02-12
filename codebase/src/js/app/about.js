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
	    			'{{#if this.image}}',
	    			'<div class="image-wrap">',
	    				'<img src="{{this.image}}?v=' + myApp.updated + '" alt="Photo: Tim Krofecheck"/>',
	    			'</div>',
	    			'{{/if}}',
	    			'<span>{{{this.text}}}</span>',
	    			'</div>',
	            '{{/if}}',
	            '{{/each}}'
			)
		},

		init: function() {
			var _this = this,
				callSelf = false;

			$(_this.el).position().top = $('nav').innerHeight() + 'px';

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
                        if ('about' in this) { // do not XHR if data attached to object
                            _this.data = $.extend(true, _this.data, this.about);
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
				var $hbTemplate = $('#about-template'),
					$container = $(_this.el),
					source = $hbTemplate.html(),
					template = Handlebars.compile(source),
					context = _this.data || {},
					html = template(context);

				$container.html(html);

				$('.copyright').html(_this.data.copyright);
			});

			_this.bindEvents();
		}
	};
})();
