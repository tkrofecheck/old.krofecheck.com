declare var require: any;
declare var $: any;

import 'jquery-lazy';
import 'autolink';
import { App as myApp } from './_namespace';
import { bindEvent } from './functions';

export function Events() {
	/* Bind all events here */
	var _this = this;
	var $window = $(window);
	var $body = $('body');
	var placeholderBase64image = 'data:image/png;base64,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';

	var headerEvents = function() {
		var $header = $body.find('.header');
		var $headerMenu = $header.find('.menu');
		var $headerMenuItem = $headerMenu.find('.item');

		var adjustHeaderMenu = function() {
			if ($window.width() <= 320) {
				$headerMenu.addClass('menu--state-collapse').removeClass('menu--state-expand');
			} else {
				$headerMenu.removeClass('menu--state-collapse').addClass('menu--state-expand');
			}

			return;
		};

		adjustHeaderMenu();
		bindEvent($window, 'resize', adjustHeaderMenu);

		console.log('bind header events');
	};

	var aboutEvents = function() {
		console.log('bind about events');
	};

	var portfolioEvents = function() {
		console.log('bind portfolio events');
		var $portfolio = $('#portfolio');
		var $gridItem = $portfolio.find('.grid-item');
		var $lazyImages = $gridItem.find('img.lazy');

		$gridItem.autolink();

		/* jQuery Lazy Info : http://jquery.eisbehr.de/lazy/ */
		$lazyImages.Lazy({ // your configuration goes here
			bind: 'event',
			chainable: false,
			combined: true,
			effect: 'show',
			effectTime: 0, /* milliseconds */
			enableThrottle: true,
			placeholder: null, // off-screen before load - no need for this
			scrollDirection: 'vertical',
			threshold: -80, /* pixels */
			throttle: 0, /* milliseconds */
			visibleOnly: true,
			beforeLoad: function(element) {
				// called before an elements gets handled
				console.log('before load ' + element.data('src'));
			},
			afterLoad: function(element) {
				// called after an element was successfully handled
				element.parent().removeClass('out').addClass('in');
				console.log('after load ' + element.data('src'));
			},
			onError: function(element) {
				element.attr('src', placeholderBase64image).css({'width': '100%', 'height': 'auto'}); // placeholder for image error
				element.parent().removeClass('out').addClass('in');
				console.log('error loading ' + element.data('src'));
			},
			onFinishedAll: function() {
				// called once all elements was handled
				console.log('finished loading portfolio');
			}
		});
	};

	var resumeEvents = function() {
		console.log('bind resume events');
	};

	var mainEvents = function() {
		console.log('bind main events');
	};

	myApp.docReady.add(headerEvents);
	myApp.docReady.add(aboutEvents);
	myApp.docReady.add(portfolioEvents);
	myApp.docReady.add(resumeEvents);
	myApp.docReady.add(mainEvents);
}