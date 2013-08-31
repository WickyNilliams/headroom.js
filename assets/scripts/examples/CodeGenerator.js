;(function() {

  function CodeGenerator (widgetCode, pluginCode, dataApiCode) {
    this.pluginCode  = pluginCode;
    this.widgetCode  = widgetCode;
    this.dataApiCode = dataApiCode;
  }
  CodeGenerator.prototype = {
    constructor : CodeGenerator,

    widget : function(options) {
      return 'var headroom = new Headroom(elem, ' + JSON.stringify(options, null, '  ') +');\nheadroom.init();';
    },

    plugin : function(options) {
      return '$("#header").headroom(' + JSON.stringify(options, null, '  ') + ');';
    },

    dataApi : function(options) {
      return '&lt;header id="header" data-headroom '
        + 'data-tolerance="' + options.tolerance + '" '
        + 'data-offset="' + options.offset + '" '
        + 'data-classes=\'' + JSON.stringify(options.classes) + '\'&gt;&lt;/header&gt;';
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