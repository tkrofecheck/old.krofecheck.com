/* jshint esversion: 6 */

import { App as myApp } from './_namespace';
import { getData } from "./getData";

export class Resume {
	data: any;
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	init() {
		console.log('resume loaded...', this);
		getData(this);
	}

	fail(error: any) {
		console.log('error getting resume data');
		this.data = null;
	}

	always(e, data) {
	}

	done(data: JSON) {
		this.data = data;
	}
}