;(function($) {

	$.fn.headroom = function(options) {
		this.each(function() {
			var headroom = new Headroom(this, options);
			headroom.init();
		});
	};


	$('[data-headroom]').each(function() {
		$(this).headroom();
	});

}(window.Zepto || window.jQuery));