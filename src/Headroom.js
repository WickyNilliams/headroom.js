/**
 * Helper function for extending objects
 */
function extend (object /*, objectN ... */) {
  if(arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }

  var result = object || {},
      key,
      i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};

    for (key in replacement) {
      if(typeof result[key] === 'object') {
        result[key] = extend(result[key], replacement[key]);
      }
      else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}

/**
 * Helper function for normalizing tolerance option to object format
 */
function normalizeTolerance (t) {
  return t === Object(t) ? t : { down : t, up : t };
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
  this.tolerance        = normalizeTolerance(options.tolerance);
  this.classes          = options.classes;
  this.offset           = options.offset;
  this.initialised      = false;
  this.onPin            = options.onPin;
  this.onUnpin          = options.onUnpin;
  this.onTop            = options.onTop;
  this.onNotTop         = options.onNotTop;
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

    return this;
  },

  /**
   * Unattaches events and removes any classes that were added
   */
  destroy : function() {
    var classes = this.classes;

    this.detachEvent();
    this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.initial);
  },

  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent : function() {
    if(!this.initialised){
      this.lastKnownScrollY = this.getScrollY();
      this.initialised = true;
      window.addEventListener('scroll', this.debouncer, false);

      this.debouncer.handleEvent();
    }
  },

  /**
   * Detaches the scroll event
   * @private
   */
  detachEvent : function() {
    window.removeEventListener('scroll', this.debouncer, false);
    this.initialised = false;
  },

  /**
   * Unpins the header if it's currently pinned
   */
  unpin : function() {
    var classList = this.elem.classList,
      classes = this.classes;
    
    if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
      classList.add(classes.unpinned);
      classList.remove(classes.pinned);
      this.onUnpin && this.onUnpin.call(this);
    }
  },

  /**
   * Pins the header if it's currently unpinned
   */
  pin : function() {
    var classList = this.elem.classList,
      classes = this.classes;
    
    if(classList.contains(classes.unpinned)) {
      classList.remove(classes.unpinned);
      classList.add(classes.pinned);
      this.onPin && this.onPin.call(this);
    }
  },

  /**
   * Handles the top states
   */
  top : function() {
    var classList = this.elem.classList,
      classes = this.classes;
    
    if(!classList.contains(classes.top)) {
      classList.add(classes.top);
      classList.remove(classes.notTop);
      this.onTop && this.onTop.call(this);
    }
  },

  /**
   * Handles the not top state
   */
  notTop : function() {
    var classList = this.elem.classList,
      classes = this.classes;
    
    if(!classList.contains(classes.notTop)) {
      classList.add(classes.notTop);
      classList.remove(classes.top);
      this.onNotTop && this.onNotTop.call(this);
    }
  },

  /**
   * Gets the Y scroll position
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
   * @return {Number} pixels the page has scrolled along the Y-axis
   */
  getScrollY : function() {
    return (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  },

  /**
   * Gets the height of the viewport
   * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
   * @return {int} the height of the viewport in pixels
   */
  getViewportHeight : function () {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  },

  /**
   * Gets the height of the document
   * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
   * @return {int} the height of the document in pixels
   */
  getDocumentHeight : function () {
    var body = document.body,
      documentElement = document.documentElement;

    return Math.max(
        body.scrollHeight, documentElement.scrollHeight,
        body.offsetHeight, documentElement.offsetHeight,
        body.clientHeight, documentElement.clientHeight
    );
  },

  /**
   * determines if the scroll position is outside of document boundaries
   * @param  {int}  currentScrollY the current y scroll position
   * @return {bool} true if out of bounds, false otherwise
   */
  isOutOfBounds : function (currentScrollY) {
    var pastTop  = currentScrollY < 0,
      pastBottom = currentScrollY + this.getViewportHeight() > this.getDocumentHeight();
    
    return pastTop || pastBottom;
  },

  /**
   * determines if the tolerance has been exceeded
   * @param  {int} currentScrollY the current scroll y position
   * @return {bool} true if tolerance exceeded, false otherwise
   */
  toleranceExceeded : function (currentScrollY, direction) {
    return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
  },

  /**
   * determine if it is appropriate to unpin
   * @param  {int} currentScrollY the current y scroll position
   * @param  {bool} toleranceExceeded has the tolerance been exceeded?
   * @return {bool} true if should unpin, false otherwise
   */
  shouldUnpin : function (currentScrollY, toleranceExceeded) {
    var scrollingDown = currentScrollY > this.lastKnownScrollY,
      pastOffset = currentScrollY >= this.offset;

    return scrollingDown && pastOffset && toleranceExceeded;
  },

  /**
   * determine if it is appropriate to pin
   * @param  {int} currentScrollY the current y scroll position
   * @param  {bool} toleranceExceeded has the tolerance been exceeded?
   * @return {bool} true if should pin, false otherwise
   */
  shouldPin : function (currentScrollY, toleranceExceeded) {
    var scrollingUp  = currentScrollY < this.lastKnownScrollY,
      pastOffset = currentScrollY <= this.offset;

    return (scrollingUp && toleranceExceeded) || pastOffset;
  },

  /**
   * Handles updating the state of the widget
   */
  update : function() {
    var currentScrollY  = this.getScrollY(),
      scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
      toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

    if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
      return;
    }

    if (currentScrollY <= this.offset ) {
      this.top();
    } else {
      this.notTop();
    }

    if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
      this.unpin();
    }
    else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
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
  tolerance : {
    up : 0,
    down : 0
  },
  offset : 0,
  classes : {
    pinned : 'headroom--pinned',
    unpinned : 'headroom--unpinned',
    top : 'headroom--top',
    notTop : 'headroom--not-top',
    initial : 'headroom'
  }
};
Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;
