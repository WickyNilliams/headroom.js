;(function() {
  var styles = {
    swing : {
      initial : 'animated',
      pinned : 'swingInX',
      unpinned : 'swingOutX'
    },
    slide : {
      initial : 'animated',
      pinned : 'slideInDown',
      unpinned : 'slideOutUp'
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