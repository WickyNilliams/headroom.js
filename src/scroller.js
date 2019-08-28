function isWindowOrDocument(obj) {
  return obj === window || obj === document || obj === document.body;
}

function windowScroller(/* win */) {
  return {
    /**
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {Number} the scroll height of the document in pixels
     */
    scrollHeight: function() {
      var body = document.body;
      var documentElement = document.documentElement;

      return Math.max(
        body.scrollHeight,
        documentElement.scrollHeight,
        body.offsetHeight,
        documentElement.offsetHeight,
        body.clientHeight,
        documentElement.clientHeight
      );
    },

    /**
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {Number} the height of the viewport in pixels
     */
    height: function() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },

    /**
     * Gets the Y scroll position
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    scrollY: function() {
      if (window.pageYOffset !== undefined) {
        return window.pageYOffset;
      }

      return (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;
    }
  };
}

function elementScroller(element) {
  return {
    /**
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {Number} the scroll height of the element in pixels
     */
    scrollHeight: function() {
      return Math.max(
        element.scrollHeight,
        element.offsetHeight,
        element.clientHeight
      );
    },

    /**
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {Number} the height of the element in pixels
     */
    height: function() {
      return Math.max(element.offsetHeight, element.clientHeight);
    },

    /**
     * Gets the Y scroll position
     * @return {Number} pixels the element has scrolled along the Y-axis
     */
    scrollY: function() {
      return element.scrollTop;
    }
  };
}

export default function createScroller(element) {
  return isWindowOrDocument(element)
    ? windowScroller(element)
    : elementScroller(element);
}
