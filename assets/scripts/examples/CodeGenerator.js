;(function() {

  function CodeGenerator (strategies) {
    this.strategies = strategies;
  }
  CodeGenerator.prototype = {
    constructor : CodeGenerator,

    init : function () {
      this.elements = document.querySelectorAll('[data-code-generator]');
    },

    generate : function(options) {
      var self = this;
      [].forEach.call(this.elements, function(element) {
        self.highlightElement(element, options);
      });
    },

    getStrategy : function (element) {
      return this.strategies[element.getAttribute('data-code-generator')];
    },

    highlightElement : function(element, options) {
      var generator = this.getStrategy(element),
        target = element.querySelector('code');
        
      if(generator) {
        target.innerHTML = generator(options);
        Prism.highlightElement(target, false);
      }
    }
  };

  window.CodeGenerator = CodeGenerator;
  
}());