/**
 * UI enhancement for fixed headers.
 * Hides header when scrolling down
 * Shows header when scrolling up
 * @param {DOMElement} elem the header element
 */
function Headroom (elem) {
	this.elem = elem;
	this.debouncer = new Debouncer(this.update.bind(this));
	this.lastKnownScrollY = 0;
}
Headroom.prototype = {
	constructor : Headroom,

	/**
	 * Initialises the widget
	 */
	init : function() {
		this.elem.classList.add(Headroom.classes.default, Headroom.classes.pinned);

		// defer event registration to handle browser 
		// potentially restoring previous scroll position
		setTimeout(this.attachEvent.bind(this), 100);
	},

	/**
	 * Attaches the scroll event
	 */
	attachEvent : function() {
		this.eventHandler = this.debouncer.handleEvent.bind(this.debouncer);
		window.addEventListener('scroll', this.eventHandler, false);
	},

	/**
	 * Removes the event listener
	 */
	destroy : function() {
		window.removeEventListener('scroll', this.eventHandler, false);
		this.elem.classList.remove(Headroom.classes.unpinned, Headroom.classes.pinned);
	},
	
	/**
	 * Unpins the header if it's currently pinned
	 */
	unpin : function() {
		var elem = this.elem;

		if(elem.classList.contains(Headroom.classes.pinned)) {
			elem.classList.add(Headroom.classes.unpinned);
			elem.classList.remove(Headroom.classes.pinned);
		}
	},

	/**
	 * Pins the header if it's currently unpinned
	 */
	pin : function() {
		var elem = this.elem;

		if(elem.classList.contains(Headroom.classes.unpinned)) {
			elem.classList.remove(Headroom.classes.unpinned);
			elem.classList.add(Headroom.classes.pinned);
		}
	},

	/**
	 * Handles updating the state of the widget
	 */
	update : function() {
		var currentScrollY = window.scrollY;

		if(currentScrollY > this.lastKnownScrollY && currentScrollY > 0) { // Down (and not bouncing)
			this.unpin();
		}
		else if(currentScrollY < this.lastKnownScrollY) { // Up
			this.pin();
		}

		this.lastKnownScrollY = currentScrollY;
	}
	
};
/**
 * The CSS classes used by Headroom
 */
Headroom.classes = {
	pinned : 'headroom--pinned',
	unpinned : 'headroom--unpinned',
	default : 'headroom'
};