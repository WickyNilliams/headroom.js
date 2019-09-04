import { isBrowser } from "./features";
import trackScroll from "./trackScroll";

function normalizeTolerance(t) {
  return t === Object(t) ? t : { down: t, up: t };
}

/**
 * UI enhancement for fixed headers.
 * Hides header when scrolling down
 * Shows header when scrolling up
 * @constructor
 * @param {DOMElement} elem the header element
 * @param {Object} options options for the widget
 */
function Headroom(elem, options) {
  options = options || {};
  this.options = Object.assign({}, Headroom.options, options);
  Object.assign(
    this.options.classes,
    Headroom.options.classes,
    options.classes
  );

  this.elem = elem;
  this.tolerance = normalizeTolerance(this.options.tolerance);
  this.initialised = false;
  this.frozen = false;
}
Headroom.prototype = {
  constructor: Headroom,

  init: function() {
    this.elem.classList.add(this.options.classes.initial);

    // defer event registration to handle browser
    // potentially restoring previous scroll position
    setTimeout(this.attachEvent.bind(this), 100);

    return this;
  },

  destroy: function() {
    var classes = this.options.classes;

    this.initialised = false;

    for (var key in classes) {
      if (Object.prototype.hasOwnProperty.call(classes, key)) {
        this.elem.classList.remove(classes[key]);
      }
    }

    this.scrollTracker.destroy();
  },

  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent: function() {
    if (this.initialised) {
      return;
    }

    this.initialised = true;
    this.scrollTracker = trackScroll(
      this.options.scroller,
      this.update.bind(this)
    );
  },

  unpin: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (
      classList.contains(classes.pinned) ||
      !classList.contains(classes.unpinned)
    ) {
      classList.add(classes.unpinned);
      classList.remove(classes.pinned);
      if (this.options.onUnpin) {
        this.options.onUnpin.call(this);
      }
    }
  },

  pin: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (classList.contains(classes.unpinned)) {
      classList.remove(classes.unpinned);
      classList.add(classes.pinned);
      if (this.options.onPin) {
        this.options.onPin.call(this);
      }
    }
  },

  top: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (!classList.contains(classes.top)) {
      classList.add(classes.top);
      classList.remove(classes.notTop);
      if (this.options.onTop) {
        this.options.onTop.call(this);
      }
    }
  },

  notTop: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (!classList.contains(classes.notTop)) {
      classList.add(classes.notTop);
      classList.remove(classes.top);
      if (this.options.onNotTop) {
        this.options.onNotTop.call(this);
      }
    }
  },

  bottom: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (!classList.contains(classes.bottom)) {
      classList.add(classes.bottom);
      classList.remove(classes.notBottom);
      if (this.options.onBottom) {
        this.options.onBottom.call(this);
      }
    }
  },

  notBottom: function() {
    var classList = this.elem.classList;
    var classes = this.options.classes;

    if (!classList.contains(classes.notBottom)) {
      classList.add(classes.notBottom);
      classList.remove(classes.bottom);

      if (this.options.onNotBottom) {
        this.options.onNotBottom.call(this);
      }
    }
  },

  shouldUnpin: function(scrollY, lastScrollY, toleranceExceeded) {
    var scrollingDown = scrollY > lastScrollY;
    var pastOffset = scrollY >= this.options.offset;

    return scrollingDown && pastOffset && toleranceExceeded;
  },

  shouldPin: function(scrollY, lastScrollY, toleranceExceeded) {
    var scrollingUp = scrollY < lastScrollY;
    var pastOffset = scrollY <= this.options.offset;

    return (scrollingUp && toleranceExceeded) || pastOffset;
  },

  update: function(details) {
    var toleranceExceeded =
      details.distance > this.tolerance[details.direction];

    if (details.isOutOfBounds) {
      // Ignore bouncy scrolling in OSX
      return;
    }

    if (this.frozen === true) {
      return;
    }

    if (details.top) {
      this.top();
    } else {
      this.notTop();
    }

    if (details.bottom) {
      this.bottom();
    } else {
      this.notBottom();
    }

    if (
      this.shouldUnpin(details.scrollY, details.lastScrollY, toleranceExceeded)
    ) {
      this.unpin();
    } else if (
      this.shouldPin(details.scrollY, details.lastScrollY, toleranceExceeded)
    ) {
      this.pin();
    }
  },

  /**
   * Freezes the current state of the widget
   */
  freeze: function() {
    this.frozen = true;
    this.elem.classList.add(this.options.classes.frozen);
  },

  /**
   * Re-enables the default behaviour of the widget
   */
  unfreeze: function() {
    this.frozen = false;
    this.elem.classList.remove(this.options.classes.frozen);
  }
};

/**
 * Default options
 * @type {Object}
 */
Headroom.options = {
  tolerance: {
    up: 0,
    down: 0
  },
  offset: 0,
  scroller: isBrowser() ? window : null,
  classes: {
    frozen: "headroom--frozen",
    pinned: "headroom--pinned",
    unpinned: "headroom--unpinned",
    top: "headroom--top",
    notTop: "headroom--not-top",
    bottom: "headroom--bottom",
    notBottom: "headroom--not-bottom",
    initial: "headroom"
  }
};

export default Headroom;
