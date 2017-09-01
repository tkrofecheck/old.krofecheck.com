/* jshint esversion: 6 */

declare var requirejs: any;

import { App as myApp } from './app/_namespace';

export interface dataFiles {
	about: string;
	nav: string;
	portfolio: string;
	resume: string;
}

export interface requireCfg {
	baseUrl: string;
	findNestedDependencies: boolean;
	paths: {
		app: string;
	};
}

export class Setup {
	config: Object;

	constructor (data: dataFiles, requireCfg: requireCfg) {
		this.config = {
			data: data,
			'require-config': requireCfg
		};
	}

	init() {
		console.log('init()', this);
		requirejs.config(this.config['require-config']);
		requirejs(['app/main']);
		console.log('myApp', myApp);
	}
}

myApp.setup = new Setup(
	{
		about: 'data/about.json',
		nav: 'data/nav.json',
		portfolio: 'data/portfolio.json',
		resume: 'data/resume.json'
	}, {
		baseUrl: 'scripts',
		findNestedDependencies: true,
		paths : {
			app: 'app'
		}
	}
);

myApp.setup.init();