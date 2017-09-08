/* jshint esversion: 6 */
declare var $: any;

export function setData(me: any) {
	$.ajax({
		url: me.url,
		method: 'GET'
	}).fail(function(error) {
		me.error = error;
	}).done(function(data, message) {
		me.message = message;
		if (message === 'success') {
			me.data = data;
			console.log('setData done: ' + me.constructor.name);

			if (me.updateOnDataSet === true) {
				me.updateDOM();
			}
		} else {
			me.data = { 'message' : message };
		}
	});
}