/**
 * UI enhancement for fixed headers.
 * Hides header when scrolling down
 * Shows header when scrolling up
 * @constructor
 * @param {DOMElement} elem the header element
 * @param {Object} options options for the widget
 */
function Headroom (elem, options) {
  options = options || Headroom.options;

  this.lastKnownScrollY = 0;
  this.elem             = elem;
  this.debouncer        = new Debouncer(this.update.bind(this));
  this.tolerance        = options.tolerance;
  this.classes          = options.classes;
  this.offset           = options.offset;
  this.initialised      = false;
}
Headroom.prototype = {
  constructor : Headroom,

  /**
   * Initialises the widget
   */
  init : function() {
    this.elem.classList.add(this.classes.initial);

    // defer event registration to handle browser 
    // potentially restoring previous scroll position
    setTimeout(this.attachEvent.bind(this), 100);
  },

  /**
   * Unattaches events and removes any classes that were added
   */
  destroy : function() {
    this.initialised = false;
    window.removeEventListener('scroll', this.debouncer, false);
    this.elem.classList.remove(this.classes.unpinned, this.classes.pinned, this.classes.initial);
  },

  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent : function() {
    if(!this.initialised){
      this.initialised = true;
      window.addEventListener('scroll', this.debouncer, false);
    }
  },
  
  /**
   * Unpins the header if it's currently pinned
   */
  unpin : function() {
    this.elem.classList.add(this.classes.unpinned);
    this.elem.classList.remove(this.classes.pinned);
  },

  /**
   * Pins the header if it's currently unpinned
   */
  pin : function() {
    this.elem.classList.remove(this.classes.unpinned);
    this.elem.classList.add(this.classes.pinned);
  },

  /**
   * Gets the Y scroll position
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
   * @return {Number} pixels the page has scrolled along the Y-axis
   */
  getScrollY : function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  },

  /**
   * Handles updating the state of the widget
   */
  update : function() {
    var currentScrollY     = this.getScrollY(),
      toleranceExceeded    = Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance;

    if(currentScrollY < 0) { // Ignore bouncy scrolling in OSX
      return;
    }

    if(toleranceExceeded) {
      if(currentScrollY > this.lastKnownScrollY && currentScrollY >= this.offset) {
        this.unpin();
      }
      else if(currentScrollY < this.lastKnownScrollY) {
        this.pin();
      }
    }

    this.lastKnownScrollY = currentScrollY;
  }
};
/**
 * Default options
 * @type {Object}
 */
Headroom.options = {
  tolerance : 0,
  offset: 0,
  classes : {
    pinned : 'headroom--pinned',
    unpinned : 'headroom--unpinned',
    initial : 'headroom'
  }
};