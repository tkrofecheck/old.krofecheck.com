/* jshint esversion: 6 */

declare var $: any;

export module Utils {
	export class data {
		fetch(me: any) {
			$.ajax({
				url: me.url,
				method: 'GET'
			}).success(function(e, data) {
				me.success(e, data);
			}).error(function(error) {
				me.error(error);
			}).done(function(e, data) {
				me.done(e, data);
			});
		}
	}
}