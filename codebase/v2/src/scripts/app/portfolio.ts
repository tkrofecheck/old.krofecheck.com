/* jshint esversion: 6 */

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
	updateOnDataSet: boolean;
	url: string;

	constructor() {
		this.url = myApp.setup.config.files.portfolio;
		this.el = '#portfolio-container';
		this.dataKey = 'portfolio';
	}

	get() {
		return this.data;
	}

	set(updateOnDataSet: boolean) {
		this.updateOnDataSet = updateOnDataSet;
		setData(this);
	}

	updateDOM() {
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

		if (_this.message !== 'success') {
			return;
		} else {
			console.log('updateDOM: ' + _this.constructor.name);

			// Inject Handlebars Template into <head>
			injectScript(hbTemplate).done(function($hbTemplate) {
				console.log('$hbTemplate', $hbTemplate);
			}).then(function() {
				_this.bindEvents();
			});
		}
	}

	bindEvents() {
		var $window = $(window);
		var windowResize = function() {
			console.log('window resize');
		}

		bindEvent($window, 'resize', windowResize);
	}
}