var myApp;
if (!myApp) { myApp = {}; }

myApp.Portfolio = (function() {
	return {
	    el: '#portfolio-container',

	    dataFile: 'portfolio.json',

	    dataKey: 'portfolio',

	    HandlebarsTemplate: {
	        attr: {
	            'id': 'portfolio-template',
	            'type': 'text/x-handlebars-template'
	        },
	        html: ''.concat(
	            '<div id="portfolio-projects" class="grid">',
	            '{{#each projects}}',
	            '{{#if this.display}}',
	            	/*'<h4>{{this.name}}</h4>',*/
	        		'{{#each this.steps}}',
	    				'<div class="grid-item tile-width{{#if this.width2}} tile-width-x2{{/if}}{{#if this.gigante}} gigante{{/if}}">',
	    				'<img src="images/portfolio/{{../this.folder}}/{{this.image}}" />',
	    				'{{#if this.text}}<span>{{this.text}}</span>{{/if}}',
	    				'</div>',
	        		'{{/each}}',
	            '{{/if}}',
	            '{{/each}}',
	            '</div>',
	            '<div class="tile-settings">',
			    	'<div class="toolbar">',
			    		'<div class="header">Tools</div>',
			    		'<div class="buttons">',
				    		'<input id="size-normal" type="radio" name="size" value="normal" checked>',
				    		'<input id="size-tile2x" type="radio" name="size" value="tile2x" />',
				    		'<input id="size-gigante" type="radio" name="size" value="gigante" />',
				    		'<input id="remove-tiles" type="checkbox" name="remove" value="remove" />',
				    		'<input id="reload-tiles" type="button" name="reload-tiles" value="Reload Tiles"/>',
				    	'</div>',
			    	'</div>',
			    '</div>'
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
                        if ('portfolio' in this) { // do not XHR if data attached to object
                            self.data = $.extend(true, self.data, this.portfolio);
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
	    },

		unbindEvents: function() {
	    	var self = this;

	    	self.$grid.unbind();
	    	$(self.el).unbind();
	    	$(window).unbind();

	    	return false;
	    },

	    bindEvents: function() {
	    	var self = this,
	    		$html = $('html'),
	    		$body = $('body'),
	    		$windowH = $(window).outerHeight();

			$(self.el).bind('fixMasonry', function() {
				self.$grid.masonry('layout');

				if (!self.$grid.attr('data-orig-csstext')) {
					self.$grid.attr('data-orig-csstext', self.$grid.attr('style'));
				}

				self.$grid.attr('style', self.$grid.attr('data-orig-csstext') + ' margin-bottom: ' + $('.toolbar').innerHeight() + 'px !important');

				self.$grid.masonry('layout');
			});
			
			$(self.el).bind('reloadTiles', function() {
				$body.addClass('reload-tiles');
				self.init();
			});
			
			self.$grid.on('click tap', '.grid-item', function() {
	        	var tile = this,
	        		$tile = $(tile),
	        		$tileSpan = $tile.find('span');

	        	if ($body.hasClass('remove-tiles')) {
	        		self.$grid.masonry('remove', tile);
	        		self.$grid.masonry('layout');
	        	} else {
	        		if ($html.hasClass('touch')) {
        				if ($tileSpan.hasClass('visible')) {
        					$tileSpan.removeClass('visible');
        				} else {
        					$tileSpan.addClass('visible');
        				}
	        		} else {
	        			if (window.innerWidth < 444) {
		        			return false;
		        		} else {
		        			$tile.toggleClass('gigante');

		        			if ($tileSpan.hasClass('visible')) {
	        					$tileSpan.removeClass('visible');
	        				} else {
	        					$tileSpan.addClass('visible');
	        				}

		        			self.$grid.masonry('layout');
				        }
				    }
		        }
	        });

			$(window).bind('resizeEnd', function() {
	            // do something, window hasn't changed size in 500ms
	            self.$grid.masonry('reloadItems');
	            self.$grid.masonry('layout');
	        });

			$(window).on('resize orientationchange', function() {
	            if ($(window).outerHeight() === $windowH) {
	            	// false resize - browser window adjusted by browser chrome, but viewport not affected
	            	return false;
	            }

            	if (this.resizeTO) {
	                clearTimeout(this.resizeTO);
	            }

	            this.resizeTO = setTimeout(function() {
	                $(this).trigger('resizeEnd');
	            }, 500);
	        });

			self.$grid.on('click tap', '.grid-item a', function(e) {
				e.stopPropagation(); // Prevent bubbling when tapping link inside span
			});

			$(self.el).on('click tap', 'input[name="reload-tiles"]', function(e) {
                e.stopPropagation();

                myApp.Tools.customModal.init({
                    title: "Reload Tiles?",
                    message: "Would you like to reload all tiles (including the tiles removed)?",
                    text: {
                        yes: "Yes",
                        no: "No"
                    },
                    choice: {
                        yes: function() {
                            $(self.el).trigger('reloadTiles');
                        },
                        no: function() {
                            return false;
                        }
                    }
                });
            });

            $(self.el).on('change', 'input:checkbox[name="remove"]', function(e) {
                e.stopPropagation();

                if (this.checked) {
                    $body.addClass('remove-tiles');
                    $('input:radio[name="size"]').attr('disabled', true);
                } else {
                    $body.removeClass('remove-tiles');
                    $('input:radio[name="size"]').attr('disabled', false);
                }
            });

            $(self.el).on('change', 'input:radio[name="size"]', function(e) {
                e.stopPropagation();

                var radioBtn = this,
                    $gridItems = $('.grid-item');

                if (radioBtn.checked && window.innerWidth > 444) {
                    $.each($gridItems, function() {
                        var $tile = $(this);

                        if (radioBtn.value === 'tile2x') {
                            $tile.addClass('tile-width-x2').removeClass('gigante');
                            $tile.find('span').addClass('visible');
                        } else if (radioBtn.value === 'gigante') {
                            $tile.removeClass('tile-width-x2').addClass('gigante');
                            $tile.find('span').addClass('visible');
                        } else {
                            $tile.removeClass('tile-width-x2').removeClass('gigante');
                            $tile.find('span').removeClass('visible');
                        }
                    });

                    $(self.el).trigger('fixMasonry');
                }
            });
	    },

	    render: function() {
	        var self = this;

	        if (typeof self.$grid !== 'undefined' && self.$grid !== null) {
	        	self.$grid.masonry('destroy');

	        	self.unbindEvents();
	        }

	        require(['handlebars', 'masonry'], function(Handlebars, Masonry) {
	            var $body = $('body'),
	            	$hbTemplate = $('#portfolio-template'),
	                $container = $(self.el),
	                source = $hbTemplate.html(),
	                template = Handlebars.compile(source),
	                context = self.data || {},
	                html = template(context);

	            $container.html(html);

				$('.grid-item').autolink();

				require(['jquery-bridget/jquery.bridget'], function() {
	            	// make Masonry a jQuery plugin
	            	$.bridget('masonry', Masonry);

	        		// init Masonry after all images have loaded
	        		self.$grid = $('#portfolio-projects.grid').imagesLoaded(function() {
						self.$grid.masonry({
							isInitLayout: false,
							itemSelector: '.grid-item',
							columnWidth: '.tile-width',
							gutter: 10,
							isFitWidth: true,
							isOriginTop: true
					    });

					    self.$grid.masonry('layout');
					});

					if (!$body.hasClass('reload-tiles')) {
						$(self.el).hide(); // hide on initial load
					} else {
						$body.removeClass('reload-tiles');
					}

					$($('input:radio[name="size"]')[0]).prop('checked', true); // Pre-select 'Normal' for tiles

					self.bindEvents();
	            });
	        });
	    }
	};
})();
