/* jshint esversion: 6 */

import { App as myApp } from './_namespace';
import { getData } from "./getData";

export class About {
	data: any;
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	init() {
		console.log('about loaded...', this);
		getData(this);
	}

	fail(error: any) {
		console.log('error getting about data');
		this.data = null;
	}

	always(e, data) {
	}

	done(data: JSON) {
		this.data = data;
	}
}