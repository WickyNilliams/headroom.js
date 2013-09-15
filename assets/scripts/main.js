/*!
 * headroom.js v0.3.8 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/
 * License: MIT
 */

;(function(global) {

'use strict';

/**
 * Handles debouncing of events via requestAnimationFrame
 * @see http://www.html5rocks.com/en/tutorials/speed/animations/
 * @param {Function} callback The callback to handle whichever event
 */
function Debouncer (callback) {
  this.callback = callback;
  this.ticking = false;
}
Debouncer.prototype = {
  constructor : Debouncer,

  /**
   * dispatches the event to the supplied callback
   * @private
   */
  update : function() {
    this.callback && this.callback();
    this.ticking = false;
  },

  /**
   * ensures events don't get stacked
   * @private
   */
  requestTick : function() {
    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  },

  /**
   * Attach this as the event listeners
   */
  handleEvent : function() {
    this.requestTick();
  }
};
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

  this.lastKnownScrollY = null;
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
    window.removeEventListener('scroll', this.eventHandler, false);
    this.eventHandler = null;
    this.elem.classList.remove(this.classes.unpinned, this.classes.pinned, this.classes.initial);
  },

  /**
   * Attaches the scroll event
   * @private
   */
  attachEvent : function() {
    this.lastKnownScrollY = window.scrollY;
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
    if(this.elem.classList.contains(this.classes.unpinned)) {
      this.elem.classList.remove(this.classes.unpinned);
      this.elem.classList.add(this.classes.pinned);
    }
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

global.Headroom = Headroom;

}(this));
;(function() {

  function CodeGenerator (widgetCode, pluginCode, dataApiCode) {
    this.pluginCode  = pluginCode;
    this.widgetCode  = widgetCode;
    this.dataApiCode = dataApiCode;
  }
  CodeGenerator.prototype = {
    constructor : CodeGenerator,

    widget : function(options) {
      return 'var headroom = new Headroom(elem, ' + JSON.stringify(options, null, '  ') +');\nheadroom.init();\n\n'
      + '// to destroy\n'
      + 'headroom.destroy();';
    },

    plugin : function(options) {
      return '$("header").headroom(' + JSON.stringify(options, null, '  ') + ');\n\n'
      + '// to destroy\n'
      + '$("#header").headroom("destroy");';
    },

    dataApi : function(options) {
      return '&lt;header data-headroom '
        + 'data-tolerance="' + options.tolerance + '" '
        + 'data-offset="' + options.offset + '" '
        + 'data-classes=\'' + JSON.stringify(options.classes) + '\'&gt;&lt;/header&gt;\n\n'
        + '// to destroy, in your JS:\n'
        + '$("header").data("headroom").destroy();';
    },

    generate : function(options) {
      this.pluginCode.innerHTML = this.plugin(options);
      Prism.highlightElement(this.pluginCode, true);
      
      this.widgetCode.innerHTML = this.widget(options);
      Prism.highlightElement(this.widgetCode, true);

      this.dataApiCode.innerHTML = this.dataApi(options);
      Prism.highlightElement(this.dataApiCode, true);
    }
  };
  

  window.CodeGenerator = CodeGenerator;
  
}());
;(function() {

  function HeadroomExample (inputs, styles, codeGenerator) {
    this.inputs = inputs;
    this.codeGenerator = codeGenerator;
    this.styles  = styles;
  }
  HeadroomExample.prototype = {
    constructor : HeadroomExample,

    init : function() {
      if(!this.inputs) {
        return;
      }
      var options = this.getOptions(this.inputs);

      this.headroom = new Headroom(document.querySelector('header'), options);
      this.headroom.init();
      this.codeGenerator.generate(options);
      this.listen();
    },

    getOptions : function () {
      var styleOptions = this.inputs.querySelectorAll('[name=style]');
      var style;

      for (var i = styleOptions.length - 1; i >= 0; i--) {
        if(styleOptions[i].checked) {
          style = this.styles[styleOptions[i].value];
          break;
        }
      }

      return {
        tolerance : parseInt(this.inputs.querySelector('#tolerance').value,10),
        offset : parseInt(this.inputs.querySelector('#offset').value,10),
        classes : style,
      };
    },

    updateWidget : function () {
      var options = this.getOptions(this.inputs);
      var headroom = this.headroom;

      headroom.destroy();
      headroom.classes = options.classes;
      headroom.offset = options.offset;
      headroom.tolerance = options.tolerance;
      headroom.init();

      this.codeGenerator.generate(options);
    },

    listen : function() {
      for (var i = this.inputs.length - 1; i >= 0; i--) {
        this.inputs[i].addEventListener('change', this.updateWidget.bind(this), false);
      }
    }
  };

  window.HeadroomExample = HeadroomExample;
  
}());
;(function() {
  var styles = {
    swing : {
      initial : 'animated',
      pinned : 'swingInX',
      unpinned : 'swingOutX'
    },
    slide : {
      initial : 'animated',
      pinned : 'slideDown',
      unpinned : 'slideUp'
    },
    flip : {
      initial : 'animated',
      pinned : 'flipInX',
      unpinned : 'flipOutX'
    },
    bounce : {
      initial : 'animated',
      pinned : 'bounceInDown',
      unpinned : 'bounceOutUp'
    }
  };

  var inputs = document.querySelector('form');
  var codeGenerator = new CodeGenerator(
    document.querySelector('.widget-code'),
    document.querySelector('.plugin-code'),
    document.querySelector('.data-api-code'));

  var example = new HeadroomExample(inputs, styles, codeGenerator);
  example.init();

}());