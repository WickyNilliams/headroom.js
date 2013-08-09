;(function($) {

	$.fn.headroom = function(options) {
		this.each(function() {
			options = $.extend(true, {}, Headroom.options, options);
			var headroom = new Headroom(this, options);
			headroom.init();
		});
	};

	$('[data-headroom]').each(function() {
		$(this).headroom();
	});

}(window.Zepto || window.jQuery));