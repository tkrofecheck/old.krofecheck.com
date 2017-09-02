/* jshint esversion: 6 */

import { App as myApp } from './_namespace';
import { getData } from "./getData";

export class Portfolio {
	el: string;
	data: any;
	dataKey: string;
	HandlebarsTemplate: any;
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	init() {
		getData(this);
		console.log('portfolio loaded...', this);
	}

	fail(error: any) {
		console.log('error getting portfolio data');
		this.data = null;
	}

	always(e, data) {
	}

	done(data: JSON) {
    	this.data = data;
		this.el = '#portfolio-container';
		this.dataKey = 'portfolio';
		this.HandlebarsTemplate = {
			attr: {
				'id': 'portfolio-template',
				'type': 'text/x-handlebars-template'
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
	}
}