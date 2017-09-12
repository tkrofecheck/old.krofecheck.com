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
	ready: boolean;
	url: string;

	constructor() {
		this.url = myApp.setup.config.files.about;
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
	    			'</section>',/* bio */
	            '{{/if}}',
	            '{{/each}}'
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

		/* render code here */
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