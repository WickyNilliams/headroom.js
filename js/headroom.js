/*jshint laxbreak:true, devel:true, expr:true */
/*global requestAnimationFrame:false*/

(function(win, doc, $) {

	var target           = document.querySelector("[data-headroom]"),
		lastKnownScrollY = 0,
		ticking          = false;

	target.classList.add("headroom", "headroom--pinned");

	//TODO: separate debounce/rAF logic from other logic

	function update() {

		var currentScrollY = window.scrollY;

		//TODO: handles smooth scrolling bounciness at y == 0 and y == document.height

		if(currentScrollY > lastKnownScrollY) { // DOWN
			if(target.classList.contains("headroom--pinned")) {
				target.classList.add("headroom--unpinned");
				target.classList.remove("headroom--pinned");
			}
		}
		else if(currentScrollY < lastKnownScrollY) { // UP
			if(target.classList.contains("headroom--unpinned")) {
				target.classList.remove("headroom--unpinned");
			}
			target.classList.add("headroom--pinned");
		}

		lastKnownScrollY = currentScrollY;
		ticking = false;
	}

	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
			ticking = true;
		}
	}

	function onScroll() {
		update();
		requestTick();
	}

	// defer event registration to handle browser 
	// potentially restoring previous scroll position
	setTimeout(function() {
		window.addEventListener('scroll', onScroll, false);
	}, 100);

}(window, document, window.jQuery));