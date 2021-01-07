ctrlapp.register.controller('radarBasicController', ['$remote', '$scope', function ($remote, $scope) {

  $scope.initMethod = function () {
    var layer = $$("#palette")
      // 设置画布大小
      .attr({
        width: 700,
        height: 700
      })
      // 获取图层
      .layer();

    // 分别获取用于绘制背景和折线的画笔
    var bgPainter = layer.painter("bg"),
      linePainter = layer.painter("line");

    // 绘制边框
    bgPainter.config("strokeStyle", "rgb(218, 218, 218)");
    for (var i = 5; i >= 1; i--) {
      bgPainter.beginPath().moveTo(350, 350 - 60 * i);
      for (var j = 1; j <= 6; j++) {
        bgPainter.lineTo(
          ...$$.rotate(350, 350, Math.PI / 3 * j, 350, 350 - 60 * i)
        );
      }
      bgPainter
        // 绘制填充
        .config(
          "fillStyle",
          i % 2 != 0 ? "rgb(245, 245, 245)" : "rgb(230, 230, 230)"
        )
        .fill()
        // 绘制轮廓
        .stroke();
    }

    // 绘制对角连线
    for (var i = 0; i < 3; i++) {
      bgPainter
        .beginPath()
        .moveTo(...$$.rotate(350, 350, Math.PI / 3 * i, 350, 50))
        .lineTo(...$$.rotate(350, 350, Math.PI / 3 * i + Math.PI, 350, 50))
        .stroke();
    }

    var indicator = [
      { name: "销售", max: 6500 },
      { name: "管理", max: 16000 },
      { name: "信息技术", max: 30000 },
      { name: "客服", max: 38000 },
      { name: "研发", max: 52000 },
      { name: "市场", max: 25000 }
    ];

    // 绘制提示文字
    bgPainter.config({
      fillStyle: "#000"
    });
    for (var i = 0; i < 6; i++) {
      bgPainter
        .config(
          "textAlign",
          ["center", "right", "right", "center", "left", "left"][i]
        )
        .fillText(
          indicator[i].name,
          ...$$.rotate(350, 350, -Math.PI / 3 * i, 350, 30)
        );
    }

    var data = [
      {
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: "预算分配",
        color: "rgb(194, 53, 49)"
      },
      {
        value: [5000, 14000, 28000, 31000, 42000, 21000],
        name: "实际开销",
        color: "rgb(47, 69, 84)"
      }
    ];

    linePainter.config({
      lineWidth: 2,
      fillStyle: "white"
    });
    $$.animation(deep => {
      linePainter.clearRect();

      for (var i = 0; i < data.length; i++) {
        linePainter
          .config("strokeStyle", data[i].color)
          .beginPath()
          .moveTo(350, 350 - data[i].value[0] / indicator[0].max * 300 * deep);
        for (var j = 0; j < 6; j++) {
          linePainter.lineTo(
            ...$$.rotate(
              350,
              350,
              -Math.PI / 3 * j,
              350,
              350 - data[i].value[j] / indicator[j].max * 300 * deep
            )
          );
        }
        linePainter
          .lineTo(350, 350 - data[i].value[0] / indicator[0].max * 300 * deep)
          .stroke();

        for (var j = 0; j < 6; j++) {
          // 绘制白色小球
          linePainter
            .fillCircle(
              ...$$.rotate(
                350,
                350,
                -Math.PI / 3 * j,
                350,
                350 - data[i].value[j] / indicator[j].max * 300 * deep
              ),
              5
            )
            .strokeCircle(
              ...$$.rotate(
                350,
                350,
                -Math.PI / 3 * j,
                350,
                350 - data[i].value[j] / indicator[j].max * 300 * deep
              ),
              5
            );
        }
      }

      layer.update();
    }, 700);

    layer.update();

  };

}]);