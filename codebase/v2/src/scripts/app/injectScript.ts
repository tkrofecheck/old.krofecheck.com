declare var $: any;

export function injectScript(obj: any) {
	var deferred = $.Deferred();

	var $script = $(document.createElement('script'));

	$script.attr(obj.attr);
	$script.html(obj.html);

	$('head').append($script);

	var checkScriptInt = setInterval(function() {
		if ($script.size()) {
			deferred.resolve($script);
			clearInterval(checkScriptInt);
		}
	}, 10);

	return deferred.promise();
}