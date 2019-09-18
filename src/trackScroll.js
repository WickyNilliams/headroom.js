import createScroller from "./scroller";
import { passiveEventsSupported } from "./features";

/**
 * @param element EventTarget
 */
export default function trackScroll(element, options, callback) {
  var isPassiveSupported = passiveEventsSupported();
  var rafId;
  var scrolled = false;
  var scroller = createScroller(element);
  var lastScrollY = scroller.scrollY();
  var details = {};

  function update() {
    var scrollY = Math.round(scroller.scrollY());
    var height = scroller.height();
    var scrollHeight = scroller.scrollHeight();

    // reuse object for less memory churn
    details.scrollY = scrollY;
    details.lastScrollY = lastScrollY;
    details.direction = scrollY > lastScrollY ? "down" : "up";
    details.distance = Math.abs(scrollY - lastScrollY);
    details.isOutOfBounds = scrollY < 0 || scrollY + height > scrollHeight;
    details.top = scrollY <= options.offset;
    details.bottom = scrollY + height >= scrollHeight;
    details.toleranceExceeded =
      details.distance > options.tolerance[details.direction];

    callback(details);

    lastScrollY = scrollY;
    scrolled = false;
  }

  function handleScroll() {
    if (!scrolled) {
      scrolled = true;
      rafId = requestAnimationFrame(update);
    }
  }

  var eventOptions = isPassiveSupported
    ? { passive: true, capture: false }
    : false;
  element.addEventListener("scroll", handleScroll, eventOptions);

  return {
    destroy: function() {
      cancelAnimationFrame(rafId);
      element.removeEventListener("scroll", handleScroll, eventOptions);
    }
  };
}
