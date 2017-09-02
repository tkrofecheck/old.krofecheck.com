/* jshint esversion: 6 */

//Load Web App JavaScript Dependencies/Plugins
import { App as myApp } from './_namespace';
import { About } from './about';
import { Portfolio } from './portfolio';
import { Resume } from './resume';

export class Main {
	about: any;
	portfolio: any;
	resume: any;

	constructor() {
		var data = myApp.setup.config.data;
			
		this.about = new About(data.about);
		this.portfolio = new Portfolio(data.portfolio);
		this.resume = new Resume(data.resume);
	}

	init() {
		console.log('main loaded');
		this.about.init();
		this.portfolio.init();
		this.resume.init();
	}
}

myApp.main = new Main();
myApp.main.init();
