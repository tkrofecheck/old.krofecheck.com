import { App as myApp } from './_namespace';

export const aboutTemplate = '' +
'{{#each paragraphs}}' +
	'{{#if this.display}}' +
		'<section class="bio">' +
		'{{#if this.name}}' +
			'<section class="name">{{this.name}}</section>' +
		'{{/if}}' +
		'{{#if this.image}}' +
		'<div class="image-wrap">' +
			'<img src="{{this.image}}" src="" alt="Photo: Tim Krofecheck"/>' +
			'<h1>{{{this.person}}}</h1>' +
		'</div>' +
		'{{/if}}' +
		'{{#if this.text}}' +
			'<span>{{{this.text}}}</span>' +
		'{{/if}}' +
		'</section>' +/* bio */
	'{{/if}}' +
'{{/each}}';

export const portfolioTemplate = '' +
'<div id="portfolio-projects" class="grid">' +
	'{{#each projects}}' +
	'{{#if this.display}}' +
		'<h4 data-project-index="{{@index}}">{{this.name}}</h4>' +
		'{{#each this.steps}}' +
			'<div class="grid-item-container {{#if_even @index}}even{{else}}odd{{/if_even}}" data-steps-index="{{@index}}">' +
			'<div class="grid-item tile-width out">' +
			'<img class="lazy" data-src="images/portfolio/{{../this.folder}}/{{this.image}}" src="" alt="Portfolio image: {{../this.folder}}/{{this.image}}"/>' +
			'{{#if this.text}}<span>{{this.text}}</span>{{/if}}' +
			'</div></div>' +
		'{{/each}}' +
	'{{/if}}' +
	'{{/each}}' +
'</div>';

export const resumeTemplate = '' +
'{{#each sections}}' +
	'{{#if this.display}}' +
	'<section class="main">' +
	'{{#if this.name}}' +
		'<h3 class="name">{{this.name}}</h3>' +
	'{{/if}}' +
	'{{#if this.text}}' +
		'<section class="text">{{this.text}}</section>' +
	'{{/if}}' +
	'{{#if this.jobs}}' +
		'<section class="jobs">' +
		'{{#each this.jobs}}' +
			'<section class="job">' +
			'{{#if this.company}}' +
				'<section class="company">{{this.company}}</section>' +
			'{{/if}}' +
			'{{#if this.city}}' +
				'<section class="city">{{this.city}}</section>' +
			'{{/if}}' +
			'{{#if this.role}}' +
				'<section class="role">' +
				'{{#if this.role.name}}' +
					'<div class="name">{{this.role.name}}</div>' +
				'{{/if}}' +
				'{{#if this.role.duration}}' +
					'<div class="duration">{{this.role.duration}}</div>' +
				'{{/if}}' +
				'{{#if this.role.items}}' +
					'<ul class="items">' +
					'{{#each this.role.items}}' +
						'<li>{{this}}</li>' +
					'{{/each}}' +
					'</ul>' +
				'{{/if}}' +
				'</section>' +/* role */
			'{{/if}}' +
			'</section>' +/* job */
		'{{/each}}' +
		'</section>' +/* jobs */
	'{{/if}}' +
	'{{#if this.college}}' +
		'<section class="college">' +
		'{{#if this.college.name}}' +
			'<section class="name">{{this.college.name}}</section>' +
		'{{/if}}' +
		'{{#if this.college.city}}' +
			'<section class="city">{{this.college.city}}</section>' +
		'{{/if}}' +
		'{{#if this.college.degrees}}' +
		'{{#each this.college.degrees}}' +
			'<section class="degree">' +
			'{{#if this.type}}' +
				'<section class="type">{{this.type}}</section>' +
			'{{/if}}' +
			'{{#if this.focus}}' +
				'<section class="focus">{{this.focus}}</section>' +
			'{{/if}}' +
			'{{#if this.year}}' +
				'<section class="year">{{this.year}}</section>' +
			'{{/if}}' +
			'</section>' +/* degree */
		'{{/each}}' +
		'{{/if}}' +
		'</section>' +/* college */
	'{{/if}}' +
	'</section>' +/* main */
	'{{/if}}' +
'{{/each}}';