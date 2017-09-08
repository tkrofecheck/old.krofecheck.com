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
export class Resume {
	data: JSON;
	error: any;
	HandlebarsTemplate: any;
	message: string;
	updateOnDataSet: boolean;
	url: string;

	constructor() {
		this.url = myApp.setup.config.files.resume;
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
				id: 'resume-template',
				type: 'text/x-handlebars-template' },
			html: ''.concat(
	            '{{#each sections}}',
	            '{{#if this.display}}',
	            '<section class="main">',
	            '{{#if this.name}}',
	            	'<h3 class="name">{{this.name}}</h3>',
	            '{{/if}}',
	            '{{#if this.text}}',
	            	'<section class="text">{{this.text}}</section>',
	            '{{/if}}',
	            '{{#if this.jobs}}',
	            	'<section class="jobs">',
	            	'{{#each this.jobs}}',
		            	'<section class="job">',
		            	'{{#if this.company}}',
		            		'<section class="company">{{this.company}}</section>',
		            	'{{/if}}',
		            	'{{#if this.city}}',
		            		'<section class="city">{{this.city}}</section>',
		            	'{{/if}}',
		            	'{{#if this.role}}',
		            		'<section class="role">',
		            		'{{#if this.role.name}}',
		            			'<div class="name">{{this.role.name}}</div>',
		            		'{{/if}}',
		            		'{{#if this.role.duration}}',
		            			'<div class="duration">{{this.role.duration}}</div>',
		            		'{{/if}}',
		            		'{{#if this.role.items}}',
		            			'<ul class="items">',
		            			'{{#each this.role.items}}',
		            				'<li>{{this}}</li>',
		        				'{{/each}}',
		            			'</ul>',
		            		'{{/if}}',
		        			'</section>',//role
		        		'{{/if}}',
		        		'</section>',//job
	        		'{{/each}}',
	        		'</section>',//jobs
	        	'{{/if}}',
	        	'{{#if this.college}}',
	        		'<section class="college">',
	        		'{{#if this.college.name}}',
	        			'<section class="name">{{this.college.name}}</section>',
	        		'{{/if}}',
	        		'{{#if this.college.city}}',
	        			'<section class="city">{{this.college.city}}</section>',
	        		'{{/if}}',
	        		'{{#if this.college.degrees}}',
	        		'{{#each this.college.degrees}}',
	        			'<section class="degree">',
	        			'{{#if this.type}}',
	        				'<section class="type">{{this.type}}</section>',
	        			'{{/if}}',
	        			'{{#if this.focus}}',
	        				'<section class="focus">{{this.focus}}</section>',
	        			'{{/if}}',
	        			'{{#if this.year}}',
	        				'<section class="year">{{this.year}}</section>',
	        			'{{/if}}',
	        			'</section>',//degree
	        		'{{/each}}',
	        		'{{/if}}',
	        		'</section>',//college
	        	'{{/if}}',
	            '</section>',//main
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