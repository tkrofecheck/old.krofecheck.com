/* jshint esversion: 6 */

import { App as myApp } from './_namespace';
import * as $ from 'jquery';
import * as _ from 'underscore';
import * as Handlebars from 'handlebars';

export class Resume {
	data: any;

	constructor() {
	}

	init() {
		console.log('resume loaded...', this);
	}
}