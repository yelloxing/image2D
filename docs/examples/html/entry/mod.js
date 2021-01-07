ctrlapp.register.controller('entryController', ['$scope', function ($scope) {

  $scope.initMethod = function () {

    // 格式化代码
    prettyPrint();

    sessionStorage.setItem('back-router','entry');

  };

  $scope.open2DDoc = function () {
    window.location.href = "https://hai2007.github.io/image2D";
  };
  $scope.open3DDoc = function () {
    window.location.href = "https://hai2007.github.io/image3D";
  };


}]);
