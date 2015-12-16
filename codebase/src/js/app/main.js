var myApp;
if (!myApp) { myApp = {}; }

//Load Web App JavaScript Dependencies/Plugins
define(['jquery', 'underscore', 'handlebars', 'masonry', 'tools'],
    function($, _, Handlebars, Masonry) {
        var self = this;

        console.log('required plugins loaded...');

        // Fallback for icon font (CDN --> Local)
        $(function() {
            var $span = $('<span class="icon-facebook-square" style="display:none"></span>').appendTo('body');
            console.log($span.css('fontFamily'));
            if ($span.css('fontFamily') !== 'Times' ) {
                // Fallback Link
                $('<link rel="stylesheet" href="css/icons.css" />').appendTo('head');
            }
            $span.remove();
        });

        myApp.dynamicStylesheet = (function() {
            // Create the <style> tag
            var style = document.createElement("style");

            // Add a media (and/or media query) here if you'd like!
            // style.setAttribute("media", "screen")
            // style.setAttribute("media", "only screen and (max-width : 1024px)")

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        })();

        // $.fn.imagesLoaded - THIS IS USED WITH MASONRY PLUGIN
        // $('img.photo',this).imagesLoaded(myFunction)
        // execute a callback when all images have loaded.
        // needed because .load() doesn't work on cached images

        // Modified with a two-pass approach to changing image
        // src. First, the proxy imagedata is set, which leads
        // to the first callback being triggered, which resets
        // imagedata to the original src, which fires the final,
        // user defined callback.

        // modified by yiannis chatzikonstantinou.

        // original:
        // mit license. paul irish. 2010.
        // webkit fix from Oren Solomianik. thx!

        // callback function is passed the last image to load
        // as an argument, and the collection as `this`

        $.fn.imagesLoaded = function(callback) {
            var elems = this.find('img'),
                elems_src = [],
                self = this,
                len = elems.length;

            if (!elems.length) {
                callback.call(this);
                return this;
            }

            elems.one('load error', function() {
                if (--len === 0) {
                    // Rinse and repeat.
                    len = elems.length;
                    elems.one('load error', function() {
                        if (--len === 0) {
                            callback.call(self);
                        }
                    }).each(function(index) {
                        $(this).load(function() {
                            var selector = '.grid-item:nth-child(' + (index + 1) + ').gigante',
                            rules = 'max-width: ' + this.width + 'px !important;';

                            myApp.Tools.addCSSRule(myApp.dynamicStylesheet, selector, rules, 0);
                        });

                        this.src = elems_src.shift();
                    });
                }
            }).each(function() {
                elems_src.push(this.src);
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                // data uri bypasses webkit log warning (thx doug jones)
                this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
            });

            return this;
        };

        // Auto Link URL
        $.fn.autolink = function () {
            return this.each( function(){
                var re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
                $(this).html( $(this).html().replace(re, '<br/><a href="$1" target="_blank">See Example</a> ') );
            });
        };

        $(function() {
            myApp.Tools.setupListener(myApp, 'dataReady', function(passedValue) {
                if (passedValue === true) {
                    myApp.Tools.getSections();
                }
            });

            // add handlebars template for custom modal to HEAD
            myApp.Tools.customModal.injectScript();

            //do stuff
            console.log('sections loaded...');

            // event listener for adjusting sections after navigation is ready
            $(window).on('navComplete', function() {
                var $sections = $('section');

                $.each($sections, function() {
                    var $section = $(this),
                        extraPadding = 0;

                    console.log($section);
                    if ($section.context.id === 'portfolio-container') {
                        extraPadding = 10;
                    }

                    // nav on top covers, add relative position to display properly
                    // toolbar on bottom covers, add margin to show everything
                    $section.css({
                        top : $('#nav-container nav').outerHeight() + extraPadding
                    });
                });
            });

            // Get Data
            if (((window.location.href.indexOf('localhost') > -1) && (window.location.href.indexOf('dist') > -1)) ||
                ((window.location.href.indexOf('dist') === -1) && (window.location.href.indexOf('build') === -1))) {
                console.log('use data.min.json');
                myApp.Tools.getData(myApp);
            } else {
                // Individual files uses for sections in 'build' (not concatenated into main.ms - require needed)
                require(['app/nav', 'app/about', 'app/resume', 'app/portfolio'], function() {
                    console.log('use individual data files (JSON)');
                    myApp.Tools.getSections();
                });
            }
        });
    }
);
