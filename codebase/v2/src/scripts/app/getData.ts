/* jshint esversion: 6 */

export function getData(me: any) {
	$.ajax({
		url: me.url,
		method: 'GET'
	}).always(function(e) {
		me.always(e);
	}).fail(function(error) {
		me.error(error);
	}).done(function(data, message) {
		if (message === "success") {
			me.done(data);
		} else {
			console.log("getData done", message)
		}
	});
}