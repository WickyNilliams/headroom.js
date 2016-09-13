(function (angular, Headroom) {

  if(!angular) {
    return;
  }

  function headroom(HeadroomService, $timeout) {
    return {
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '=',
        scroller: '@'
      },
      link: function ($scope, $element) {
        var headroom;
        var options = {};
        var opts = HeadroomService.options;
        for (var prop in opts) {
          options[prop] = $scope[prop] || opts[prop];
        }
        $timeout(function () {
          if ($scope.scroller) {
            options.scroller = document.querySelector($scope.scroller);
          }

          headroom = new HeadroomService($element[0], options).init();
        });

        $scope.$on('$destroy', function(){
          headroom && headroom.destroy();
        });
      }
    };
  }

  headroom.$inject = ['HeadroomService', '$timeout'];

  function HeadroomService() {
    return Headroom;
  }

  angular
      .module('headroom', [])
      .directive('headroom', headroom)
      .factory('HeadroomService', HeadroomService);

})(window.angular, window.Headroom);
