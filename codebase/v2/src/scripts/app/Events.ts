import { App as myApp } from './_namespace';
import { bindEvent } from "./bindEvent";

export function Events() {
	/* Bind all events here */
	var _this = this;
	var $window = $(window);
	var $body = $('body');

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
	};

	var resumeEvents = function() {
		console.log('bind resume events');
	};

	myApp.docReady.add(headerEvents);
	myApp.docReady.add(aboutEvents);
	myApp.docReady.add(portfolioEvents);
	myApp.docReady.add(resumeEvents);
}