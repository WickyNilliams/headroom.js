import { isBrowser, isSupported } from "./features";
import trackScroll from "./trackScroll";

function normalizeTolerance(t) {
  return t === Object(t) ? t : { down: t, up: t };
}

/**
 * Default options
 * @type {Object}
 */
var defaultOptions = {
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

/**
 * UI enhancement for fixed headers.
 * Hides header when scrolling down
 * Shows header when scrolling up
 * @param {HTMLElement} elem the element
 * @param {Object} options options for the widget
 */
function headroom(element, options) {
  options = Object.assign({}, defaultOptions, options);
  options.classes = Object.assign({}, defaultOptions.classes, options.classes);
  options.tolerance = normalizeTolerance(options.tolerance);

  var frozen = false;

  addClass("initial");

  var scrollTracker = trackScroll(
    options.scroller,
    { offset: options.offset, tolerance: options.tolerance },
    update
  );

  function addClass(className) {
    element.classList.add(options.classes[className]);
  }

  function removeClass(className) {
    element.classList.remove(options.classes[className]);
  }

  function hasClass(className) {
    return element.classList.contains(options.classes[className]);
  }

  function top() {
    if (!hasClass("top")) {
      addClass("top");
      removeClass("notTop");

      if (options.onTop) {
        options.onTop.call(this);
      }
    }
  }

  function notTop() {
    if (!hasClass("notTop")) {
      addClass("notTop");
      removeClass("top");

      if (options.onNotTop) {
        options.onNotTop.call(this);
      }
    }
  }

  function bottom() {
    if (!hasClass("bottom")) {
      addClass("bottom");
      removeClass("notBottom");

      if (options.onBottom) {
        options.onBottom.call(this);
      }
    }
  }

  function notBottom() {
    if (!hasClass("notBottom")) {
      addClass("notBottom");
      removeClass("bottom");

      if (options.onNotBottom) {
        options.onNotBottom.call(this);
      }
    }
  }

  function shouldUnpin(details) {
    var scrollingDown = details.direction === "down";
    return scrollingDown && !details.top && details.toleranceExceeded;
  }

  function shouldPin(details) {
    var scrollingUp = details.direction === "up";
    return (scrollingUp && details.toleranceExceeded) || details.top;
  }

  function destroy() {
    Object.keys(options.classes).forEach(removeClass);
    scrollTracker.destroy();
  }

  function unpin() {
    if (hasClass("pinned") || !hasClass("unpinned")) {
      addClass("unpinned");
      removeClass("pinned");

      if (options.onUnpin) {
        options.onUnpin.call(this);
      }
    }
  }

  function pin() {
    if (hasClass("unpinned")) {
      addClass("pinned");
      removeClass("unpinned");

      if (options.onPin) {
        options.onPin.call(this);
      }
    }
  }

  function freeze() {
    frozen = true;
    addClass("frozen");
  }

  function unfreeze() {
    frozen = false;
    removeClass("frozen");
  }

  function update(details) {
    if (details.isOutOfBounds) {
      // Ignore bouncy scrolling in OSX
      return;
    }

    if (frozen === true) {
      return;
    }

    if (details.top) {
      top();
    } else {
      notTop();
    }

    if (details.bottom) {
      bottom();
    } else {
      notBottom();
    }

    if (shouldUnpin(details)) {
      unpin();
    } else if (shouldPin(details)) {
      pin();
    }
  }

  return {
    /**
     * Pin the element
     */
    pin: pin,
    /**
     * Unpin the element
     */
    unpin: unpin,
    /**
     * Freezes the current state of the widget
     */
    freeze: freeze,
    /**
     * Re-enables the default behaviour of the widget
     */
    unfreeze: unfreeze,
    /**
     * Destroy the widget, clearing up after itself
     */
    destroy: destroy
  };
}

headroom.options = defaultOptions;
headroom.isSupported = isSupported();

export default headroom;
