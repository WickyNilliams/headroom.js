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
      Prism.highlightElement(this.pluginCode, false);
      
      this.widgetCode.innerHTML = this.widget(options);
      Prism.highlightElement(this.widgetCode, false);

      this.dataApiCode.innerHTML = this.dataApi(options);
      Prism.highlightElement(this.dataApiCode, false);
    }
  };
  

  window.CodeGenerator = CodeGenerator;
  
}());