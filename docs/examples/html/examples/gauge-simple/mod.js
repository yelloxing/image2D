ctrlapp.register.controller('gaugeSimpleController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {

    var size = 500;
    
    var layer = $$("#palette")
      // 设置画布大小
      .attr({
        width: size,
        height: size
      })
      // 获取图层
      .layer();

    // 获取颜色
    var getColor = value => {
      if (value <= 20) return "rgb(145, 199, 174)";
      if (value > 80) return "rgb(194, 53, 49)";
      return "rgb(99, 134, 158)";
    };

    // 获取绘制背景的画笔
    var bgPainter = layer.painter("bg");

    // 绘制弧形刻度
    bgPainter.config({
      textAlign: "center"
    });
    for (var i = 1; i <= 10; i++) {
      bgPainter
        .config("fillStyle", getColor(i * 10 - 5))
        // 绘制大弧形
        .fillArc(
          size / 2,
          size / 2,
          size * 0.4,
          size * 0.5,
          Math.PI / 8 * (i + 6) - 0.005,
          Math.PI / 8 - 0.01
        );

      // 绘制小刻度
      for (var j = 1; j <= 4; j++) {
        bgPainter
          .config("fillStyle", "#fff")
          .fillArc(
            size / 2,
            size / 2,
            size * 0.5 - 10,
            size * 0.5,
            Math.PI / 8 * (i + 6) - 0.003 + Math.PI / 40 * j,
            0.006
          );
      }
    }
    for (var i = 1; i <= 11; i++) {
      bgPainter
        .config("fillStyle", getColor(i * 10 - 15))
        // 绘制文字
        .fillText(
          (i - 1) * 10,
          ...$$.rotate(
            size / 2,
            size / 2,
            Math.PI / 8 * (i + 6),
            size * 0.9 - 20,
            size / 2
          )
        );
    }

    // 绘制文字
    bgPainter
      .config({
        fillStyle: "#000",
        "font-size": 20
      })
      .fillText("完成率", size / 2, size / 4);

    var painter = layer.painter("text").config({
      "font-size": 30,
      textAlign: "center"
    });

    var pPainter = layer.painter("pointer");

    var preValue = 0;

    var drawerPointer = function () {
      var value = (Math.random() * 100).toFixed(2) - 0;

      painter
        .clearRect()

        .config("fillStyle", getColor(value))

        // 提示文字
        .fillText(value + "%", size / 2, size / 8 * 5);

      // 启动箭头动画
      $$.animation(
        function (deep) {
          var val = preValue + deep * (value - preValue);
          var rDeg = Math.PI / 8 * (7 + val / 10);
          pPainter
            .clearRect()
            .beginPath()
            .config("fillStyle", getColor(val))
            .moveTo(
              ...$$.rotate(size / 2, size / 2, rDeg, size / 2 - 25, size / 2)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, rDeg, size / 2, size / 2 - 15)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, rDeg, size / 8 * 7, size / 2)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, rDeg, size / 2, size / 2 + 15)
            )
            .fill()
            .config("fillStyle", "white")
            .fillCircle(size / 2, size / 2, 7);
          layer.update();
        },
        700,
        () => {
          preValue = value;
        }
      );

      layer.update();
    };

    drawerPointer();
    setInterval(drawerPointer, 1000);

    layer.update();

  };

}]);