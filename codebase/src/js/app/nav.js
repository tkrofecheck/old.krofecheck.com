myApp.Nav = (function() {
    return {
        el: '#nav-container',

        dataFile: 'nav.json',

        dataKey: 'nav',

        HandlebarsTemplate: {
            attr : { 'id': 'nav-template', 'type': 'text/x-handlebars-template' },
            html: ''.concat(
                '<nav>',
                    '<div class="social">',
                    '{{#each social}}',
                        '{{#if this.display}}',
                        '<a href="{{this.url}}" class="{{this.font-icon}}"></a>',
                        '{{/if}}',
                    '{{/each}}',
                    '</div>',
                    '<div class="site">',
                    '{{#each site-links}}',
                    '{{#if this.display}}',
                    '<a class="{{this.class}}">{{this.text}}</a>',
                    '{{/if}}',
                    '{{/each}}',
                    '</div>',
                '</nav>'
            )
        },

        init: function() {
            var self = this;

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
                        if ('nav' in this) { // do not XHR if data attached to object
                            self.data = $.extend(true, self.data, this.nav);
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

        unbindEvents: function() {
            var self = this;

            $(self.el).unbind('click tap', 'a');
        },

        bindEvents: function() {
            var self = this,
            	$body = $('body'),
            	$about = $(myApp.About.el),
            	$resume = $(myApp.Resume.el),
            	$portfolio = $(myApp.Portfolio.el);

            self.unbindEvents();

            $(self.el).find('a').on('click tap', function(e) {
                var $navLink = $(e.currentTarget);

                e.stopPropagation();

                if ($navLink.hasClass('about-lnk')) {
                    if (!$body.hasClass('about-active') && myApp.About.ready) {
                        $body
                            .addClass('about-active')
                            .removeClass('resume-active')
                            .removeClass('portfolio-active');

                        $about.show();
                        $resume.hide();
                        $portfolio.hide();
                    }
                }

                if ($navLink.hasClass('resume-lnk')) {
                    if (!$body.hasClass('resume-active') && myApp.Resume.ready) {
                        $body
                            .addClass('resume-active')
                            .removeClass('about-active')
                            .removeClass('portfolio-active');

                        $about.hide();
                        $resume.show();
                        $portfolio.hide();
                    }
                }

                if ($navLink.hasClass('portfolio-lnk')) {
                    if (!$body.hasClass('portfolio-active') && myApp.Portfolio.ready) { // currently viewing portfolio - don't redraw
                        $body
                            .addClass('portfolio-active')
                            .removeClass('about-active')
                            .removeClass('resume-active');
                        $about.hide();
                        $resume.hide();
                        $portfolio.show();

                        $portfolio.trigger('fixMasonry');
                    }
                }
            });
        },

        render: function() {
            var self = this;

            require(['handlebars'], function(Handlebars) {
                var $hbTemplate = $('#nav-template'),
                    $container = $(self.el),
                    source = $hbTemplate.html(),
                    template = Handlebars.compile(source),
                    context = self.data || {},
                    html = template(context);

                $container.html(html);

                self.bindEvents();

                $(window).trigger('navComplete');
            });
        }
    };
})();
