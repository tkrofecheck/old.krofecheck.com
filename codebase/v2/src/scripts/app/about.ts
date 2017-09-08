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
export class About {
	data: JSON;
	error: any;
	HandlebarsTemplate: any;
	message: string;
	updateOnDataSet: boolean;
	url: string;

	constructor() {
		this.url = myApp.setup.config.files.about;
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
		var hbTemplate = {
			attr : {
				id: 'about-template',
				type: 'text/x-handlebars-template' },
			html: ''.concat(
				'{{#each paragraphs}}',
	            '{{#if this.display}}',
	    			'<section class="bio">',
	    			'{{#if this.name}}',
	    				'<section class="name">{{this.name}}</section>',
	    			'{{/if}}',
	    			'{{#if this.image}}',
	    			'<div class="image-wrap">',
	    				'<img src="{{this.image}}?v=' + myApp.updated + '" alt="Photo: Tim Krofecheck"/>',
	    				'<h1>{{{this.person}}}</h1>',
	    			'</div>',
	    			'{{/if}}',
	    			'{{#if this.text}}',
	    				'<span>{{{this.text}}}</span>',
	    			'{{/if}}',
	    			'</section>',//bio
	            '{{/if}}',
	            '{{/each}}'
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