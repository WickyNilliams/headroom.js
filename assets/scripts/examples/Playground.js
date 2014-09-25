;(function(document) {

  function stringifyOptions(options) {
    return JSON.stringify({
      offset : options.offset,
      tolerance : options.tolerance,
      classes : {
        initial : options.classes.initial,
        pinned : options.classes.pinned,
        unpinned : options.classes.unpinned
      }
    }, null, '  ');
  }

  function Playground (form, codeGenerator, getOptions) {
    this.form = form;
    this.codeGenerator = codeGenerator;
    this.getOptions = getOptions;
  }
  Playground.prototype = {
    constructor : Playground,

    init : function() {
      var form = this.form;
      if(form) {
        this.codeGenerator.init();
        this.process();
        form.addEventListener('change', this, false);
      }

      return this;
    },

    process : function () {
      var options = this.getOptions(this.form);

      //TODO: this logic should encapsulated in a callback
      this.headroom && this.headroom.destroy();
      this.headroom = new Headroom(document.querySelector('header'), options).init();

      this.codeGenerator.generate(options);
    },

    handleEvent : function() {
      this.process();
    },

    destroy : function() {
      this.form.removeEventListener('change', this);
    }
  };

  var strategies = {
    widget : function(options) {
      return 'var headroom = new Headroom(elem, ' + stringifyOptions(options) +');\nheadroom.init();\n\n'
      + '// to destroy\n'
      + 'headroom.destroy();';
    },

    plugin : function(options) {
      return '$("header").headroom(' + stringifyOptions(options) + ');\n\n'
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

    angular : function(options) {
      return '&lt;headroom '
        + 'tolerance="' + options.tolerance + '" '
        + 'offset="' + options.offset + '" '
        + 'classes=\'' + JSON.stringify(options.classes) + '\'&gt;&lt;/headroom&gt;';
    }
  };

  new Playground(document.querySelector('form'),
    new CodeGenerator(strategies),
    function (form) {
      var styles = form.querySelectorAll('[name=classes]');
      var classes;

      for (var i = styles.length - 1; i >= 0; i--) {
        if(styles[i].checked) {
          classes = JSON.parse(styles[i].value);
          break;
        }
      }

      return {
        tolerance : form.querySelector('#tolerance').valueAsNumber,
        offset : form.querySelector('#offset').valueAsNumber,
        classes : classes
      };
    }
  ).init();
  
}(document));