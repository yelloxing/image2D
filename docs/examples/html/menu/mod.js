ctrlapp.register.controller('menuController', ['$scope', function ($scope) {

    $scope.initMethod = function () {

        sessionStorage.setItem('back-router', 'menu');

    };

}]);