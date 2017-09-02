/* jshint esversion: 6 */
declare var window: any;
declare var requirejs: any;

import * as $ from "jquery";
import * as _ from "underscore";
import * as Handlebars from "handlebars";
import { App as myApp } from "./app/_namespace";

// export for others scripts to use
window.$ = $;
window._ = _;
window.Handlebars = Handlebars;

interface dataFiles {
	about: string;
	nav: string;
	portfolio: string;
	resume: string;
}

interface requireCfg {
	baseUrl: string;
	findNestedDependencies: boolean;
	paths: {
		app: string;
	};
}

class Setup {
	config: Object;

	constructor (data: dataFiles, requireCfg: requireCfg) {
		this.config = {
			data: data,
			'require-config': requireCfg
		};
	}

	init() {
		console.log('init()');
		requirejs.config(this.config['require-config']);
		console.log("myApp", myApp);
		requirejs(['app/main']);
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