(function (angular, Headroom) {

  if(!angular) {
    return;
  }
  
  function headroom(HeadroomService) {
    return {
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '=',
        scroller: '@'
      },
      link: function ($scope, $element) {
        var options = {};
        var opts = HeadroomService.options;
        for (var prop in opts) {
          options[prop] = $scope[prop] || opts[prop];
        }
        if ($scope.scroller) {
          options.scroller = document.querySelector($scope.scroller);
        }
        var headroom = new HeadroomService($element[0], options).init();
        $scope.$on('$destroy', function(){
          headroom.destroy();
        });
      }
    };
  }
  
  headroom.$inject = ['HeadroomService'];

  function HeadroomService() {
    return Headroom;
  }

  angular
    .module('headroom', [])
    .directive('headroom', headroom)
    .factory('HeadroomService', HeadroomService);
  
})(window.angular, window.Headroom);
