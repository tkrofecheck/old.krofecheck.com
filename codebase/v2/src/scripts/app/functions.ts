declare var $: any;
declare var _: any;

export function setData(me: any) {
	$.ajax({
		url: me.url,
		method: 'GET'
	}).fail(function(error) {
		me.error = error;
	}).done(function(data, message) {
		if (message === 'success') {
			me.data = data;
			console.log('setData done: ' + me.section);
			me.init();
		} else {
			me.data = { 'message' : message };
		}
	});
}

export function injectScript(obj: any) {
	var deferred = $.Deferred();
	var $script = $(document.createElement('script'));
	var scriptReady = function() {
		if (!$script.size()) {
			window.requestAnimationFrame(scriptReady);
			return;
		} else {
			deferred.resolve($script);
		}
	};

	$script.attr(obj.attr);
	$script.html(obj.html);

	$('head').append($script);

	scriptReady();

	return deferred.promise();
}

export function bindEvent(element: any, eventName: string, cb: any) {
	if (_.isString(element)) {
		$(element).on(eventName, cb);
	}

	if(_.isObject(element)) {
		element.on(eventName, cb);
	}
}