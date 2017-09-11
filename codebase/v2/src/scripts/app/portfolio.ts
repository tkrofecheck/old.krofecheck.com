import { App as myApp } from './_namespace';
import { setData } from "./setData";
import { bindEvent } from "./bindEvent";
import { injectScript } from "./injectScript";

export interface HandlebarsTemplate {
	attr: {
		id: string,
		type: string
	},
	html: string
}
export class Portfolio {
	data: JSON;
	dataKey: string;
	el: string;
	error: any;
	HandlebarsTemplate: any;
	message: string;
	ready: boolean;
	url: string;

	constructor() {
		this.url = myApp.setup.config.files.portfolio;
		this.el = '#portfolio-container';
		this.dataKey = 'portfolio';
		this.ready = false;
	}

	get() {
		return this.data;
	}

	set() {
		setData(this);
	}

	prepare() {
		var _this = this;
		var hbTemplate: HandlebarsTemplate = {
			attr: {
				id: 'portfolio-template',
				type: 'text/x-handlebars-template'
			},
			html: ''.concat(
				'<div id="portfolio-projects" class="grid">',
				'{{#each projects}}',
				'{{#if this.display}}',
					/*'<h4>{{this.name}}</h4>',*/
					'{{#each this.steps}}',
						'<div class="grid-item tile-width{{#if this.width2}} tile-width-x2{{/if}}{{#if this.gigante}} gigante{{/if}}">',
						'<img src="images/portfolio/{{../this.folder}}/{{this.image}}?v=' + myApp.updated + '" />',
						'{{#if this.text}}<span>{{this.text}}</span>{{/if}}',
						'</div>',
					'{{/each}}',
				'{{/if}}',
				'{{/each}}',
				'</div>',
				'<div class="tile-settings">',
					'<div class="toolbar">',
						'<div class="header">Tools</div>',
						'<div class="buttons">',
							'<input id="size-normal" type="radio" name="size" value="normal" checked>',
							'<input id="size-tile2x" type="radio" name="size" value="tile2x" />',
							'<input id="size-gigante" type="radio" name="size" value="gigante" />',
							'<input id="remove-tiles" type="checkbox" name="remove" value="remove" />',
							'<input id="reload-tiles" type="button" name="reload-tiles" value="Reload Tiles"/>',
						'</div>',
					'</div>',
				'</div>'
			)
		};

		injectScript(hbTemplate).done(function($hbTemplate) {
			console.log('$hbTemplate', $hbTemplate);
		}).then(function() {
			_this.loaded();
		});
	}

	render() {
		var _this = this;

		console.log('render()', _this.constructor.name);

		// render code here
	}

	bindEvents() {
		var _this = this;
		var $window = $(window);
		var windowResize = function() {
			console.log('window resize', _this.constructor.name);
		}

		console.log('bindEvents()', _this.constructor.name);

		bindEvent($window, 'resize', windowResize);
	}

	loaded() {
		var _this = this;
		var callbacks = function() {
			_this.render();
			_this.bindEvents();
		}.bind(_this);

		myApp.docReady.add(callbacks);
		_this.ready = true;

		console.log('loaded()', _this.constructor.name);
	}
}