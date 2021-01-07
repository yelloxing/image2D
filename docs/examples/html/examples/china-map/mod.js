ctrlapp.register.controller('chinaMapController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {

    var map = $$.map({
      scale: 7,
    });
    var width = 800,
      height = 500;

    var painter = $$("#palette")
      // 设置画布大小
      .attr({
        width,
        height
      })
      // 获取画笔
      .painter()
      .config({
        'font-size': 10,
        'textAlign': 'center'
      });

    $remote.get('./data/map.china.json', function (response) {

      var colors = $$.getRandomColors(response.data.features.length);
      for (var i = 0; i < colors.length; i++) {
        (function (i) {
          setTimeout(function () {
            $scope.doDraw(map, response.data.features[i], painter.config({
              'fillStyle': colors[i]
            }));
          }, i * 200);
        })(i);

      }

    });
  };

  /**
   * 
   */
  $scope.doDraw = function (map, data, painter) {

    // 绘制区域
    if (data.geometry.type == "Polygon") {
      $scope.drawRegion(map, data.geometry.coordinates[0], painter);
    } else {
      for (var i = 0; i < data.geometry.coordinates.length; i++) {
        $scope.drawRegion(map, data.geometry.coordinates[i][0], painter);
      }
    }

    // 绘制文字
    var pointer = map(data.properties.cp[0], data.properties.cp[1]);
    if (data.properties.name == '香港') {
      pointer[0] += 20; pointer[1] += 10;
    } else if (data.properties.name == '澳门') {
      pointer[1] += 20;
    }
    painter.strokeText(data.properties.name, 400 + pointer[0], 250 + pointer[1]);

  };

  /**
   * 绘制区域
   */
  $scope.drawRegion = function (map, data, painter) {

    painter.beginPath();

    var pointer;

    for (var i = 0; i < data.length; i++) {
      pointer = map(data[i][0], data[i][1]);
      painter.lineTo(400 + pointer[0], 250 + pointer[1]);
    }

    painter.closePath().fill();

  };

}]);