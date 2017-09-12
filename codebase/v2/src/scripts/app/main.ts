/* Load Web App JavaScript Dependencies/Plugins */
import { App as myApp } from './_namespace';
import { documentReady } from './documentReady';
import { About } from './about';
import { Portfolio } from './portfolio';
import { Resume } from './resume';
import { bindEvent } from "./bindEvent";

export class Main {
	about: any;
	docReady: any;
	portfolio: any;
	resume: any;

	constructor() {
		console.log('new Main()');
		this.about = new About();
		this.portfolio = new Portfolio();
		this.resume = new Resume();
	}

	init() {
		this.about.set();
		this.portfolio.set();
		this.resume.set();
		this.bindEvents();
		this.complete();
	}

	bindEvents() {
		var _this = this;
		var $window = $(window);
		var $body = $('body');
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

		bindEvent($window, 'resize', adjustHeaderMenu);

		myApp.docReady.add(adjustHeaderMenu);
	}

	complete() {
		var _this = this;
		var done = function() {
			if (!_this.about.ready || !_this.resume.ready || !_this.portfolio.ready) {
				window.requestAnimationFrame(done);
				return;
			} else {
				myApp.docReady.exec();
			}
		}

		done();
	}
}

myApp.main = new Main();
myApp.main.init();
