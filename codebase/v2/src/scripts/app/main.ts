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
		console.log('new Main()');
		this.about = new About();
		this.portfolio = new Portfolio();
		this.resume = new Resume();
	}

	init() {
		this.about.set(true);
		this.portfolio.set(true);
		this.resume.set(true);
	}
}

myApp.main = new Main();
myApp.main.init();
