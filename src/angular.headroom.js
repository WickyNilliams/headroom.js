(function (angular, Headroom) {

  if(!angular) {
    return;
  }
  
  function headroom($document, HeadroomService) {
    return {
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '=',
        scroller: '@'
      },
      link: function link($scope, $element) {
        var options = {};
        var opts = HeadroomService.options;
        if (options.scroller) {
          options.scroller = $document.querySelector(options.scroller);
        }
        for (var prop in opts) {
          options[prop] = $scope[prop] || opts[prop];
        }
        var headroom = new HeadroomService($element[0], options).init();
        $scope.$on('$destroy', headroom.destroy);
      }
    };
  }
  
  headroom.$inject = ['$document', 'HeadroomService'];

  function HeadroomService() {
    return Headroom;
  }

  angular
    .module('headroom', [])
    .directive('headroom', headroom)
    .factory('HeadroomService', HeadroomService);
  
})(window.angular, window.Headroom);
