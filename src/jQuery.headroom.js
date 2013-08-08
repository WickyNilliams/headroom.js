;(function($) {

	$.fn.headroom = function() {
		this.each(function() {
			var headroom = new Headroom(this);
			headroom.init();
		});
	};


	$('[data-headroom]').each(function() {
		$(this).headroom();
	});

}(window.Zepto || window.jQuery));