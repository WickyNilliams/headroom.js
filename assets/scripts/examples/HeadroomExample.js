;(function() {

  function HeadroomExample (inputs, styles, codeGenerator) {
    this.inputs = inputs;
    this.codeGenerator = codeGenerator;
    this.styles  = styles;
  }
  HeadroomExample.prototype = {
    constructor : HeadroomExample,

    init : function() {
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