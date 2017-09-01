/* jshint esversion: 6 */

//Load Web App JavaScript Dependencies/Plugins
import { App as myApp } from './_namespace';
import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Handlebars from 'handlebars';
import { About } from './about';
import { Portfolio } from './portfolio';
import { Resume } from './resume';

export class Main {
	about: any;
	portfolio: any;
	resume: any;

	constructor() {
		this.about = new About();
		this.portfolio = new Portfolio('test.html');
		this.resume = new Resume();
	}

	init() {
		console.log('main loaded', this);
		this.about.init();
		this.portfolio.init();
		this.resume.init();
		console.log('$', $);
		console.log('_', _);
		console.log('Handlebars', Handlebars);
	}
}

myApp.main = new Main();
myApp.main.init();
