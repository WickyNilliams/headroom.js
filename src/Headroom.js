import { isBrowser, isSupported } from "./features";
import trackScroll from "./trackScroll";

function normalizeUpDown(t) {
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
  Object.assign(this, Headroom.options, options);
  this.classes = Object.assign({}, Headroom.options.classes, options.classes);

  this.elem = elem;
  this.tolerance = normalizeUpDown(this.tolerance);
  this.offset = normalizeUpDown(this.offset);
  this.initialised = false;
  this.frozen = false;
}
Headroom.prototype = {
  constructor: Headroom,

  /**
   * Start listening to scrolling
   * @public
   */
  init: function() {
    if (Headroom.cutsTheMustard && !this.initialised) {
      this.addClass("initial");
      this.initialised = true;

      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(
        function(self) {
          self.scrollTracker = trackScroll(
            self.scroller,
            { offset: self.offset, tolerance: self.tolerance },
            self.update.bind(self)
          );
        },
        100,
        this
      );
    }

    return this;
  },

  /**
   * Destroy the widget, clearing up after itself
   * @public
   */
  destroy: function() {
    this.initialised = false;
    Object.keys(this.classes).forEach(this.removeClass, this);
    this.scrollTracker.destroy();
  },

  /**
   * Unpin the element
   * @public
   */
  unpin: function() {
    if (this.hasClass("pinned") || !this.hasClass("unpinned")) {
      this.addClass("unpinned");
      this.removeClass("pinned");

      if (this.onUnpin) {
        this.onUnpin.call(this);
      }
    }
  },

  /**
   * Pin the element
   * @public
   */
  pin: function() {
    if (this.hasClass("unpinned")) {
      this.addClass("pinned");
      this.removeClass("unpinned");

      if (this.onPin) {
        this.onPin.call(this);
      }
    }
  },

  /**
   * Freezes the current state of the widget
   * @public
   */
  freeze: function() {
    this.frozen = true;
    this.addClass("frozen");
  },

  /**
   * Re-enables the default behaviour of the widget
   * @public
   */
  unfreeze: function() {
    this.frozen = false;
    this.removeClass("frozen");
  },

  top: function() {
    if (!this.hasClass("top")) {
      this.addClass("top");
      this.removeClass("notTop");

      if (this.onTop) {
        this.onTop.call(this);
      }
    }
  },

  notTop: function() {
    if (!this.hasClass("notTop")) {
      this.addClass("notTop");
      this.removeClass("top");

      if (this.onNotTop) {
        this.onNotTop.call(this);
      }
    }
  },

  bottom: function() {
    if (!this.hasClass("bottom")) {
      this.addClass("bottom");
      this.removeClass("notBottom");

      if (this.onBottom) {
        this.onBottom.call(this);
      }
    }
  },

  notBottom: function() {
    if (!this.hasClass("notBottom")) {
      this.addClass("notBottom");
      this.removeClass("bottom");

      if (this.onNotBottom) {
        this.onNotBottom.call(this);
      }
    }
  },

  shouldUnpin: function(details) {
    var scrollingDown = details.direction === "down";

    return scrollingDown && !details.top && details.toleranceExceeded;
  },

  shouldPin: function(details) {
    var scrollingUp = details.direction === "up";

    return (scrollingUp && details.toleranceExceeded) || details.top;
  },

  addClass: function(className) {
    this.elem.classList.add.apply(
      this.elem.classList,
      this.classes[className].split(" ")
    );
  },

  removeClass: function(className) {
    this.elem.classList.remove.apply(
      this.elem.classList,
      this.classes[className].split(" ")
    );
  },

  hasClass: function(className) {
    return this.classes[className].split(" ").every(function(cls) {
      return this.classList.contains(cls);
    }, this.elem);
  },

  update: function(details) {
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

    if (this.shouldUnpin(details)) {
      this.unpin();
    } else if (this.shouldPin(details)) {
      this.pin();
    }
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

Headroom.cutsTheMustard = isSupported();

export default Headroom;
