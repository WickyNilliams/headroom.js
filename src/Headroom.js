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
    window.removeEventListener('scroll', this.eventHandler, false);
    this.eventHandler = null;
    this.elem.classList.remove(this.classes.unpinned, this.classes.pinned, this.classes.initial);
  },

  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent : function() {
    if(!this.eventHandler){
      this.eventHandler = this.debouncer.handleEvent.bind(this.debouncer);
      window.addEventListener('scroll', this.eventHandler, false);
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
   * Handles updating the state of the widget
   */
  update : function() {
    var currentScrollY     = window.scrollY,
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