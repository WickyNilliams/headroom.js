/**
 * Helper function for extending objects
 */
function extend (object /*, objectN ... */) {
  if(arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }

  var result = object || { },
      key,
      i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || { };

    for (key in replacement) {
      if(typeof result[key] === 'object') {
        result[key] = extend(result[key], replacement[key]);
      } else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}

/**
 * UI enhancement for fixed headers.
 * Hides header when scrolling down
 * Shows header when scrolling up
 * @constructor
 * @param {DOMElement} elem the header element
 * @param {Object} options options for the widget
 */
function Headroom (elem, options) {
  options = extend(options, Headroom.options);

  this.lastKnownScrollY = 0;
  this.elem             = elem;
  this.debouncer        = new Debouncer(this.update.bind(this));
  this.tolerance        = options.tolerance;
  this.classes          = options.classes;
  this.offset           = options.offset;
  this.initialised      = false;
  this.onPin            = options.onPin;
  this.onUnpin          = options.onUnpin;
}
Headroom.prototype = {
  constructor : Headroom,

  /**
   * Initialises the widget
   */
  init : function() {
    if(!Headroom.cutsTheMustard) {
      return;
    }

    this.elem.classList.add(this.classes.initial);

    // defer event registration to handle browser 
    // potentially restoring previous scroll position
    setTimeout(this.attachEvent.bind(this), 100);
  },

  /**
   * Unattaches events and removes any classes that were added
   */
  destroy : function() {
    var classes = this.classes;

    this.initialised = false;
    window.removeEventListener('scroll', this.debouncer, false);
    this.elem.classList.remove(classes.unpinned, classes.pinned, classes.initial);
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
    var classList = this.elem.classList,
      classes = this.classes;

    classList.add(classes.unpinned);
    classList.remove(classes.pinned);

    this.onUnpin && this.onUnpin.call(this);
  },

  /**
   * Pins the header if it's currently unpinned
   */
  pin : function() {
    var classList = this.elem.classList,
      classes = this.classes;

    classList.remove(classes.unpinned);
    classList.add(classes.pinned);
    this.onPin && this.onPin.call(this);
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
      toleranceExceeded    = Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance,
      lastKnownScrollY = this.lastKnownScrollY;

    if(currentScrollY < 0 || currentScrollY + window.innerHeight > document.body.scrollHeight) { // Ignore bouncy scrolling in OSX
      return;
    }

    if(currentScrollY > lastKnownScrollY && currentScrollY >= this.offset && toleranceExceeded) {
      this.unpin();
    }
    else if((currentScrollY < lastKnownScrollY && toleranceExceeded) || currentScrollY <= this.offset) {
      this.pin();
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
Headroom.cutsTheMustard = features.rAF && features.bind && features.classList;
